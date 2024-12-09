const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    image: String

});

module.exports = mongoose.model('Client', clientSchema);