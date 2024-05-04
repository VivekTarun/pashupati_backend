function pingProductController(req, res) {
    return res.json({message : "product controller is up"});
}

function getProducts(req, res) {
    return res.json({message : 'not implemented'});
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

function addProduct(req, res) {
    return res.json({message : 'not implemented'});
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
    addProduct,
    getProductByCategory
}