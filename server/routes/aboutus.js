// routes/aboutus.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk'); // Add AWS SDK
const dynamoDB = new AWS.DynamoDB.DocumentClient(); // Initialize DynamoDB Document Client

router.get('/', async (req, res) => {
    console.log('Received request for about'); // Debugging log
    try {
        const params = {
            TableName: 'about', // Specify the DynamoDB table name
        };
        const data = await dynamoDB.scan(params).promise(); // Use scan to fetch data
        console.log('Fetched about:', data.Items); // Log fetched about
        res.json(data.Items); // Return the fetched items
    } catch (error) {
        console.error('Error fetching about:', error); // Log error
        res.status(500).json({ message: 'Error fetching about' });
    }
});

module.exports = router;
