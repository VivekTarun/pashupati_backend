const { StatusCodes } = require("http-status-codes");
const {ProductService} = require('../services')
const {ProductRepository} = require('../repositories');


const productService = new ProductService(new ProductRepository());

function pingProductController(req, res) {
    return res.status(StatusCodes.OK).json({message : "product controller is up"});
}

async function getProducts(req, res, next) {
    try {
        const productQuery = req.query;
        const product = await productService.getProducts(productQuery);

        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully fetched the product`,
            error : {},
            data : product
        })
    } catch (error) {
        next(error);
    }
}

async function getProduct(req, res, next) {
    try {
        const productID = req.params.id;
        const product = await productService.getProduct(productID);
        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully fetched the product`,
            error : {},
            data : product
        })
    } catch(error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const productID = req.params.id;
        const product = await productService.deleteProduct(productID);
        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully deleted the product`,
            error : {},
            data : product
        })
    } catch(error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const productID = req.params.id;
        const imageFile = req.files;
        const {title, description, amount, category, gender, metalType} = req.body;

        const product = await productService.updateProduct(productID, title, description, amount, category, gender, metalType, imageFile);
        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully updated the product`,
            error : {},
            data : product
        })
    } catch (error) {
        next(error);
    }
}

async function postProduct(req, res, next) {
    try {
        const {title, description, amount, category, gender, metalType} = req.body;
        const imageFile = req.files;

        const product = await productService.postProduct(title, description, amount, category, gender, metalType, imageFile);
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

async function getProductByCategory(req, res, next) {
    try {
        const categoryID = req.params.categoryid;
        const product = await productService.getProductByCategory(categoryID);
        return res.status(StatusCodes.OK).json({
            success : true,
            message : `successfully fetched the product by category`,
            error : {},
            data : product
        })
    } catch(error) {
        next(error);
    }
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