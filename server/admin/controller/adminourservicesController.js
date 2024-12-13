const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { S3 } = require("@aws-sdk/client-s3");

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const TABLE_NAME = "ourservices";

// Create a new service
const createService = async (req, res) => {
    try {
        const { title, desc, icon } = req.body;

        // Validate required fields
        if (!title || !desc || !icon) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(),
                title,
                desc,
                icon,
            },
        };

        await dynamoDB.get(params).promise();
        res.status(201).json({
            message: "Service created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing service
const updateOurService = async (req, res) => {
    try {
        const { id } = req.params; // Extract service ID from request params
        const { title, desc, icon } = req.body; // Extract updated fields from the request body

        // Validate required fields
        if (!id || (!title && !desc && !icon)) {
            return res.status(400).json({ message: "Invalid input data!" });
        }

        // Define the update expression dynamically based on provided fields
        const updateExpressionParts = [];
        const expressionAttributeValues = {};

        if (title) {
            updateExpressionParts.push("#title = :title");
            expressionAttributeValues[":title"] = title;
        }
        if (desc) {
            updateExpressionParts.push("#desc = :desc");
            expressionAttributeValues[":desc"] = desc;
        }
        if (icon) {
            updateExpressionParts.push("#icon = :icon");
            expressionAttributeValues[":icon"] = icon;
        }

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure `id` is numeric if required
            UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
            ExpressionAttributeNames: {
                "#title": "title",
                "#desc": "desc",
                "#icon": "icon",
            },
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoDB.update(params).promise();

        res.status(200).json({
            message: "Service updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller method to get a service by ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure the ID is numeric
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Service retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteOurService = async (req, res) => {
    try {
        const { id } = req.params;
        const params = { TableName: TABLE_NAME, Key: { id: Number(id) } };
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Export the functions
module.exports = { createService, updateOurService, getServiceById, deleteOurService };

