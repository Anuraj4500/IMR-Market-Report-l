const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "login";

// Create a new Registration
const createRegistration = async (req, res) => {
    try {
        const { user_name, email, password, user_type } = req.body;

        // Validate required fields
        if (!user_name || !email || !password || !user_type) {
            return res.status(400).json({ message: "All fields (username, email, password, user_type) are required!" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(), // Unique ID based on timestamp
                user_name,
                email,
                password,
                user_type,
            },
        };

        await dynamoDB.put(params).promise();

        res.status(201).json({
            message: "Registration created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing career entry
const updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_name, email, password, user_type } = req.body;

        // Validate required fields
        if (!id || (!user_name && !email && !password && !user_type)) {
            return res.status(400).json({ 
                message: "Invalid input data. Provide valid 'id' and at least one field to update." 
            });
        }

        // Dynamically build the update expression
        const updateExpressionParts = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (user_name) {
            updateExpressionParts.push("#user_name = :user_name");
            expressionAttributeNames["#user_name"] = "user_name";
            expressionAttributeValues[":user_name"] = user_name;
        }
        if (email) {
            updateExpressionParts.push("#email = :email");
            expressionAttributeNames["#email"] = "email";
            expressionAttributeValues[":email"] = email;
        }
        if (password) {
            updateExpressionParts.push("#password = :password");
            expressionAttributeNames["#password"] = "password";
            expressionAttributeValues[":password"] = password;
        }
        if (user_type) {
            updateExpressionParts.push("#user_type = :user_type");
            expressionAttributeNames["#user_type"] = "user_type";
            expressionAttributeValues[":user_type"] = user_type;
        }

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure `id` is numeric
            UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoDB.update(params).promise();

        res.status(200).json({
            message: "Registration updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a Registration by ID
const getRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure ID is numeric
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json({
            message: "Registration retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all Registrations
const getRegistrations = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json(result.Items || []);
    } catch (error) {
        console.error("Error retrieving registrations:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const params = { TableName: TABLE_NAME, Key: { id: Number(id) } };
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        console.error("Error deleting registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createRegistration, updateRegistration, getRegistrationById, getRegistrations, deleteRegistration };
