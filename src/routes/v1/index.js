const express = require('express');

const productRouter = require('./product.routes');
const categoryRouter = require('./category.routes');

const v1Router = express.Router();

v1Router.use('/product', productRouter);
v1Router.use('/category', categoryRouter);

module.exports = v1Router;