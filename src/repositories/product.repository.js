const Product = require('../models/product.model');
const BadRequest = require("../errors/badRequest.error");

class ProductRepository {
    async postProduct(title, description, amount, category, gender, material, imageName) {
        try {
            const product = await Product.create({
                title: title,
                imageName: imageName,
                description: description,
                amount: amount,
                category: category,
                material : material,
                gender : gender
            });
            return product
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProduct(productID, updatedData) {
        try {
            const Updatedproduct = await Product.findByIdAndUpdate(productID, updatedData, {new : true});
            return Updatedproduct;
        } catch (error) {
            // if(error.name == "CastError") {
            //     throw new BadRequest(productID, "product id is not Valid");
            // }
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

    async getProductByCategory(categoryID) {
        try {
            const product = await Product.find({ category: categoryID })
            return product;
        } catch (error) {
            if(error.name == "CastError") {
                throw new BadRequest(categoryID, "category id is not Valid");
            }
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
