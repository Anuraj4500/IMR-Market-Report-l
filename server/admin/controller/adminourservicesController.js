const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { S3 } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

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
      const image = req.file;
  
      // Validate required fields
      if (!title || !desc || !icon || !image) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      // Ensure the target folder exists
      const targetDir = path.join(__dirname, "..", "..", "uploads", "Our_Services_Images");
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
  
      // Generate unique filename and define the relative path
      const uniqueFilename = `${Date.now()}-${image.originalname}`;
      const relativeImagePath = `uploads/Our_Services_Images/${uniqueFilename}`;
  
      // Move uploaded file to the target folder
      const targetPath = path.join(targetDir, uniqueFilename);
      fs.renameSync(image.path, targetPath);
  
      // Save only the relative path to the database
      const params = {
        TableName: TABLE_NAME,
        Item: {
          id: Date.now(),
          title,
          desc,
          icon,
          image: relativeImagePath, // Save relative path only
        },
      };
  
      await dynamoDB.put(params).promise();
  
      res.status(201).json({
        message: "Service created successfully",
        item: params.Item,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
// Update a service
  const updateOurService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, icon } = req.body;
        const image = req.file; // Uploaded image

        if (!id || (!title && !desc && !icon && !image)) {
            return res.status(400).json({ message: "Invalid input data!" });
        }

        const updateExpressionParts = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        if (title) {
            updateExpressionParts.push("#title = :title");
            expressionAttributeValues[":title"] = title;
            expressionAttributeNames["#title"] = "title";
        }
        if (desc) {
            updateExpressionParts.push("#desc = :desc");
            expressionAttributeValues[":desc"] = desc;
            expressionAttributeNames["#desc"] = "desc";
        }
        if (icon) {
            updateExpressionParts.push("#icon = :icon");
            expressionAttributeValues[":icon"] = icon;
            expressionAttributeNames["#icon"] = "icon";
        }

        let imagePath;
        if (image) {
            // Move uploaded file to permanent folder
            const targetDir = path.join(__dirname, "..", "uploads", "Our_Services_Images");
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

            const uniqueFilename = `${Date.now()}-${image.originalname}`;
            imagePath = `uploads/Our_Services_Images/${uniqueFilename}`;
            fs.renameSync(image.path, path.join(targetDir, uniqueFilename));

            updateExpressionParts.push("#image = :image");
            expressionAttributeValues[":image"] = imagePath;
            expressionAttributeNames["#image"] = "image";
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

