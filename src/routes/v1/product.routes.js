const express = require('express');
const {productController} = require('../../controllers/index');
const multer = require('multer');

const productRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

productRouter.get('/ping', productController.pingProductController);


productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.get('/bycategory/:categoryid', productController.getProductByCategory);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.put('/:id', upload.array('images', 10), productController.updateProduct);

productRouter.post('/', upload.array('images', 10), productController.postProduct);

module.exports = productRouter;