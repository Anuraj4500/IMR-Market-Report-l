const mongoose = require('mongoose');

const OurServicesSchema = new mongoose.Schema({
    title: String,
    desc: String,
    // other fields...
});

module.exports = mongoose.model('ourservices', OurServicesSchema);