const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'privacypolicy';

const getPrivacy = async (req, res) => {
    console.log('Received request for privacy policy');
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error('Error fetching privacy policy:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPrivacy };