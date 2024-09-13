
const mongoose = require('mongoose');

const Product = require('../models/product.model');
const BadRequest = require("../errors/badRequest.error");

class ProductRepository {
    // Post a product with an array of image names
    async postProduct(title, description, amount, category, gender, material, imageNames) {
        try {
            const product = await Product.create({
                title: title,
                imageNames: imageNames, // Use imageNames array
                description: description,
                amount: amount,
                category: category,
                material: material,
                gender: gender
            });
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Update product with new data, including updating the image names array
    async updateProduct(productID, title, description, amount, category, gender, material, imageNames = []) {
        try {
            
    
            // Prepare the updated product data
            const updateData = {
                title,
                description,
                amount,
                category,
                gender,
                material,
                imageNames: imageNames.length > 0 ? imageNames : undefined // Include imageNames only if provided
            };
    
            // Update the product in the database
            const updatedProduct = await Product.findByIdAndUpdate(productID, updateData, { new: true, runValidators: true });
    
            // Check if the product was found and updated
            if (!updatedProduct) {
                throw new BadRequest(productID, "Product not found");
            }
    
            // Return the updated product
            console.log('Updated Product:', updatedProduct);
            return updatedProduct;
        } catch (error) {
            // Validate productID
            if (!mongoose.Types.ObjectId.isValid(productID)) {
                throw new BadRequest(productID, "Product ID is not valid");
            }
            // Handle specific errors
            if (error.name === "CastError") {
                throw new BadRequest(productID, "Product ID is not valid");
            }
            // Log and rethrow other errors
            console.log('Update Error:', error);
            throw error;
        }
    }
    
    

    // Get all products
    async getProducts() {
        try {
            const products = await Product.find({});
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Get a product by its ID
    async getProduct(productID) {
        try {
            const product = await Product.findById(productID);
            return product;
        } catch (error) {
            if (error.name === "CastError") {
                throw new BadRequest(productID, "Product ID is not valid");
            }
            console.log(error);
            throw error;
        }
    }

    // Delete a product by its ID
    async deleteProduct(productID) {
        try {
            const product = await Product.findByIdAndDelete(productID);
            return product;
        } catch (error) {
            if (error.name === "CastError") {
                throw new BadRequest(productID, "Product ID is not valid");
            }
            console.log(error);
            throw error;
        }
    }

    // Get products by category ID
    async getProductByCategory(categoryID) {
        try {
            const products = await Product.find({ category: categoryID });
            return products;
        } catch (error) {
            if (error.name === "CastError") {
                throw new BadRequest(categoryID, "Category ID is not valid");
            }
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
