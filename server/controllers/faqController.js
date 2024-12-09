const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'faq';

// Get all FAQs
const getFaqs = async (req, res) => {
    console.log('Received request for FAQs');
    try {
        const params = {  
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new FAQ
const createFaqs = async (req, res) => {
    const { que, ans } = req.body;
    try {
        const newFaq = { que, ans };
        const params = {
            TableName: TABLE_NAME,
            Item: newFaq,
        };
        await dynamoDB.put(params).promise();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getFaqs, createFaqs }; 