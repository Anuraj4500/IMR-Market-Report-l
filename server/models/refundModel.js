const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model('Refund', refundSchema); 