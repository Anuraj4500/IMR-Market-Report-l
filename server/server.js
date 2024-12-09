// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const reportRoutes = require('./routes/reportRoutes');
const contactusRoutes = require('./routes/contactusRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const faqRoutes = require('./routes/faqRoutes');
const aboutUsRoutes = require('./routes/aboutus');
const clientRoutes = require('./routes/clientroutes'); 
const whychooseusRoutes = require('./routes/whychooseusRoutes'); 
const termsRoutes = require('./routes/termsandconditionsRoutes');
const refundRoutes = require('./routes/refundRoutes');
const ourservicesRoutes = require('./routes/ourservicesRoutes');
const publisherRoutes = require('./routes/publishersRoutes');
const sampleRequestRoutes = require('./routes/sampleRequestRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const privacyPolicyRoutes = require('./routes/privacypolicyRoute');
const careerRoutes = require('./routes/careerRoutes');
const adminReportsRoutes = require('./admin/routes/adminreportsRoutes');
const adminOurServicesRoutes = require('./admin/routes/adminourservicesRoutes');
const askDiscountRoutes = require('./routes/askdiscountRoutes');

const app = express();

// Configure AWS SDK
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB service object
const dynamoDB = new AWS.DynamoDB.DocumentClient();
console.log('DynamoDB connection established successfully.');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/faqs', faqRoutes);
app.use('/api/aboutus', aboutUsRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api', reportRoutes);
app.use('/api/contactus', contactusRoutes);
app.use('/api', categoryRoute);
app.use('/api/whychooseus', whychooseusRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/refund-policy', refundRoutes);
app.use('/api/ourservices', ourservicesRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/samplerequest', sampleRequestRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/privacypolicy', privacyPolicyRoutes);
app.use('/api', careerRoutes);
app.use('/api/adminreports', adminReportsRoutes);
app.use('/api/adminourservices', adminOurServicesRoutes);
app.use('/api/ask-discount', askDiscountRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});