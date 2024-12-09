const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
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
        const { reportTitle,name, email, phone, country, company, designation, message } = req.body;
        if ( reportTitle,!name || !email || !phone || !country || !company || !designation ) {
            return res.status(400).json({ message: 'All fields are required except message.' });
        }
        const id = Date.now().toString();

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
            }
        };
        await dynamoDB.put(askDiscountEntry).promise();
            // Send email notification
        const emailNotification = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, 
            subject: `Discount Request Confirmation - ${req.body.reportTitle}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #f96641; text-align: center;">New Ask for Discount Request Submitted</h2>
                <p style="font-size: 16px;">You have received a new ask for discount request. Below are the details:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Name</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.name}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.email}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Phone</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.phone}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Country</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.country}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Company</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.company}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Designation</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.designation}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Message</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.message || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">IP Address</td>
                        <td style="padding: 5px; border: 1px solid #ddd;">${req.body.ipAddress}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 14px; color: #555;">
                    <i>This is an automated message. Please do not reply to this email.</i>
                </p>
            </div>
        `,
        };
        await transporter.sendMail(emailNotification); // Send the email

        // Send email notification to the user
        const userEmailNotification = {
            from: process.env.EMAIL_USER,
            to: req.body.email, // Send confirmation to the user's email
            subject: 'Thank You for Your Discount Request',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #f96641; text-align: center;">Thank You, ${req.body.name}!</h2>
                    <p style="font-size: 16px;">We have received your discount request. Our team will review it and get back to you shortly.</p>
                    <p style="font-size: 16px;">Here are the details of your submission:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <tr>
                            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Name</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${req.body.name}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${req.body.email}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Phone</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${req.body.phone}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Message</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${req.body.message || 'N/A'}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px; font-size: 14px; color: #555;">
                        <i>This is an automated message. Please do not reply to this email.</i>
                    </p>
                </div>
            `,
        };

        // Send the confirmation email to the user
        await transporter.sendMail(userEmailNotification);

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
        const deleteAskDiscountById  = async (req, res) => {
    try {
        const deletedRequest = await addAskDiscount.findByIdAndDelete(req.params.id );
        if (!deletedRequest) {
           return res.status(404).json({ message: 'Discount request not found' });
        }
        res.status(200).json({ message: 'Discount request deleted successfully' });
    } catch (error) {
        console.error('Error deleting discount request:', error);
        res.status(500).json({ message: 'Error deleting discount request', error: error.message });
    }
};
module.exports={submitAskDiscount,getAllAskDiscounts,getAskDiscountById,deleteAskDiscountById}
