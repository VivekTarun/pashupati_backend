const Product = require('../models/product.model');
const BadRequest = require("../errors/badRequest.error");

class ProductRepository {
    async postProduct(data) {
        try {
            const product = await Product.create({
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
                amount: data.amount,
                category: data.category
            });
            return product
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProducts() {
        try {
            const product = await Product.find({});
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProduct(productID) {
        try {
            const product = await Product.findById(productID);
            return product;
        } catch (error) {
            if(error.name == "CastError") {
                throw new BadRequest(productID, "product id is not Valid");
            }
            console.log(error);
            throw error;
        }
    }

    async deleteProduct(productID) {
        try {
            const product = await Product.findByIdAndDelete(productID);
            return product;
        } catch (error) {
            if(error.name == "CastError") {
                throw new BadRequest(productID, "product id is not Valid");
            }
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
