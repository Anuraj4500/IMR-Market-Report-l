const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'whychooseus'
});

const WhyChooseUs = mongoose.model('WhyChooseUs', whyChooseUsSchema);

module.exports = WhyChooseUs;
