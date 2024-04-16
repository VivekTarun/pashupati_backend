const express = require('express');

const {categoryController} = require('../../controllers/index');

const categoryRouter = express.Router();

categoryRouter.get('/ping', categoryController.pingCategoryController);

categoryRouter.get('/', categoryController.getCategories);

categoryRouter.get('/:id', categoryController.getCatetory);

categoryRouter.delete('/:id', categoryController.deleteCategory);

categoryRouter.put('/:id', categoryController.updateCategory);

categoryRouter.post('/', categoryController.addCategory);

module.exports = categoryRouter;

