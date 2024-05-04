const BadRequest = require("../errors/badRequest.error");
const DuplicateKey = require("../errors/duplicateKey.error");
const Category = require("../models/category.model");

class CategoryRepository {

    async postCategory(categoryData) {
        try {
            const category = await Category.create({
                name : categoryData.name,
            });
            return category;
        } catch(error) {
            if(error.errorResponse.code == 11000) { // if same category exists in the database
                throw new DuplicateKey(categoryData.name);
            }
            console.log(error);
            throw error;
        }
    }

    async getCategories() {
        try {
            const category = await Category.find({});
            return category;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getCategory(categoryId) {
        try {
            const category = await Category.findById(categoryId);
            return category;
        } catch(error) {
            if(error.name == "CastError") {
                throw new BadRequest(categoryId, "categoryId is not Valid");
            }
            console.log(error);
            throw error;
        }
    }

    async updateCategory(categoryId, updatedData) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, {new : true});
            return updatedCategory;
        } catch(error) {
            if(error.name == "CastError") {
                throw new BadRequest(categoryId, "categoryId is not Valid");
            }
            console.log(error);
            throw error;
        }
    }

    async deleteCategory(categoryId) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            return deletedCategory;
        } catch(error) {
            if(error.name == "CastError") {
                throw new BadRequest(categoryId, "categoryId is not Valid");
            }
            console.log(error);
            throw error;
        }
    }
}

module.exports = CategoryRepository;