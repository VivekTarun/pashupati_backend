const Product = require('../models/product.model');

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
}

module.exports = ProductRepository;
