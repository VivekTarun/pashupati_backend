const express = require('express');

const {adminController} = require('../../../controllers/index');

const adminRouteCollection = express.Router();

adminRouteCollection.get('/ping', adminController.pingAdminController);

module.exports = adminRouteCollection;