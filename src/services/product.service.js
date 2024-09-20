const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const { BUCKETNAME } = require('../config/server.config');
const sharp = require('sharp');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require('../config/index');

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    // Helper function to generate a unique image name
    generateImageName(bytes = 32) {
        return crypto.randomBytes(bytes).toString('hex');
    }

    // Helper function to upload a single image to S3
    async uploadImageToS3(imageFile) {
        const targetSize = 3 * 1024 * 1024; // 5 MB
        let quality = 80; // Start with a quality level

        let buffer = await sharp(imageFile.buffer)
            .resize({ height: 500, width: 300, fit: 'contain' })
            .jpeg({ quality }) // Start with JPEG quality
            .toBuffer();

        // Check if the image size exceeds 5 MB
        while (buffer.length > targetSize && quality > 0) {
            quality -= 10; // Decrease quality by 10%
            buffer = await sharp(imageFile.buffer)
                .resize({ height: 1920, width: 1080, fit: 'contain' })
                .jpeg({ quality }) // Apply the new quality
                .toBuffer();
        }

        if (buffer.length > targetSize) {
            throw new Error('Could not reduce the image size to under 5 MB.');
        }

        const params = {
            Bucket: BUCKETNAME,
            Key: this.generateImageName(),
            Body: buffer,
            ContentType: imageFile.mimetype
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        return params.Key;
    }

    // Helper function to upload multiple images to S3
    async uploadImagesToS3(imageFiles) {
        return Promise.all(imageFiles.map(file => this.uploadImageToS3(file)));
    }

    // Helper function to generate signed URLs for images
    async generateImageUrls(imageNames) {
        return Promise.all(imageNames.map(async (imageName) => {
            const getObjectParams = {
                Bucket: BUCKETNAME,
                Key: imageName,
            };

            const command = new GetObjectCommand(getObjectParams);
            return await getSignedUrl(s3, command, { expiresIn: 3600 });
        }));
    }

    // Post a product with an array of images
    async postProduct(title, description, amount, category, gender, metalType, imageFiles) {
        const uploadedImages = await this.uploadImagesToS3(imageFiles);

        return this.productRepository.postProduct(
            title,
            description,
            amount,
            category,
            gender,
            metalType,
            uploadedImages // Store the array of image names
        );
    }

    // Get product by ID with signed URLs for each image
    async getProduct(productID) {
        const product = await this.productRepository.getProduct(productID);
        product.imageNames = await this.generateImageUrls(product.imageNames);
        return product;
    }

    // Get all products and generate signed URLs for each image
    async getProducts(productQuery) {
        const { gender, metalType } = productQuery;

        const filter = {};
        if (gender) filter.gender = gender;
        if (metalType) filter.metalType = metalType;

        const products = await this.productRepository.getProducts(filter);

        for (const product of products) {
            product.imageNames = await this.generateImageUrls(product.imageNames);
        }

        return products;
    }

    // Get products by category with signed URLs for each image
    async getProductByCategory(categoryID) {
        const products = await this.productRepository.getProductByCategory(categoryID);

        for (const product of products) {
            product.imageNames = await this.generateImageUrls(product.imageNames);
        }

        return products;
    }

    // Delete a product by ID and remove all images from S3
    async deleteProduct(productID) {
        const product = await this.productRepository.getProduct(productID);

        // Delete all images from S3
        await Promise.all(product.imageNames.map(async (imageName) => {
            const deleteParams = {
                Bucket: BUCKETNAME,
                Key: imageName,
            };

            const deleteCommand = new DeleteObjectCommand(deleteParams);
            await s3.send(deleteCommand);
        }));

        // Delete the product from the repository
        return this.productRepository.deleteProduct(productID);
    }

    // Update product details and optionally update the images in S3
    async updateProduct(id, title, description, amount, category, gender, metalType, imageFiles = null) {
        let uploadedImages = [];

        // If there are new image files, upload them to S3
        if (imageFiles) {
            uploadedImages = await this.uploadImagesToS3(imageFiles);
        }

        // Update the product details in the repository
        return this.productRepository.updateProduct(
            id,
            title,
            description,
            amount,
            category,
            gender,
            metalType,
            uploadedImages.length > 0 ? uploadedImages : undefined // Pass the new images array if available
        );
    }
}

module.exports = ProductService;
