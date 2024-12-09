const mongoose = require('mongoose');
 
const categorySchema = new mongoose.Schema({
    id:{ type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    count: { type: String, required: true },
 
},{
    collection: 'category'
});
 
const Category = mongoose.model('Category', categorySchema);
 
module.exports = Category;