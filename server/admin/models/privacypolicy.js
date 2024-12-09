// models/PrivacyPolicy.js
const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  collection: 'privacypolicy',
});

// Ensure the collection is created in the database
const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

// Export the model
module.exports = PrivacyPolicy;