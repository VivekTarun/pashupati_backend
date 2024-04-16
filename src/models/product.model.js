const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Product = mongoose.model('Product', ProductSchema);


module.exports = Product;