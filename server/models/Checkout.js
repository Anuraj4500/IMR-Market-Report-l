const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    id: String,
    customerInfo: {
        name: String,
        email: String,
        designation: String,
        city: String,
        state: String,
        country: String,
        phone: String,
        message: String
    },
    reportInfo: {
        reportId: String,
        reportTitle: String,
        userType: String,
        price: String
    },
    orderDate: Date,
    paymentStatus: String
});

module.exports = mongoose.model('Checkout', checkoutSchema); 