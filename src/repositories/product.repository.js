const mongoose = require('mongoose');
const Product = require('../models/product.model');
const BadRequest = require("../errors/badRequest.error");
const NotFound = require("../errors/notFound.error");

class ProductRepository {

    // Helper method to validate required fields
    validateRequiredFields(fields) {
        for (const [key, value] of Object.entries(fields)) {
            if (!value) {
                throw new BadRequest(`${key} is required`);
            }
        }
    }

    // Helper method to validate ObjectIds
    validateObjectId(id, fieldName) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequest(`${fieldName} is not valid`);
        }
    }

    // Helper method to validate numerical values
    validateNumber(value, fieldName) {
        if (isNaN(value)) {
            throw new BadRequest(`${fieldName} must be a valid number`);
        }
    }

    // Centralized error handling
    handleValidationError(error) {
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            throw new BadRequest("Validation Error", errorMessages.join(", "));
        }
    }

    handleCastError(error, fieldName) {
        if (error.name === "CastError") {
            throw new BadRequest(`Invalid value for ${fieldName}`);
        }
    }

    // Post a product with an array of image names
    async postProduct(title, description, amount, category, gender, metalType, imageNames) {
        try {
            this.validateRequiredFields({ title, description, amount, category, gender, metalType });
            this.validateNumber(amount, 'amount');
            this.validateObjectId(category, 'Category ID');

            const product = await Product.create({
                title, description, amount, category, gender, metalType, imageNames
            });

            return product;
        } catch (error) {
            this.handleValidationError(error);
            if (error.code === 11000) {
                throw new BadRequest("Duplicate Key Error", "A product with this title or other unique field already exists");
            }
            this.handleCastError(error, 'Product');
            console.log("Post Product Error:", error);
            throw error;
        }
    }

    // Update product with new data, including updating the image names array
    async updateProduct(productID, title, description, amount, category, gender, metalType, imageNames = []) {
        try {
            this.validateObjectId(productID, 'Product ID');
            this.validateObjectId(category, 'Category ID');
            this.validateRequiredFields({ title, description, amount, category, gender, metalType });
            this.validateNumber(amount, 'amount');

            const updateData = {
                title, description, amount, category, gender, metalType,
                imageNames: imageNames.length > 0 ? imageNames : undefined
            };

            const updatedProduct = await Product.findByIdAndUpdate(productID, updateData, { new: true, runValidators: true });

            if (!updatedProduct) {
                throw new NotFound(productID, "Product not found");
            }

            return updatedProduct;
        } catch (error) {
            this.handleCastError(error, 'Product');
            this.handleValidationError(error);
            console.log('Update Product Error:', error);
            throw error;
        }
    }

    // Get all products with optional filtering
    async getProducts(filter) {
        try {
            if (filter.gender && !['male', 'female', 'unisex'].includes(filter.gender.toLowerCase())) {
                throw new BadRequest("Invalid gender", "Gender must be 'male', 'female', or 'unisex'");
            }

            if (filter.metalType && !['gold', 'silver', 'platinum', 'other'].includes(filter.metalType.toLowerCase())) {
                throw new BadRequest("Invalid metal type", "Metal type must be 'gold', 'silver', 'platinum', or 'other'");
            }

            const products = await Product.find(filter);

            if (!products || products.length === 0) {
                throw new NotFound("No products found", "No products match the given filter criteria");
            }

            return products;
        } catch (error) {
            this.handleCastError(error, 'Product');
            this.handleValidationError(error);
            console.log('Get Products Error:', error);
            throw error;
        }
    }

    // Get a product by its ID
    async getProduct(productID) {
        try {
            this.validateObjectId(productID, 'Product ID');

            const product = await Product.findById(productID);

            if (!product) {
                throw new NotFound(productID, "Product not found");
            }

            return product;
        } catch (error) {
            this.handleCastError(error, 'Product');
            this.handleValidationError(error);
            console.log('Get Product Error:', error);
            throw error;
        }
    }

    // Delete a product by its ID
    async deleteProduct(productID) {
        try {
            this.validateObjectId(productID, 'Product ID');

            const product = await Product.findByIdAndDelete(productID);

            if (!product) {
                throw new NotFound(productID, "Product not found");
            }

            return product;
        } catch (error) {
            this.handleCastError(error, 'Product');
            this.handleValidationError(error);
            console.log('Delete Product Error:', error);
            throw error;
        }
    }

    // Get products by category ID
    async getProductByCategory(categoryID) {
        try {
            this.validateObjectId(categoryID, 'Category ID');

            const products = await Product.find({ category: categoryID });

            if (products.length === 0) {
                throw new NotFound(categoryID, "No products found for this category");
            }

            return products;
        } catch (error) {
            this.handleCastError(error, 'Category');
            this.handleValidationError(error);
            console.log('Get Products By Category Error:', error);
            throw error;
        }
    }
}

module.exports = ProductRepository;
