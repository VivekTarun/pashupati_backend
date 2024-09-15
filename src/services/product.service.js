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

    // Helper function to upload images to S3
    async uploadImagesToS3(imageFiles) {
        const uploadedImages = [];

        for (const imageFile of imageFiles) {
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

            uploadedImages.push(imageName);
        }

        return uploadedImages; // Return an array of image names
    }

    // Post product with an array of images
    async postProduct(title, description, amount, category, gender, metalType, imageFiles) {
        const uploadedImages = await this.uploadImagesToS3(imageFiles);

        const product = await this.productRepository.postProduct(
            title,
            description,
            amount,
            category,
            gender,
            metalType,
            uploadedImages // Store the array of image names
        );
        console.log(title, description, amount, category, gender, metalType, uploadedImages);
        return product;
    }

    // Get product by ID with signed URLs for each image
    async getProduct(productID) {
        const product = await this.productRepository.getProduct(productID);

        const imageUrls = await Promise.all(product.imageNames.map(async (imageName) => {
            const getObjectParams = {
                Bucket: BUCKETNAME,
                Key: imageName,
            };

            const command = new GetObjectCommand(getObjectParams);
            return await getSignedUrl(s3, command, { expiresIn: 3600 });
        }));

        product.imageNames = imageUrls; // Attach signed URLs for all images
        return product;
    }

    // Get all products and generate signed URLs for each image in each product
    async getProducts(productQuery) {

        const {gender, metalType} = productQuery;

        const filter = {};
        if(gender) filter.gender = gender;
        if(metalType) filter.metalType = metalType;

        const products = await this.productRepository.getProducts(filter);

        for (const product of products) {
            const imageUrls = await Promise.all(product.imageNames.map(async (imageName) => {
                const getObjectParams = {
                    Bucket: BUCKETNAME,
                    Key: imageName,
                };

                const command = new GetObjectCommand(getObjectParams);
                return await getSignedUrl(s3, command, { expiresIn: 3600 });
            }));

            product.imageNames = imageUrls; // Attach signed URLs for all images
        }

        return products;
    }

    // Get products by category with signed URLs for each image
    async getProductByCategory(categoryID) {
        const products = await this.productRepository.getProductByCategory(categoryID);

        for (const product of products) {
            const imageUrls = await Promise.all(product.imageNames.map(async (imageName) => {
                const getObjectParams = {
                    Bucket: BUCKETNAME,
                    Key: imageName,
                };

                const command = new GetObjectCommand(getObjectParams);
                return await getSignedUrl(s3, command, { expiresIn: 3600 });
            }));

            product.imageNames = imageUrls;
        }

        return products;
    }

    // Delete a product by ID and remove all images from S3
    async deleteProduct(productID) {
        const product = await this.productRepository.getProduct(productID);

        // Delete all images from S3
        for (const imageName of product.imageNames) {
            const deleteParams = {
                Bucket: BUCKETNAME,
                Key: imageName,
            };

            const deleteCommand = new DeleteObjectCommand(deleteParams);
            await s3.send(deleteCommand);
        }

        // Delete the product from the repository
        const deletedProduct = await this.productRepository.deleteProduct(productID);
        return deletedProduct;
    }

    // Update product details and optionally update the images in S3
    async updateProduct(id, title, description, amount, category, gender, material, imageFiles = null) {
        let uploadedImages = [];

        // If there are new image files, upload them to S3
        if (imageFiles) {
            uploadedImages = await this.uploadImagesToS3(imageFiles);
        }

        // Update the product details in the repository
        const updatedProduct = await this.productRepository.updateProduct(
            id,
            title,
            description,
            amount,
            category,
            gender,
            metalType,
            uploadedImages.length > 0 ? uploadedImages : undefined // Pass the new images array if available
        );

        return updatedProduct;
    }
}

module.exports = ProductService;
