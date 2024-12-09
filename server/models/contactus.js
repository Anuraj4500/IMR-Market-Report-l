const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = 'contactus';

const addContact = async (contactData) => {
    const params = {
        TableName: tableName,
        Item: contactData,
    };

    try {
        await dynamoDB.put(params).promise();
        return { success: true };
    } catch (error) {
        console.error('DynamoDB put error:', error);
        return { success: false, error };
    }
};

module.exports = { addContact };
