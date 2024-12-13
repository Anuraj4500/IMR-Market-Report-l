const AWS = require("aws-sdk");
const { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const multer = require('multer');
const path = require('path');

const TABLE_NAME = "client"; // Replace with your DynamoDB table name

// Configure AWS with the region from .env
AWS.config.update({ region: process.env.AWS_REGION });

// Create a DynamoDB client instance
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/client_images'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });
// Create a new client
exports.createClient = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body
        console.log("Uploaded File:", req.file); // Log the uploaded file

        console.log("Creating Client with data:", req.body);

        const requiredFields = ['id'];
        const missingFields = requiredFields.filter(field => !req.body[field] || String(req.body[field]).trim() === '');
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Ensure the image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required." });
        }

        const newClient = {
            id: { S: String(req.body.id) },
            image: { S: req.file.path }, // Store the path of the uploaded image
        };

        const params = {
            TableName: TABLE_NAME,
            Item: newClient,
        };

        const command = new PutItemCommand(params);
        await dynamoDB.send(command);

        res.status(201).json({ message: 'Client created successfully', data: newClient });
    } catch (error) {
        console.error("Error creating Client:", error.message);
        res.status(500).json({ message: 'Error creating Client', error: error.message });
    }
};

// Fetch all Clients   
exports.fetchAllClient = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        
        const transformedItems = data.Items.map(item => ({
            id: item.id.S,
            image: item.image.S,
        }));

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching Clients:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch Client by ID
exports.fetchClientById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { S: id } },
    };

    try {
        const command = new GetItemCommand(params);
        const data = await dynamoDB.send(command);
        if (!data.Item) {
            return res.status(404).json({ message: "Client not found." });
        }
        
        const transformedItem = {
            id: data.Item.id.S,
            image: data.Item.image.S,
        };

        res.status(200).json(transformedItem);
    } catch (error) {
        console.error("Error fetching Client:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Client
exports.updateClient = async (req, res) => {
    console.log("Update Client Request Received:", req.params.id); // Log the incoming request

    const { id } = req.params;
    const image = req.file ? req.file.path : null; // Get the image path from the uploaded file

    if (!id || !image) {
        return res.status(400).json({ message: "ID and image are required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { S: id } },
        UpdateExpression: "set #i = :image",
        ExpressionAttributeNames: {
            "#i": "image",
        },
        ExpressionAttributeValues: {
            ":image": { S: image },
        },
        ReturnValues: "ALL_NEW",
    };

    try {
        const command = new UpdateItemCommand(params);
        const data = await dynamoDB.send(command);
        if (!data.Attributes) {
            return res.status(404).json({ message: "Client not found." });
        }
        res.status(200).json({ message: "Client updated successfully!", updatedItem: data.Attributes });
    } catch (error) {
        console.error("Error updating Client:", error);
        res.status(500).json({ message: "Failed to update Client", error: error.message });
    }
};

// Delete Client
exports.deleteClient = async (req, res) => {
    const { id } = req.params;

    console.log("Delete Client Request Received for ID:", id); // Log the incoming request

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: { S: id },
        },
    };

    try {
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);
        res.status(200).json({ message: "Client deleted successfully!" });
    } catch (error) {
        console.error("Error deleting Client:", error);
        res.status(500).json({ message: "Failed to delete Client", error: error.message });
    }
};


