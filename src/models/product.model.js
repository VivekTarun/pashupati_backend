const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    imageNames: { 
        type: [String], // Change to an array of strings
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
        enum: ['male', 'female', 'unisex'], // Enum for gender
        required: true
    },
    metalType: {
        type: String,
        enum: ['gold', 'silver', 'platinum', 'other'], // Enum for material
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
