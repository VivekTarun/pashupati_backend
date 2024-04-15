function pingClientController(req, res) {
    return res.json({message: 'client controller is alive'});
}

module.exports = {
    pingClientController,
    
}