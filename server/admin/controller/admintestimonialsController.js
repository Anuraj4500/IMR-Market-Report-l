const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "testimonials";

// Create a new testimonial
const createTestimonial = async (req, res) => {
    try {
        const { designation, desc, sector } = req.body;

        // Validate required fields
        if (!designation || !desc || !sector) {
            return res.status(400).json({ message: "All fields (designation, desc, sector) are required!" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(), // Unique ID based on timestamp
                designation,
                desc,
                sector,
            },
        };

        await dynamoDB.put(params).promise();

        res.status(201).json({
            message: "Testimonial created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing testimonial
const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { designation, desc, sector } = req.body;

        // Validate required fields
        if (!id || (!designation && !desc && !sector)) {
            return res.status(400).json({ message: "Invalid input data. Provide valid 'id' and at least one field to update." });
        }

        // Dynamically build the update expression
        const updateExpressionParts = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (designation) {
            updateExpressionParts.push("#designation = :designation");
            expressionAttributeNames["#designation"] = "designation";
            expressionAttributeValues[":designation"] = designation;
        }
        if (desc) {
            updateExpressionParts.push("#desc = :desc");
            expressionAttributeNames["#desc"] = "desc";
            expressionAttributeValues[":desc"] = desc;
        }
        if (sector) {
            updateExpressionParts.push("#sector = :sector");
            expressionAttributeNames["#sector"] = "sector";
            expressionAttributeValues[":sector"] = sector;
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
            message: "Testimonial updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a testimonial by ID
const getTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure ID is numeric
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        res.status(200).json({
            message: "Testimonial retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving testimonial:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all testimonials
const getTestimonials = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json(result.Items || []);
    } catch (error) {
        console.error("Error retrieving testimonials:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteTestimonials = async (req, res) => {
    try {
        const { id } = req.params;
        const params = { TableName: TABLE_NAME, Key: { id: Number(id) } };
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createTestimonial, updateTestimonial, getTestimonialById, getTestimonials, deleteTestimonials };
