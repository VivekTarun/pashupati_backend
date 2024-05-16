const { StatusCodes } = require("http-status-codes");
const {ProductService} = require('../services')
const {ProductRepository} = require('../repositories');

const productService = new ProductService(new ProductRepository());

function pingProductController(req, res) {
    return res.status(StatusCodes.OK).json({message : "product controller is up"});
}

async function getProducts(req, res, next) {
    try {
        const product = await productService.getProducts();
        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully added the product`,
            error : {},
            data : product
        })
    } catch (error) {
        next(error);
    }
}

function getProduct(req, res) {
    return res.json({message : 'not implemented'});
}

function deleteProduct(req, res) {
    return res.json({message : 'not implemented'});
}

function updateProduct(req, res) {
    return res.json({message : 'not implemented'});
}

async function postProduct(req, res, next) {
    try {
        const {title, description, amount, category} = req.body;
        const imageFile = req.file;
        const product = await productService.postProduct(title, description, amount, category, imageFile);
        return res.status(StatusCodes.CREATED).json({
            success : true,
            message : `successfully added the product`,
            error : {},
            data : product
        })
        
    } catch(error) {
        next(error);
    }
}

function getProductByCategory(req, res) {
    return res.json({message : 'not implement'});
}

module.exports = {
    pingProductController,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    postProduct,
    getProductByCategory
}