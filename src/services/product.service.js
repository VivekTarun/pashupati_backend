const { bucket } = require('../config')
const deleteFile = require('../utils/deleteFile');
const fs = require('fs').promises;
const path = require('path');

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async postProduct(title, description, amount, category, imageFile) {

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
}


module.exports = ProductService;