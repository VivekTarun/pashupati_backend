const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    imageName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        default: 0 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    gender: {
        type: String,
        enum: ['men', 'women'], // Enum for gender
        required: true
    },
    material: {
        type: String,
        enum: ['gold', 'silver'], // Enum for material
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
