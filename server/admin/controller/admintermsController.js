const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || "terms";

// Create a new term
const createTerm = async (req, res) => {
    console.log("API called to create term");
    try {
        const { title, content } = req.body;
        console.log("Request body:", req.body);

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({ message: "All fields (title, content) are required!" });
        }

        // Generate a unique numeric `id`
        const id = Date.now(); // Convert to string if `id` in DynamoDB is a string

        // DynamoDB parameters
        const params = {
            TableName: TABLE_NAME,
            Item: {
                id, // Ensure this matches the expected type in your DynamoDB schema
                title,
                content,
            },
        };

        // Debugging logs
        console.log("DynamoDB params:", JSON.stringify(params, null, 2));

        // Insert item into DynamoDB
        await dynamoDB.put(params).promise();

        res.status(201).json({
            message: "Term created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating term:", JSON.stringify(error, null, 2));
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



// Update an existing term
const updateTerm = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!id || (!title && !content)) {
            return res.status(400).json({ message: "Provide a valid 'id' and at least one field to update." });
        }

        const updateExpressionParts = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (title) {
            updateExpressionParts.push("#title = :title");
            expressionAttributeNames["#title"] = "title";
            expressionAttributeValues[":title"] = title;
        }

        if (content) {
            updateExpressionParts.push("#content = :content");
            expressionAttributeNames["#content"] = "content";
            expressionAttributeValues[":content"] = content;
        }

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) },
            UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoDB.update(params).promise();

        res.status(200).json({
            message: "Term updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating term:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a term by ID
const getTermById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) },
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Term not found" });
        }

        res.status(200).json({
            message: "Term retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving term:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all terms with pagination
const getTerms = async (req, res) => {
    try {
        const { lastKey } = req.query;

        const params = {
            TableName: TABLE_NAME,
            Limit: 10, // Limit items per request
            ExclusiveStartKey: lastKey ? JSON.parse(lastKey) : undefined,
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json({
            items: result.Items || [],
            lastKey: result.LastEvaluatedKey || null,
        });
    } catch (error) {
        console.error("Error retrieving terms:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a term by ID
const deleteTerm = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) },
        };

        await dynamoDB.delete(params).promise();

        res.status(200).json({ message: "Term deleted successfully" });
    } catch (error) {
        console.error("Error deleting term:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createTerm, updateTerm, getTermById, getTerms, deleteTerm };
