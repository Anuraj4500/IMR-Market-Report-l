const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient(); 

const TABLE_NAME = 'discount';

const addAskDiscount = async (discountRequest) => {
    const params = {
        TableName: TABLE_NAME,
        Item: discountRequest
    };
    await dynamoDB.put(params).promise();
};

try{
    await addSampleRequest(sampleRequest);
    return { success: true };
  } catch (error) {
    console.error('DynamoDB put error:', error);
    return { success: false, error };
  }
  const askdiscountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true
    },
    country: String,
    company: {
        type: String,
        required: [true, 'Company is required'],
        trim: true
    },
    designation: String,
    message: String,
    reportId: {
        type: String,
        required: [true, 'Report ID is required'],
        trim: true
    },
    reportTitle: String,
    slug: String,
    category: String,
    requestDate: {
        type: Date,
        default: Date.now
    },
    requestType: {
        type: String,
        default: 'sample'
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true,
    collection: 'discount'
});

// Add pre-save middleware for additional validation
askdiscountSchema.pre('save', function(next) {
    console.log('Pre-save middleware running for discount request:', this);
    next();
});

module.exports = {addAskDiscount};