const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// Fetch testimonials from DynamoDB
const getPublishers = async (req, res) => {
  const params = {
    TableName: 'publishers',  // Replace with your DynamoDB table name
  };

  try {
    const data = await docClient.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error('Error fetching publishers:', error);
    res.status(500).json({ error: 'Unable to fetch publishers' });
  }
};

module.exports = { getPublishers };
