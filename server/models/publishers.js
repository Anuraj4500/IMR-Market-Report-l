const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'publishers';

const getAllPublishers = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
};

module.exports = {
    getAllPublishers,
};