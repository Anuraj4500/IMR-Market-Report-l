const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const app = express();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "home";

// Middleware to handle file uploads
const upload = multer({
    dest: 'uploads/tmp/', // Temporary folder to store uploaded files
});

// Create a new Home
const createHome = async (req, res) => {
    try {
        const { slogan } = req.body;
        const image = req.file;

        // Validate required fields
        if (!slogan || !image) {
            return res.status(400).json({ message: "All fields (slogan, image) are required!" });
        }

        // Ensure the target folder exists
        const targetDir = path.join(__dirname, "..", "..", "uploads", "Home_Images");
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Generate a unique filename
        const uniqueFilename = `${Date.now()}-${image.originalname}`;
        const targetPath = path.join(targetDir, uniqueFilename);

        // Move the file to the target directory
        fs.renameSync(image.path, targetPath);

        // Generate the image path for DynamoDB (string format)
        const imagePath = `uploads\\Home_Images\\${uniqueFilename}`; // Save the path as a string

        // Insert item into DynamoDB
        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(), // Unique ID based on timestamp
                slogan,
                image: imagePath, // Store the image path as a string
            },
        };

        await dynamoDB.put(params).promise();

        res.status(201).json({
            message: "Home created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating home:", error);

        // Cleanup: If file was uploaded but not moved, delete it
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a Home
const updateHome = async (req, res) => {
    try {
        const { id } = req.params;
        const { slogan } = req.body;
        const image = req.file;

        // // Validate inputs: Ensure both id is provided and at least one field (slogan or image) is set.
        if (!id || (!slogan && !image)) {
            return res.status(400).json({
                message: "Invalid input data. Provide valid 'id' and at least one field (slogan or image) to update.",
            });
        }

        // Initialize update components
        const updateExpressionParts = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (slogan) {
            updateExpressionParts.push("#slogan = :slogan");
            expressionAttributeNames["#slogan"] = "slogan";
            expressionAttributeValues[":slogan"] = slogan;
        }

        let imagePath; // To hold the new image path

        if (image) {
            // Ensure the target folder exists
            const targetDir = path.join(__dirname, "..", "..", "uploads", "Home_Images");
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // Generate unique filename and move file
            const uniqueFilename = `${Date.now()}-${image.originalname}`;
            imagePath = `uploads/Home_Images/${uniqueFilename}`;
            const targetPath = path.join(targetDir, uniqueFilename);

            try {
                fs.renameSync(image.path, targetPath); // Move file
                updateExpressionParts.push("#image = :image");
                expressionAttributeNames["#image"] = "image";
                expressionAttributeValues[":image"] = imagePath;
            } catch (err) {
                // Cleanup temporary file in case of error
                if (fs.existsSync(image.path)) {
                    fs.unlinkSync(image.path);
                }
                throw new Error("Failed to save the uploaded image.");
            }
        }

        // Build the DynamoDB update params
        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure ID is numeric
            UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW", // Return updated item
        };

        // Update in DynamoDB
        const result = await dynamoDB.update(params).promise();

        res.status(200).json({
            message: "Home updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating home:", error);

        // Cleanup temporary file if it wasn't moved
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Get a Home by ID
const getHomeById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure ID is numeric
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Home not found" });
        }

        res.status(200).json({
            message: "Home retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving home:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all Homes
const getHomes = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json(result.Items || []);
    } catch (error) {
        console.error("Error retrieving homes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteHome = async (req, res) => {
    try {
        const { id } = req.params;
        const params = { TableName: TABLE_NAME, Key: { id: Number(id) } };
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: "Home deleted successfully" });
    } catch (error) {
        console.error("Error deleting home:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createHome, updateHome, getHomeById, getHomes, deleteHome, upload };
