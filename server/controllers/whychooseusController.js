// controllers/whychooseusController.js
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'whychooseus'; // DynamoDB table name

// Fetch data from DynamoDB
const getWhyChooseUsData = async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
};

module.exports = { getWhyChooseUsData };