const mongoose = require('mongoose');

// Category Schema
const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;