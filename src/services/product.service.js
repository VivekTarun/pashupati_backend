const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const { BUCKETNAME, BUCKETREGION, ACCESSKEY, SECRETACCESSKEY } = require('../config/server.config');
const sharp = require('sharp');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETACCESSKEY
    },
    region: BUCKETREGION
});

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    // Post product and upload image to S3
    async postProduct(title, description, amount, category, gender, material, imageFile) {
        const buffer = await sharp(imageFile.buffer)
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();

        const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
        const imageName = randomImageName();

        const params = {
            Bucket: BUCKETNAME,
            Key: imageName,
            Body: buffer,
            ContentType: imageFile.mimetype
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const product = await this.productRepository.postProduct(title, description, amount, category, gender, material, imageName);
        console.log(title, description, amount, category, gender, material, imageName);
        return product;
    }

    // Get product by ID
    async getProduct(productID) {
        const product = await this.productRepository.getProduct(productID);

        const getObjectParams = {
            Bucket: BUCKETNAME,
            Key: product.imageName,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        product.imageName = url;

        return product;
    }

    // Get all products and generate signed URLs for images
    async getProducts() {
        const products = await this.productRepository.getProducts();

        for (const product of products) {
            const getObjectParams = {
                Bucket: BUCKETNAME,
                Key: product.imageName,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            product.imageName = url;
        }

        return products;
    }

    // Get products by category and generate signed URLs for images
    async getProductByCategory(categoryID) {
        const products = await this.productRepository.getProductByCategory(categoryID);

        for (const product of products) {
            const getObjectParams = {
                Bucket: BUCKETNAME,
                Key: product.imageName,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            product.imageName = url;
        }

        return products;
    }

    // Delete a product by ID and remove the image from S3
    async deleteProduct(productID) {
        const product = await this.productRepository.getProduct(productID);

        // Delete the image from S3
        const deleteParams = {
            Bucket: BUCKETNAME,
            Key: product.imageName,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await s3.send(deleteCommand);

        // Delete the product from the repository
        const deletedProduct = await this.productRepository.deleteProduct(productID);
        return deletedProduct;
    }

    // Update product details and optionally update image in S3
    async updateProduct(id, title, description, amount, category, gender, material, imageFile = null) {
        let imageName;

        // If there is a new image file, upload it to S3
        if (imageFile) {
            const buffer = await sharp(imageFile.buffer)
                .resize({ height: 1920, width: 1080, fit: "contain" })
                .toBuffer();

            const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
            imageName = randomImageName();

            const params = {
                Bucket: BUCKETNAME,
                Key: imageName,
                Body: buffer,
                ContentType: imageFile.mimetype
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);
        }

        // Update the product details in the repository
        const updatedProduct = await this.productRepository.updateProduct(
            id,
            title,
            description,
            amount,
            category,
            gender,
            material,
            imageName || undefined // Pass the new imageName if available, otherwise undefined
        );

        return updatedProduct;
    }
}

module.exports = ProductService;
