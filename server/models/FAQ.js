const mongoose = require('mongoose');

// Define the FAQ schema
const faqSchema = new mongoose.Schema({
  que: String,
  ans: String,
}); // Explicitly set collection name to 'faq'

// Create and export the FAQ model
module.exports = mongoose.model('FAQ', faqSchema);
