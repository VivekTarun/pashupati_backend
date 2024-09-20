const BadRequest = require("../errors/badRequest.error");
const DuplicateKey = require("../errors/duplicateKey.error");
const Category = require("../models/category.model");

class CategoryRepository {
    
    // Centralized error handler to reduce repetition
    handleCastError(error, entityId, entityName) {
        if (error.name === "CastError") {
            throw new BadRequest(entityId, `${entityName} ID is not valid`);
        }
    }

    // Centralized MongoDB duplicate key error handler
    handleDuplicateKeyError(error, entityName) {
        if (error.code === 11000) { // Duplicate key error code
            throw new DuplicateKey(entityName);
        }
    }

    // Post a new category
    async postCategory(categoryData) {
        try {
            const category = await Category.create({
                name: categoryData.name
            });
            return category;
        } catch (error) {
            this.handleDuplicateKeyError(error, categoryData.name); // Handle duplicate category name
            console.log(error);
            throw error;
        }
    }

    // Get all categories
    async getCategories() {
        try {
            const categories = await Category.find({});
            return categories;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Get a category by ID
    async getCategory(categoryId) {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                throw new BadRequest(categoryId, "Category not found");
            }
            return category;
        } catch (error) {
            this.handleCastError(error, categoryId, "Category"); // Handle invalid category ID
            console.log(error);
            throw error;
        }
    }

    // Update a category by ID
    async updateCategory(categoryId, updatedData) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                updatedData,
                { new: true }
            );
            if (!updatedCategory) {
                throw new BadRequest(categoryId, "Category not found");
            }
            return updatedCategory;
        } catch (error) {
            this.handleCastError(error, categoryId, "Category"); // Handle invalid category ID
            console.log(error);
            throw error;
        }
    }

    // Delete a category by ID
    async deleteCategory(categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                throw new BadRequest(categoryId, "Category not found");
            }
            return deletedCategory;
        } catch (error) {
            this.handleCastError(error, categoryId, "Category"); // Handle invalid category ID
            console.log(error);
            throw error;
        }
    }
}

module.exports = CategoryRepository;