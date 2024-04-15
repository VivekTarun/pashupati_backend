function pingAdminController(req, res) {
    return res.json({message : "Admin controller is up"});
}

module.exports = {
    pingAdminController,
    
}