const { bucket } = require('../config');
const deleteFile = require('../utils/deleteFile');
const fs = require('fs').promises;
const path = require('path');
const {imageConverter} = require('../utils/index');

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async postProduct(title, description, amount, category, imageFile) {

        const imageFile = imageConverter(imageFile);

        const imageName = Date.now() + '-' + imageFile.originalname;
        const file = bucket.file(imageName);

        try {

            // Ensure imageFile has buffer and mimetype
            if (!imageFile || !imageFile.buffer || !imageFile.mimetype) {
                throw new Error('Invalid image file');
            }

            console.log('Uploading file to GCS...');
            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    resumable: false,
                    contentType: imageFile.mimetype,
                });

                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(imageFile.buffer);
            });

            console.log('File uploaded to GCS. Saving to MongoDB...');
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageName}`;
            const productData = { title, description, amount, category, imageUrl };
            const product = await this.productRepository.postProduct(productData);

            // Optionally delete the local file if stored on disk by multer
            if (imageFile.path) {
                await deleteFile(imageFile.path);
            }

            console.log('Product saved to MongoDB.');
            return product;
        } catch (error) {
            console.error('Error occurred:', error);

            // Ensure the file is deleted even if upload fails
            if (imageFile.path) {
                await deleteFile(imageFile.path);
            }

            throw error;
        }
    }

    async getProduct(productID) {
        const product = await this.productRepository.getProduct(productID);
        return product;
    }

    async getProducts() {
        const product = await this.productRepository.getProducts();
        return product;
    }

    async getProductByCategory(categoryID) {
        const product = await this.productRepository.getProductByCategory(categoryID);
        return product;
    }

    async deleteProduct(productID) {
        const product = await this.productRepository.deleteProduct(productID);
        return product;
    }

    async updateProduct(id, title, description, amount, category, imageFile) {
        const imageName = Date.now() + '-' + imageFile.originalname;
        const file = bucket.file(imageName);

        try {

            // Ensure imageFile has buffer and mimetype
            if (!imageFile || !imageFile.buffer || !imageFile.mimetype) {
                throw new Error('Invalid image file');
            }

            console.log('Uploading file to GCS...');
            await new Promise((resolve, reject) => {
                const blobStream = file.createWriteStream({
                    resumable: false,
                    contentType: imageFile.mimetype,
                });

                blobStream.on('error', reject);
                blobStream.on('finish', resolve);
                blobStream.end(imageFile.buffer);
            });

            console.log('File uploaded to GCS. Saving to MongoDB...');
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageName}`;
            const productData = { title, description, amount, category, imageUrl };
            const product = await this.productRepository.updateProduct(id, productData);

            // Optionally delete the local file if stored on disk by multer
            if (imageFile.path) {
                await deleteFile(imageFile.path);
            }

            console.log('Product saved to MongoDB.');
            return product;
        } catch (error) {
            console.error('Error occurred:', error);

            // Ensure the file is deleted even if upload fails
            if (imageFile.path) {
                await deleteFile(imageFile.path);
            }

            throw error;
        }
    }

}


module.exports = ProductService;