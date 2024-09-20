const { StatusCodes } = require("http-status-codes");
const CategoryRepository = require("../repositories/category.repository");
const CategoryService = require("../services/category.service");

const categoryService = new CategoryService(new CategoryRepository());

function pingCategoryController(req, res) {
    return res.status(StatusCodes.OK).json({message : 'category controller is up'});
}

async function getCategories(req, res, next) {
    try {
        const categories = await categoryService.getCategories();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: `Successfully fetched all the categories`,
            error: {},
            data: categories
        })
    } catch(error) {
        next(error);
    }
}

async function getCatetory(req, res, next) {
    try {
        const category = await categoryService.getCategory(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: `Successfully fetched category with id ${req.params.id}`,
            error: {},
            data: category
        })
    } catch(error) {
        next(error);
    }
}

async function deleteCategory(req, res, next) {
    try {
        const deletedCategory = await categoryService.deleteCategory(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: `Successfully deleted category with id ${req.params.id}`,
            error: {},
            data: deletedCategory
        })
    } catch(error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: `Successfully updated category with id ${req.params.id}`,
            error: {},
            data: updatedCategory
        })
    } catch(error) {
        next(error);
    }
}

async function addCategory(req, res, next) {
    try {
        const newCategory = await categoryService.postCategory(req.body);
        return res.status(StatusCodes.CREATED).json({
            success : true,
            message : `Successfully created ${req.body.name} category`,
            error : {},
            data : newCategory
        })
    } catch(error) {
        next(error);
    }
}

module.exports = {
    pingCategoryController,
    getCategories,
    getCatetory,
    deleteCategory,
    updateCategory,
    addCategory
}