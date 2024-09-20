const express = require('express');

const {categoryController} = require('../../controllers/index');
const apiKeyMiddleware = require('../../utils/apiKeyMiddleware');

const categoryRouter = express.Router();

categoryRouter.get('/ping', categoryController.pingCategoryController);


categoryRouter.get('/', apiKeyMiddleware, categoryController.getCategories);

categoryRouter.get('/:id', apiKeyMiddleware, categoryController.getCatetory);

categoryRouter.delete('/:id', apiKeyMiddleware, categoryController.deleteCategory);

categoryRouter.put('/:id', apiKeyMiddleware, categoryController.updateCategory);

categoryRouter.post('/', apiKeyMiddleware, categoryController.addCategory);

module.exports = categoryRouter