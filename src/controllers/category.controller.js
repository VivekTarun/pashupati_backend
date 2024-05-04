

function pingCategoryController(req, res) {
    return res.json({message : 'category controller is up'});
}

function getCategories(req, res) {
    return res.json({message : 'not implemented'});
}

function getCatetory(req, res) {
    return res.json({message : 'not implemented'});
}

function deleteCategory(req, res) {
    return res.json({message : 'not implemented'});
}

function updateCategory(req, res) {
    return res.json({message : 'not implemented'});
}

function addCategory(req, res) {
    return res.json({message : 'not implemented'});
}

module.exports = {
    pingCategoryController,
    getCategories,
    getCatetory,
    deleteCategory,
    updateCategory,
    addCategory
}