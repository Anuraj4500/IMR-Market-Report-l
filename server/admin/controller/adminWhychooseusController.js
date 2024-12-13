const AWS = require("aws-sdk");
const {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const path = require('path');

const TABLE_NAME = "whychooseus";

AWS.config.update({ region: process.env.AWS_REGION });
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });



// Create Why Choose Us
exports.createWhychooseus = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.files['image'];

        // Validate input - ensure all text fields are present
        if (!title || !content || !image || image.length === 0) {
            return res.status(400).json({ message: "All title, content, and image fields are required." });
        }

        // Get file path from uploaded files
        const imagePath = image[0].path;

        // Construct DynamoDB item with validated counters
        const item = {
            id: { N: `${Date.now()}` },
            title: { S: title },
            content: { S: content },
            image: { S: imagePath },
        };

        const params = {
            TableName: TABLE_NAME,
            Item: item,
        };

        const command = new PutItemCommand(params);
        await dynamoDB.send(command);

        res.status(201).json({ 
            message: "Why Choose Us created successfully!", 
            data: {
                id: item.id.N,
                title: item.title.S,
                content: item.content.S,
                image: item.image.S
            }
        });
    } catch (error) {
        console.error("Error creating Why Choose Us:", error);
        res.status(500).json({ 
            message: "Error creating Why Choose Us", 
            error: error.message || "Unknown error occurred",
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        });
    }
};

// Fetch all Why Choose Us entries
exports.fetchAllWhychooseus  = async (req, res) => {
    try {
        const params = { TableName: TABLE_NAME };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);

        // Log the data to understand its structure
        console.log("Fetched Why Choose Us Data:", JSON.stringify(data, null, 2));

        const transformedItems = data.Items.map(item => ({
            id: item.id?.N, // Use optional chaining
            title: item.title?.S ?? "N/A", // Use optional chaining and default value
            content: item.content?.S ?? "N/A", // Use optional chaining and default value
            image: item.image?.S ?? "N/A",
            
        }));

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching Why Choose Us:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch Why Choose Us by ID
exports.fetchWhychooseusById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { N: id } },
    };

    try {
        const command = new GetItemCommand(params);
        const data = await dynamoDB.send(command);

        if (!data.Item) {
            return res.status(404).json({ message: "Why Choose Us not found." });
        }

        const transformedItem = {
            id: data.Item.id.N,
            title: data.Item.title.S,
            content: data.Item.content.S,
            image: data.Item.image.S,
           

        };

        res.status(200).json(transformedItem);
    } catch (error) {
        console.error("Error fetching Why Choose Us:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Why Choose Us
exports.updateWhychooseus = async (req, res) => {
    const { id } = req.params;

    console.log("Update Why Choose Us Request Received:");
    console.log("ID:", id);
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    try {
        // Validate required fields
        const requiredFields = ['title', 'content'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}`,
                missingFields: missingFields
            });
        }

        // Validate file uploads
        const updateData = { ...req.body };

        // Handle file paths for images
        if (req.files) {
            if (req.files['image'] && req.files['image'][0]) {
                updateData.image = req.files['image'][0].path;
            }
        }

        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        // Dynamically build update expression
        Object.keys(updateData).forEach(key => {
            if (['title', 'content', 'image'].includes(key)) {
                const attributeName = `#${key}`;
                const attributeValue = `:${key}`;
                
                updateExpressions.push(`${attributeName} = ${attributeValue}`);
                expressionAttributeNames[attributeName] = key;
                
                // Handle numeric and string values appropriately
                expressionAttributeValues[attributeValue] = { S: updateData[key] };
            }
        });

        if (updateExpressions.length === 0) {
            return res.status(400).json({ message: "No valid update fields provided" });
        }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { N: id } },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };

        const command = new UpdateItemCommand(params);
        const data = await dynamoDB.send(command);

        console.log("Update Successful:", data);

        res.status(200).json({ 
            message: "Why Choose Us updated successfully!", 
            updatedItem: data.Attributes 
        });

    } catch (error) {
        console.error("Detailed Error updating Why Choose Us:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        res.status(500).json({ 
            message: "Failed to update Why Choose Us", 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Delete Why Choose Us
    exports.deleteWhychooseus = async (req, res) => {
    const { id } = req.params;  

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id: { N: id } },
    };

    try {
        const command = new DeleteItemCommand(params);
        await dynamoDB.send(command);

        res.status(200).json({ message: "Why Choose Us deleted successfully!" });
    } catch (error) {
        console.error("Error deleting Why Choose Us:", error);
        res.status(500).json({ message: "Failed to delete Why Choose Us", error: error.message });
    }
};


