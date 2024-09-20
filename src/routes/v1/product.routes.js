const express = require('express');
const {productController} = require('../../controllers/index');
const multer = require('multer');
const apiKeyMiddleware = require('../../utils/apiKeyMiddleware');

const productRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

productRouter.get('/ping', productController.pingProductController);


productRouter.get('/', apiKeyMiddleware, productController.getProducts);

productRouter.get('/:id', apiKeyMiddleware, productController.getProduct);

productRouter.get('/bycategory/:categoryid', apiKeyMiddleware, productController.getProductByCategory);

productRouter.delete('/:id', apiKeyMiddleware, productController.deleteProduct);

productRouter.put('/:id', apiKeyMiddleware, upload.array('images', 10), productController.updateProduct);

productRouter.post('/', apiKeyMiddleware, upload.array('images', 10), productController.postProduct);

module.exports = productRouter;