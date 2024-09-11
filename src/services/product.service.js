const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const {BUCKETNAME, BUCKETREGION, ACCESSKEY, SECRETACCESSKEY} = require('../config/server.config')
const sharp = require('sharp');


class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async postProduct(title, description, amount, category, gender, material, imageFile) {

        const s3 = new S3Client({
            credentials: {
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETACCESSKEY
            },
            region: BUCKETREGION
        });
        
        const buffer = await sharp(imageFile.buffer).resize({height: 1920, width: 1080, fit: "contain"}).toBuffer();

        const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

        const imageName = randomImageName();

        const params = {
            Bucket: BUCKETNAME,
            Key: imageName,
            Body: buffer,
            contentType: imageFile.mimetype
        }

        const command = new PutObjectCommand(params)

        await s3.send(command);
       
        const product = await this.productRepository.postProduct(title, description, amount, category, gender, material, imageName);
        console.log(title, description, amount, category, gender, material, imageName)
        return product;
    }

    async getProduct(productID) {
        const product = await this.productRepository.getProduct(productID);
        return product;
    }

    async getProducts() {
        const products = await this.productRepository.getProducts();
        return products;
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

    }
        

}


module.exports = ProductService;