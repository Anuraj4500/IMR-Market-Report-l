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

const TABLE_NAME = "about";

AWS.config.update({ region: process.env.AWS_REGION });
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// Validate counter fields
const validateCounter = (value) => {
    const parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue) ? parsedValue : 0;
};

// Create About Us
exports.createAbout = async (req, res) => {
    try {
        const { 
            title1, 
            content1, 
            title2, 
            content2, 
            counter1, 
            counter2, 
            counter3, 
            counter4 
        } = req.body;

        // Validate input - ensure all text fields are present
        if (!title1 || !content1 || !title2 || !content2) {
            return res.status(400).json({ message: "All titles and contents are required." });
        }

        // Validate counter fields
        if (!counter1 || !counter2 || !counter3 || !counter4) {
            return res.status(400).json({ message: "All counter fields are required." });
        }

        // Validate file uploads
        if (!req.files || !req.files['image_1'] || !req.files['image_2']) {
            return res.status(400).json({ message: "Both images are required." });
        }

        // Get file paths from uploaded files
        const image_1 = req.files['image_1'][0].path;
        const image_2 = req.files['image_2'][0].path;

        // Construct DynamoDB item with validated counters
        const item = {
            id: { N: `${Date.now()}` },
            title1: { S: title1 },
            content1: { S: content1 },
            image_1: { S: image_1 },
            title2: { S: title2 },
            content2: { S: content2 },
            image_2: { S: image_2 },
            counter1: { N: String(validateCounter(counter1)) }, 
            counter2: { N: String(validateCounter(counter2)) }, 
            counter3: { N: String(validateCounter(counter3)) }, 
            counter4: { N: String(validateCounter(counter4)) }, 
        };

        const params = {
            TableName: TABLE_NAME,
            Item: item,
        };

        const command = new PutItemCommand(params);
        await dynamoDB.send(command);

        res.status(201).json({ 
            message: "About Us created successfully!", 
            data: {
                id: item.id.N,
                title1: item.title1.S,
                title2: item.title2.S,
                image_1: item.image_1.S,
                image_2: item.image_2.S
            }
        });
    } catch (error) {
        console.error("Error creating About Us:", error);
        res.status(500).json({ 
            message: "Error creating About Us", 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        });
    }
};

// Fetch all About Us entries
exports.fetchAllAbout = async (req, res) => {
    try {
        const params = { TableName: TABLE_NAME };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);

        // Log the data to understand its structure
        console.log("Fetched About Us Data:", JSON.stringify(data, null, 2));

        const transformedItems = data.Items.map(item => ({
            id: item.id?.N, // Use optional chaining
            title1: item.title1?.S ?? "N/A", // Use optional chaining and default value
            content1: item.content1?.S ?? "N/A", // Use optional chaining and default value
            title2: item.title2?.S ?? "N/A", // Add similar checks for other fields
            content2: item.content2?.S ?? "N/A",
            image_1: item.image_1?.S ?? "N/A",
            image_2: item.image_2?.S ?? "N/A",
            counter1: item.counter1?.S ?? "0",
            counter2: item.counter2?.S ?? "0",
            counter3: item.counter3?.S ?? "0",
            counter4: item.counter4?.S ?? "0",
        }));

        res.status(200).json(transformedItems);
    } catch (error) {
        console.error("Error fetching About Us:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch About Us by ID
exports.fetchAboutById = async (req, res) => {
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
            return res.status(404).json({ message: "About Us not found." });
        }

        const transformedItem = {
            id: data.Item.id.N,
            title1: data.Item.title1.S,
            content1: data.Item.content1.S,
            image_1: data.Item.image_1.S,
            title2: data.Item.title2.S,
            content2: data.Item.content2.S,
            image_2: data.Item.image_2.S,
            counter1: data.Item.counter1.S,
            counter2: data.Item.counter2.S,
            counter3: data.Item.counter3.S,
            counter4: data.Item.counter4.S,
        };

        res.status(200).json(transformedItem);
    } catch (error) {
        console.error("Error fetching About Us:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update About Us
exports.updateAbout = async (req, res) => {
    const { id } = req.params;

    console.log("Update About Request Received:");
    console.log("ID:", id);
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }

    try {
        // Validate required fields
        const requiredFields = ['title1', 'content1', 'title2', 'content2'];
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
            if (req.files['image_1'] && req.files['image_1'][0]) {
                updateData.image_1 = req.files['image_1'][0].path;
            }
            if (req.files['image_2'] && req.files['image_2'][0]) {
                updateData.image_2 = req.files['image_2'][0].path;
            }
        }

        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        // Dynamically build update expression
        Object.keys(updateData).forEach(key => {
            if (['title1', 'content1', 'title2', 'content2', 'image_1', 'image_2', 'counter1', 'counter2', 'counter3', 'counter4'].includes(key)) {
                const attributeName = `#${key}`;
                const attributeValue = `:${key}`;
                
                updateExpressions.push(`${attributeName} = ${attributeValue}`);
                expressionAttributeNames[attributeName] = key;
                
                // Handle numeric and string values appropriately
                const numericFields = ['counter1', 'counter2', 'counter3', 'counter4'];
                expressionAttributeValues[attributeValue] = numericFields.includes(key) 
                    ? { N: String(updateData[key]) } 
                    : { S: updateData[key] };
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
            message: "About Us updated successfully!", 
            updatedItem: data.Attributes 
        });

    } catch (error) {
        console.error("Detailed Error updating About Us:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        res.status(500).json({ 
            message: "Failed to update About Us", 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Delete About Us
exports.deleteAbout = async (req, res) => {
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

        res.status(200).json({ message: "About Us deleted successfully!" });
    } catch (error) {
        console.error("Error deleting About Us:", error);
        res.status(500).json({ message: "Failed to delete About Us", error: error.message });
    }
};


