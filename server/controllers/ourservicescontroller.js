const AWS = require('aws-sdk');

// Configure DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'ourservices'; // Ensure this matches your DynamoDB table name

// Fetch all our services
const getOurServices = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items); // Return the items from DynamoDB
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOurServices }; 