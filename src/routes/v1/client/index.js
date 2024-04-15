const express = require('express');

const clientRouteCollection = require('./client.routes');

const clientRouter = express.Router();

clientRouter.use('/client', clientRouteCollection);

module.exports = clientRouter;