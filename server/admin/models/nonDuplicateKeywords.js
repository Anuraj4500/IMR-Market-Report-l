const mongoose = require('mongoose');

const nonDuplicateKeywordsSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
}, {
  collection: 'check-duplicates', // Specify the collection name
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const NonDuplicateKeywordsCollection = mongoose.model('NonDuplicateKeywords', nonDuplicateKeywordsSchema);

module.exports = NonDuplicateKeywordsCollection;
