const AWS = require("aws-sdk");
const { DynamoDBClient, ScanCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const TABLE_NAME1 = "request_samples";
const TABLE_NAME2 = "checkouts";
const TABLE_NAME3 = "discount";

AWS.config.update({ region: process.env.AWS_REGION });
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME1,
        };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        
        // Transform the data to extract values
        const transformedItems = data.Items.map(item => ({
            id: item.id ? item.id.S : null,
            name: item.name ? item.name.S : null,
            email: item.email ? item.email.S : null,
            phone: item.phone ? item.phone.S : null,
            country: item.country ? item.country.S : null,
            company: item.company ? item.company.S : null,
            rid: item.rid ? item.rid.S : null,
            requestdate: item.requestdate ? item.requestdate.S : null,
        })).filter(item => item.id !== null);

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteRequests = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }
    try {
        const params = {
            TableName: TABLE_NAME1,
            Key: { id: { S: id } },
        };
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);
        res.status(200).json({ message: "Request deleted successfully." });
    } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllCheckouts = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME2,
        };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        
        // Transform the data to extract values
        const transformedItems = data.Items.map(item => ({
            id: item.id ? item.id.S : null,
            name: item.name ? item.name.S : null,
            email: item.email ? item.email.S : null,
            phone: item.phone ? item.phone.S : null,
            city: item.city ? item.city.S : null,
            state: item.state ? item.state.S : null,
            designation: item.designation ? item.designation.S : null,
            country: item.country ? item.country.S : null,
            company: item.company ? item.company.S : null,
            reportId: item.reportId.S,
            requestDate: item.requestDate ? item.requestDate.S : null,
        })).filter(item => item.id !== null);

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteCheckouts = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }
    try {
        const params = {
            TableName: TABLE_NAME2,
            Key: { id: { S: id } },
        };
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);
        res.status(200).json({ message: "Checkout deleted successfully." });
    } catch (error) {
        console.error("Error deleting checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllDiscount = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME3,
        };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        
        // Transform the data to extract values
        const transformedItems = data.Items.map(item => ({
            id: item.id ? item.id.S : null,
            name: item.name ? item.name.S : null,
            email: item.email ? item.email.S : null,
            phone: item.phone ? item.phone.S : null,
            country: item.country ? item.country.S : null,
            company: item.company ? item.company.S : null,
            rid: item.rid ? item.rid.S : null,
            requestdate: item.requestdate ? item.requestdate.S : null,
      
        
        })).filter(item => item.id !== null);

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteDiscount = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }
    try {
        const params = {
            TableName: TABLE_NAME3,
            Key: { id: { S: id } },
        };
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);
        res.status(200).json({ message: "Discount deleted successfully." });
    } catch (error) {
        console.error("Error deleting discount:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


