const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'refund';

// Fetch all refund policies
const getRefundPolicies = async (req, res) => {
    console.log('Received request for refund policies');
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error('Error fetching refund policies:', error);
        res.status(500).json({ message: error.message });
    }
};  

module.exports = { getRefundPolicies }; 