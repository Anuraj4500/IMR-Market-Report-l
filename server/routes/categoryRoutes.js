const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// Configure DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'category';

// Route to fetch all categories
router.get('/category', async (req, res) => {
    console.log('Received request for categories');
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const data = await dynamoDB.scan(params).promise();
        console.log('Categories fetched:', data.Items);
        res.json(data.Items);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;