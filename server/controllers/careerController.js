const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const submitCareerForm = async (req, res) => {
    try {
        const { name, email, mobile, captcha } = req.body;
        const file = req.file;

        if (!name || !email || !mobile || !file || !captcha) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Upload the file to S3
        const uploadParams = {
            Bucket: 'your-s3-bucket-name',
            Key: `${Date.now()}_${file.originalname}`,
            Body: file.buffer,
        };
        const s3Result = await s3.upload(uploadParams).promise();

        // Save data to DynamoDB
        const careerFormEntry = {
            TableName: 'careerform',
            Item: {
                id: Date.now(), // Number ID
                name,
                email,
                mobile,
                fileUrl: s3Result.Location,
                captcha,
                createdAt: new Date().toISOString(),
            },
        };

        await dynamoDB.put(careerFormEntry).promise();

        // Send notification email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'career@imrmarketreports.com', // Change to the desired recipient
            subject: 'New Career Form Submission',
            html: `
                <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #333; margin-bottom: 10px;">New Career Form Submission</h2>
                    <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
                    <p style="margin-bottom: 10px;"><strong>Mobile:</strong> ${mobile}</p>
                    <p style="margin-bottom: 10px;"><strong>File URL:</strong> <a href="${s3Result.Location}" style="color: #007bff; text-decoration: none;">View File</a></p>
                    <p style="color: #666; font-size: 14px;">This is an automated email notification. Please do not reply to this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(adminMailOptions);

        // Send confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank You for Your Submission',
            html: `
                <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #333; margin-bottom: 10px;">Thank You, ${name}!</h2>
                    <p style="margin-bottom: 10px;">We have received your career form submission. Our team will review it and get back to you shortly.</p>
                    <p style="margin-bottom: 10px;">Here are the details of your submission:</p>
                    <ul style="margin-left: 20px;">
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Mobile:</strong> ${mobile}</li>
                        <li><strong>File URL:</strong> <a href="${s3Result.Location}" style="color: #007bff; text-decoration: none;">View File</a></li>
                    </ul>
                    <p style="color: #666; font-size: 14px;">Thank you for choosing us. This is an automated email. Please do not reply to this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(userMailOptions);

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving career form:', error);
        res.status(500).json({ message: 'Error saving form submission.', error: error.message });
    }
};

module.exports = { submitCareerForm };
