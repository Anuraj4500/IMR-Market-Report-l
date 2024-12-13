const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "career";

// Create a new Career
const createCareer = async (req, res) => {
    try {
        const { jobrole, jobdesc, workmode, location, experience, fresherallowed } = req.body;

        // Validate required fields
        if (!jobrole || !jobdesc || !workmode || !location || !experience || !fresherallowed) {
            return res.status(400).json({ message: "All fields (jobrole, jobdesc, workmode, location, experience, fresherallowed) are required!" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: Date.now(), // Unique ID based on timestamp
                jobrole,
                jobdesc,
                workmode,   
                location,
                experience,
                fresherallowed,
            },
        };

        await dynamoDB.put(params).promise();

        res.status(201).json({
            message: "Career created successfully",
            item: params.Item,
        });
    } catch (error) {
        console.error("Error creating career:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing career entry
const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const { jobrole, jobdesc, workmode, location, experience, fresherallowed } = req.body;

        // Validate required fields
        if (!id || (!jobrole && !jobdesc && !workmode && !location && !experience && fresherallowed === undefined)) {
            return res.status(400).json({ 
                message: "Invalid input data. Provide valid 'id' and at least one field to update." 
            });
        }

        // Dynamically build the update expression
        const updateExpressionParts = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (jobrole) {
            updateExpressionParts.push("#jobrole = :jobrole");
            expressionAttributeNames["#jobrole"] = "jobrole";
            expressionAttributeValues[":jobrole"] = jobrole;
        }
        if (jobdesc) {
            updateExpressionParts.push("#jobdesc = :jobdesc");
            expressionAttributeNames["#jobdesc"] = "jobdesc";
            expressionAttributeValues[":jobdesc"] = jobdesc;
        }
        if (workmode) {
            updateExpressionParts.push("#workmode = :workmode");
            expressionAttributeNames["#workmode"] = "workmode";
            expressionAttributeValues[":workmode"] = workmode;
        }
        if (location) {
            updateExpressionParts.push("#location = :location");
            expressionAttributeNames["#location"] = "location";
            expressionAttributeValues[":location"] = location;
        }
        if (experience) {
            updateExpressionParts.push("#experience = :experience");
            expressionAttributeNames["#experience"] = "experience";
            expressionAttributeValues[":experience"] = experience;
        }
        if (fresherallowed !== undefined) {
            updateExpressionParts.push("#fresherallowed = :fresherallowed");
            expressionAttributeNames["#fresherallowed"] = "fresherallowed";
            expressionAttributeValues[":fresherallowed"] = fresherallowed;
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
            message: "Career updated successfully",
            item: result.Attributes,
        });
    } catch (error) {
        console.error("Error updating career:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a Career by ID
const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;

        const params = {
            TableName: TABLE_NAME,
            Key: { id: Number(id) }, // Ensure ID is numeric
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ message: "Career not found" });
        }

        res.status(200).json({
            message: "Career retrieved successfully",
            item: result.Item,
        });
    } catch (error) {
        console.error("Error retrieving career:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all Careers
const getCareers = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const result = await dynamoDB.scan(params).promise();

        res.status(200).json(result.Items || []);
    } catch (error) {
        console.error("Error retrieving careers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const params = { TableName: TABLE_NAME, Key: { id: Number(id) } };
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: "Career deleted successfully" });
    } catch (error) {
        console.error("Error deleting career:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createCareer, updateCareer, getCareerById, getCareers, deleteCareer };
