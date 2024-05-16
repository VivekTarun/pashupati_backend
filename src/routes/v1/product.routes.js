const express = require('express');
const {productController} = require('../../controllers/index');
const productRouter = express.Router();
const {upload} = require('../../config');


productRouter.get('/ping', productController.pingProductController);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.get('/:category', productController.getProductByCategory);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.put('/:id', productController.updateProduct);

productRouter.post('/', upload.single('image'), productController.postProduct);

module.exports = productRouter;