const express = require('express');

const adminRouter = require('./admin/index');
const clientRouter = require('./client/index');

const v1Router = express.Router();

v1Router.use('/adminroute', adminRouter);
v1Router.use('/clientroute', clientRouter);

module.exports = v1Router;