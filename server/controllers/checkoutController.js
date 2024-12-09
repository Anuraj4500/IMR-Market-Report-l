const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'checkouts';

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.createCheckout = async (req, res) => {
    try {
        const { name, email, designation, country, phone, reportId, reportTitle, userType, price, orderDate, message } = req.body;

        const newCheckout = {
            id: Date.now(),
            name,
            email,
            designation,
            phone,
            country,
            reportId,
            reportTitle,
            userType,
            price,
            orderDate,
            message,
            paymentStatus: 'pending',
        };

        const params = {
            TableName: TABLE_NAME,
            Item: newCheckout,
        };

        console.log("Saving item to DynamoDB:", newCheckout);
        await dynamoDB.put(params).promise();

        // Send confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,  // Ensure this is a valid email
            subject: 'Checkout Confirmation',
            html: `
                <div>
                    <h2 style="color: #F96641; text-align: center; font-size: 24px; font-weight: bold;">Thank you for your order, ${name}!</h2>
                    <p style="font-size: 16px;">Your order details:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <tr><th style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Field</th><th style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Details</th></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Report ID</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${reportId}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Report Title</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${reportTitle}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">User Type</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${userType}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Price</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">$${price}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Order Date</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${orderDate}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Message</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${message}</td></tr>
                    </table>
                    <p style="font-size: 16px; ">We will process your order shortly.</p>
                </div>
            `,
        };

        console.log('Sending confirmation email to user:', userMailOptions.to); // Debugging line
        await transporter.sendMail(userMailOptions);

        // Send email to admin (notify about new checkout)
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'imr.anuraj001@gmail.com',  // Ensure this is set correctly in environment variables
            subject: 'New Checkout Order',
            html: `
                <div>
                    <h2 style="color: #F96641; text-align: center; font-size: 24px; font-weight: bold;">New Order Created!</h2>
                    <p style="font-size: 16px; ">A new checkout order has been placed:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <tr><th style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Field</th><th style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Details</th></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Name</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${name}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Email</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${email}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Report ID</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${reportId}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Report Title</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${reportTitle}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">User Type</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${userType}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Price</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">$${price}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Order Date</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${orderDate}</td></tr>
                        <tr><td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Message</td><td style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4;">${message}</td></tr>
                    </table>
                    <p style="font-size: 16px; ">Please review the order and proceed with the next steps.</p>
                </div>
            `,
        };

        console.log('Sending admin notification email to:', adminMailOptions.to); // Debugging line
        await transporter.sendMail(adminMailOptions);

        res.status(201).json({ success: true, data: newCheckout });
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ success: false, message: `Error creating checkout: ${error.message}` });
    }
};
