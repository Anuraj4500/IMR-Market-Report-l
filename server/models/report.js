const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'report';

// Fetch all reports
const getAllReports = async () => {
    const params = { TableName: TABLE_NAME };
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
};

// Fetch reports by cid
const getReportsByCid = async (cid, page = 1, limit = 10) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: '#cid = :cid',
        ExpressionAttributeNames: { '#cid': 'cid' },
        ExpressionAttributeValues: { ':cid': Number(cid) }, // Convert cid to a number
    };

    const data = await dynamoDB.scan(params).promise();

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const paginatedItems = data.Items.slice(startIndex, startIndex + limit);

    return {
        reports: paginatedItems,
        totalPages: Math.ceil(data.Items.length / limit),
    };
};

// Fetch report by ID
const getReportById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    const data = await dynamoDB.get(params).promise();
    return data.Item;
};

// Fetch report by slug
const getReportBySlug = async (slug) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: '#slug = :slug',
        ExpressionAttributeNames: { '#slug': 'slug' },
        ExpressionAttributeValues: { ':slug': slug },
    };

    const data = await dynamoDB.scan(params).promise();
    if (!data.Items || data.Items.length === 0) {
        throw new Error('Report not found');
    }
    return data.Items[0];
};

// Create a new report
const createReport = async (report) => {
    const params = {
        TableName: TABLE_NAME,
        Item: report,
    };
    await dynamoDB.put(params).promise();
};

// Update an existing report
const updateReport = async (id, report) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #title = :title, #summary = :summary',
        ExpressionAttributeNames: {
            '#title': 'title',
            '#summary': 'summary',
        },
        ExpressionAttributeValues: {
            ':title': report.title,
            ':summary': report.summary,
        },
    };
    await dynamoDB.update(params).promise();
};

// Delete a report
const deleteReport = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    await dynamoDB.delete(params).promise();
};

// Search reports by query
const searchReports = async (query) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'contains(#title, :query) OR contains(#summary, :query)',
        ExpressionAttributeNames: {
            '#title': 'title',
            '#summary': 'summary',
        },
        ExpressionAttributeValues: {
            ':query': query,
        },
    };

    const data = await dynamoDB.scan(params).promise();
    return data.Items;
};

module.exports = {
    getAllReports,
    getReportsByCid,
    getReportById,
    getReportBySlug,
    createReport,
    updateReport,
    deleteReport,
    searchReports,
};
