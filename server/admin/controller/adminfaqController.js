const AWS = require("aws-sdk");
const { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');

const TABLE_NAME = "faq"; // Replace with your DynamoDB table name

// Configure AWS with the region from .env
AWS.config.update({ region: process.env.AWS_REGION });

// Create a DynamoDB client instance
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// Create a new report
exports.createFaq = async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log("Creating FAQ with data:", req.body);

        // Validate required fields
        const requiredFields = ['que', 'ans', 'id'];
        const missingFields = requiredFields.filter(field => !req.body[field] || String(req.body[field]).trim() === '');
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }
        const newReport = {
            id: { S: String(req.body.id) }, // Explicitly set the type to String
            que: { S: req.body.que },
            ans: { S: req.body.ans },
        };

        const params = {
            TableName: TABLE_NAME,
            Item: newReport,
        };

        const command = new PutItemCommand(params);
        await dynamoDB.send(command);

        res.status(201).json({ message: 'FAQ created successfully', data: newReport });
    } catch (error) {
        console.error("Error creating FAQ:", error.message);
        res.status(500).json({ message: 'Error creating FAQ', error: error.message });
    }
};

// Fetch all FAQs
exports.fetchAllFaq = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        
        // Transform the data to extract values
        const transformedItems = data.Items.map(item => ({
            id: item.id.S,
            que: item.que.S,
            ans: item.ans.S,
        }));

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch FAQ by ID
exports.fetchFaqById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { S: id } }, // Correctly formatted key
    };

    try {
        const command = new GetItemCommand(params); // Use GetItemCommand
        const data = await dynamoDB.send(command); // Send the command
        if (!data.Item) {
            return res.status(404).json({ message: "FAQ not found." });
        }
        
        // Transform the data to extract values
        const transformedItem = {
            id: data.Item.id.S,
            que: data.Item.que.S,
            ans: data.Item.ans.S,
        };

        res.status(200).json(transformedItem);
    } catch (error) {
        console.error("Error fetching FAQ:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateFaq = async (req, res) => {
    const { id } = req.params;
    const { que, ans } = req.body;
    console.log(req.body);

    if (!id || (!que && !ans)) {
        return res.status(400).json({ message: "ID and at least one field (que or ans) are required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { S: id } },
        UpdateExpression: "set #q = :que, #a = :ans",
        ExpressionAttributeNames: {
            "#q": "que",
            "#a": "ans",
        },
        ExpressionAttributeValues: {
            ":que": { S: que },
            ":ans": { S: ans },
        },
        ReturnValues: "ALL_NEW",
    };

    try {
        const command = new UpdateItemCommand(params);
        const data = await dynamoDB.send(command);
        res.status(200).json({ message: "FAQ updated successfully!", updatedItem: data.Attributes });
    } catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).json({ message: "Failed to update FAQ", error: error.message });
    }
};

exports.deleteFaq = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: { S: id }, // Explicitly setting the type
        },
    };

    try {
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);

        res.status(200).json({ message: "FAQ deleted successfully!" });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).json({ message: "Failed to delete FAQ", error: error.message });
    }
};


