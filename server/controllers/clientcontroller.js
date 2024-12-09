const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'client';

const getClients = async (req, res) => {
    console.log('Received request for clients');
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: error.message });
    }
};

const createClient = async (req, res) => {
    const { title, content, image } = req.body;
    const params = {
        TableName: TABLE_NAME,
        Item: { title, content, image }
    };
    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: 'Client created successfully' });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getClients, createClient };