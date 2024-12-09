const AWS = require('aws-sdk'); // Import the Terms model

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'terms';

// Get all terms and conditions
const getTerms = async (req, res) => {
    console.log('Received request for Terms');
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error('Error fetching terms:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new term and condition
const createTerm = async (req, res) => {
    const { title, content } = req.body; // Destructure the request body
    try {
        const newTerm = { title, content };
        const params = {
            TableName: TABLE_NAME,
            Item: newTerm,
        };
         await dynamoDB.put(params).promise();
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTerms, createTerm }; // Export the controller functions
