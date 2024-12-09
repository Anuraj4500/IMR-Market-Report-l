const mongoose = require('mongoose');

const privacySchema = new mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model('Privacy', privacySchema);