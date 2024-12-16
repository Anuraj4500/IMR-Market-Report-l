const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Slack Webhook URL (Set this in your environment variables)
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

transporter.verify((error) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email configuration is valid.');
    }
});
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);
// Create a new discount request

const submitAskDiscount = async (req, res) => {
    try {
        // Add IP address to the request body
        const { reportTitle, name, email, phone, country, company, designation, message, rid } = req.body;
        if (reportTitle, !name || !email || !phone || !country || !company || !designation) {
            return res.status(400).json({ message: 'All fields are required except message.' });
        }
        const id = Date.now().toString();

        // Get the current date in India Standard Time (IST)
        const options = { timeZone: 'Asia/Kolkata', hour12: false };
        const dateIST = new Date().toLocaleString('en-US', options);

        const askDiscountEntry = {
            TableName: 'discount',
            Item: {
                id,
                reportTitle,
                name,
                email,
                phone,
                country,
                company,
                designation,
                message,
                rid,
                requestDate: dateIST,
            }
        };
        await dynamoDB.put(askDiscountEntry).promise();

        // Path to the file where the current ID is stored
        const idFilePath = path.join(__dirname, '../uploads/discountcurrentID.txt');

        // Function to get the current ID
        const getCurrentID = () => {
            if (!fs.existsSync(idFilePath)) {
                fs.writeFileSync(idFilePath, '3221'); // Initialize with 3221 if file doesn't exist
            }
            const id = parseInt(fs.readFileSync(idFilePath, 'utf8'), 10);
            return id;
        };

        // Function to increment and save the new ID
        const incrementID = (currentID) => {
            const newID = currentID + 1;
            fs.writeFileSync(idFilePath, newID.toString());
            return newID;
        };

        const currentID = getCurrentID();
        const nextID = incrementID(currentID);

        // Send email notification
        const emailNotification = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Discount Request Submitted - ${req.body.reportTitle}`,
            html: `
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #ddd;">
                    <div style="background-color: #f96641; color: #fff; text-align: center; padding: 20px;">
                        <h1 style="margin: 0; font-size: 22px;">New Discount Request Submitted</h1>
                    </div>
                    <div style="padding: 20px;">
                    <h5 style="font-size: 16px; margin-bottom: 10px;">IMR-DIS-${currentID}</h5>
                        <p style="font-size: 15px; margin-bottom: 20px;">You have received a new discount request. Below are the details:</p>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <tbody>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Report ID</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.rid}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Report Title</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.reportTitle}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Name</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.name}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Email</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.email}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Phone</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.phone}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Country</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.country}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Company</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.company}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Designation</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.designation}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Message</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.message || 'N/A'}</td>
                                </tr>
                                <tr style="background-color: #f9f9f9;">
                                    <td style="font-weight: bold; padding: 12px; border: 1px solid #ddd; color: #555;">Date</td>
                                    <td style="padding: 12px; border: 1px solid #ddd; color: #333;">${req.body.requestDate}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style="font-size: 14px; color: #666; text-align: center; margin: 0;">
                            Thank you for using our services!<br />
                            <strong>IMR Market Reports</strong>
                        </p>
                    </div>
                    <div style="background-color: #f9f9f9; text-align: center; padding: 15px;">
                        <p style="font-size: 12px; color: #888; margin: 0;">&copy; ${new Date().getFullYear()} IMR Market Reports. All rights reserved.</p>
                    </div>
                </div>
        `,
        };
        await transporter.sendMail(emailNotification); // Send the email

        // Send email notification to the user
        const userEmailNotification = {
            from: process.env.EMAIL_USER,
            to: req.body.email, // Send confirmation to the user's email
            subject: `IMR- Discount Request - <b>${req.body.reportTitle}</b>`,
            html: (function () {
                const isPersonalEmail = /@(gmail|yahoo|hotmail|outlook)\.com$/i.test(req.body.email);
                if (isPersonalEmail) {
                    return `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                            <p style="font-size: 16px;">Dear <b>${req.body.name}</b>,</p>
                            <p style="font-size: 15px;">Greetings from IMR Market Reports!</p>
                            <p style="font-size: 15px;">
                                Thank you for requesting the discount for the <strong>${req.body.reportTitle}</strong>.
                                We are happy to extend the highest possible discount for this report. Our sales executive will connect with you shortly to share the discounted plans and benefits.
                            </p>
                            <p style="font-size: 15px;">
                                To proceed further, kindly share your official work email address for all correspondence to ensure seamless engagement and access to exclusive benefits, along with prioritized support from our sales team. Please be aware that your information is always secure (<a href="https://www.imrmarketreports.com/privacy-policy/" target="_blank">Read more about our privacy policies</a>) with us.
                            </p>
                            <p style="font-size: 15px;">
                                Additionally, we request you to let us know your preferred timeline for receiving this project.
                            </p>
                            <p style="font-size: 15px;">
                                If you require any further assistance or have additional queries, please feel free to contact us at <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a>.
                            </p>
                            <p style="font-size: 15px; margin-top: 20px;">Thanks and Best Regards,</p>
                            <p style="font-size: 15px;">
                                <b>Adlen</b><br>
                                Strategic Research Partner<br>
                                Syndicated Market Research Reports | Customized Market Research | Consulting Services<br>
                                <b>IMR Market Reports</b><br>
                                Contact: +91-81800-96367<br>
                                <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a> | <a href="https://www.imrmarketreports.com">https://www.imrmarketreports.com</a>
                            </p>
                        </div>
                    `;
                } else {
                    return `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                            <p style="font-size: 15px;">Dear <b>${req.body.name}</b>,</p>
                            <p style="font-size: 15px;">Greetings from IMR Market Reports!</p>
                            <p style="font-size: 15px;">
                                Thank you for requesting the discount for the <strong>${req.body.reportTitle}</strong>. We are pleased to inform you that we will offer you the highest possible discount on this report.
                            </p>
                            <p style="font-size: 15px;">
                                Our sales executive will connect with you shortly to share the discounted plans and benefits. Meanwhile, we kindly request you to let us know your preferred timeline for receiving this project.
                            </p>
                            <p style="font-size: 15px;">
                                If you require any further assistance or have additional queries, please feel free to contact us at <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a>.
                            </p>
                            <p style="font-size: 15px; margin-top: 20px;">Thanks and Best Regards,</p>
                            <p style="font-size: 15px;">
                                <b>Adlen</b><br>
                                Strategic Research Partner<br>
                                Syndicated Market Research Reports | Customized Market Research | Consulting Services<br>
                                <b>IMR Market Reports</b><br>
                                Contact: +91-81800-96367<br>
                                <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a> | <a href="https://www.imrmarketreports.com">https://www.imrmarketreports.com</a>
                            </p>
                            <p style="font-size: 14px; color: #555;">
                                <i>This is an automated message. Please do not reply to this email.</i>
                            </p>
                        </div>
                    `;
                }
            })(),
        };

        // Send the confirmation email to the user
        await transporter.sendMail(userEmailNotification);

        // Slack notification
        const slackMessage = {
            text: `*Report ID*: IMR-DIS-${currentID}\n*Report Title*: ${req.body.reportTitle}\n*Name*: ${req.body.name}\n*Email*: ${req.body.email}\n*Phone*: ${req.body.phone}\n*Country*: ${req.body.country}\n*Company*: ${req.body.company}\n*Designation*: ${req.body.designation}\n*Message*: ${req.body.message || 'N/A'}\n*Date*: ${req.body.requestDate}`,
        };

         // Send Slack message using the webhook URL
         await axios.post(slackWebhookUrl, slackMessage);

        res.status(201).json({ message: 'Discount request created successfully!' });
    } catch (error) {
        console.error('Error saving submission:', error);
        if (error.message.includes('Invalid login')) {
            console.error('Invalid email credentials. Check your configuration.');
            return res.status(401).json({ message: 'Invalid email credentials. Please check your email configuration.' });
        }
        res.status(500).json({ message: 'Error saving submission.', error: error.message });
    }
};

// Get all discount requests
const getAllAskDiscounts = async (req, res) => {
    try {
        const requests = await AskDiscount.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching discount requests:', error);
        res.status(500).json({ message: 'Error fetching discount requests', error: error.message });
    }
};

// Get a specific discount request by ID
const getAskDiscountById = async (req, res) => {
    try {
        const request = await AskDiscount.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Discount request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        console.error('Error fetching discount request:', error);
        res.status(500).json({ message: 'Error fetching discount request', error: error.message });
    }
};

// Update a discount request


// Delete a discount request
const deleteAskDiscountById = async (req, res) => {
    try {
        const deletedRequest = await addAskDiscount.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Discount request not found' });
        }
        res.status(200).json({ message: 'Discount request deleted successfully' });
    } catch (error) {
        console.error('Error deleting discount request:', error);
        res.status(500).json({ message: 'Error deleting discount request', error: error.message });
    }
};
module.exports = { submitAskDiscount, getAllAskDiscounts, getAskDiscountById, deleteAskDiscountById }
