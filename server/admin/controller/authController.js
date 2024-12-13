const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB(); // Use low-level API
const TABLE_NAME = 'login';

// Configure AWS region
AWS.config.update({ region: 'us-east-1' });

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with:", { email });

    try {
        const params = {
            TableName: TABLE_NAME,
        };

        // Scan the table for users
        const result = await dynamoDB.scan(params).promise();

        // Find the user with the matching email
        const user = result.Items.find((user) => user.email.S === email);

        // If no user is found
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password!' });
        }

        // Check password
        if (user.password.S !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password!' });
        }

        // Success
        return res.status(200).json({ success: true, message: 'Login successful!' });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: 'Server error!', error: error.message });
    }
};

module.exports = { login };
