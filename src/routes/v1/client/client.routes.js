const express = require('express');

const {clientController} = require('../../../controllers/index');

const clientRouteCollection = express.Router();

clientRouteCollection.get('/ping', clientController.pingClientController);

module.exports = clientRouteCollection;