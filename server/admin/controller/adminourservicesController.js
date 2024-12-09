const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const TABLE_NAME = "ourservices";

// Configure multer for S3
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "your-s3-bucket-name",
        key: (req, file, cb) => {
            cb(null, `services/${Date.now()}_${file.originalname}`);
        },
    }),
});

// Create a new service
const createService = async (req, res) => {
    try {
        // Validate required fields
        const { title, desc, icon } = req.body;
        const picture = req.file ? req.file.location : null;

        if (!title || !desc || !icon || !picture) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(),
                title,
                desc,
                icon,
                picture,
            },
        };

        await dynamoDB.put(params).promise();
        res.status(201).json({ message: "Service created successfully", item: params.Item });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { createService, upload };
