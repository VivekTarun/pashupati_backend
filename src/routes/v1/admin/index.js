const express = require('express');

const adminRouteCollection = require('./admin.routes');

const adminRouter = express.Router();

adminRouter.use('/admin', adminRouteCollection);

module.exports = adminRouter;