const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema({
    title: String,
    content: String,
 });

module.exports = mongoose.model('Terms', termsSchema); 