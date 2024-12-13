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
// Verify Nodemailer configuration
transporter.verify((error) => {
  if (error) {
      console.error('Email configuration error:', error);
  } else {
      console.log('Email configuration is valid.');
  }
});

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

// Function to submit a new sample request
const submitSampleRequest = async (req, res) => {
    try {
        const { reportTitle,name, email, phone, country, company, designation, message } = req.body;

        if ( reportTitle,!name || !email || !phone || !country || !company || !designation) {
            return res.status(400).json({ message: 'All fields are required except message.' });
        } 
        const id = Date.now().toString();     

        // Insert into DynamoDB
        const sampleRequestEntry = {
            TableName: 'request_samples',
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
          await dynamoDB.put(sampleRequestEntry).promise();

        // Send email notification to admin
        const emailNotification = {
            from: process.env.EMAIL_USER,
            to: 'imr.anuraj001@gmail.com',
            subject: `New Sample Request Submitted - ${req.body.reportTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #f96641; text-align: center;">New Sample Request Submitted</h2>
                    <p style="font-size: 16px;">You have received a new sample request. Below are the details:</p>
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

        // Send the email notification to admin
        await transporter.sendMail(emailNotification);

        // Send confirmation email to the user
        const userEmailNotification = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: `IMR- Sample Report on - ${req.body.reportTitle}`,
            html: (function() {
                const isPersonalEmail = /@(gmail|yahoo|hotmail|outlook)\.com$/i.test(req.body.email);
                if (isPersonalEmail) {
                    return `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                            <p style="font-size: 16px;">Dear ${req.body.name},</p>
                            <p style="font-size: 16px;">Greetings from IMR Market Reports!</p>
                            <p style="font-size: 16px;">
                                Thank you for requesting the sample report for <strong>${req.body.reportTitle}</strong>.
                                We have received your request, and our sales representative will get in touch with you soon.
                            </p>
                            <p style="font-size: 16px;">
                                To ensure smooth processing and official communication, kindly share your <b>official work email address</b> for all correspondence to ensure seamless engagement and access to exclusive benefits, along with prioritized support from our sales team. Please be aware that your information is always secure (<a href="https://www.imrmarketreports.com/privacy-policy/" target="_blank">Read more about our privacy policies</a>) with us.
                            </p>
                            <p style="font-size: 16px;">
                                If you require any further assistance or have additional queries, please feel free to contact us at <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a>.
                            </p>
                            <p style="font-size: 16px; margin-top: 20px;">Thanks and Best Regards,</p>
                            <p style="font-size: 16px;">
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
                } else {
                    return `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                            <p style="font-size: 16px;">Dear ${req.body.name},</p>
                            <p style="font-size: 16px;">Greetings from IMR Market Reports!</p>
                            <p style="font-size: 16px;">
                                Thank you for requesting the sample report for <strong>${req.body.reportTitle}</strong>.
                                We have successfully received your request, and our sales representative will get in touch with you soon.
                            </p>
                            <p style="font-size: 16px;">
                                In the meantime, if you have any additional thoughts or specific areas you’d like us to cover, don’t hesitate to let us know—we’re here to make this as tailored and relevant to your needs as possible.
                            </p>
                            <p style="font-size: 16px;">
                                If you require any further assistance or have additional queries, please feel free to contact us at <a href="mailto:sales@imrmarketreports.com">sales@imrmarketreports.com</a>.
                            </p>
                            <p style="font-size: 16px; margin-top: 20px;">Thanks and Best Regards,</p>
                            <p style="font-size: 16px;">
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

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving submission:', error);
        if (error.message.includes('Invalid login')) {
            console.error('Invalid email credentials. Check your configuration.');
            return res.status(401).json({ message: 'Invalid email credentials. Please check your email configuration.' });
        }
        res.status(500).json({ message: 'Error saving submission.', error: error.message });
    }
};

// Function to fetch all sample requests
const getAllSampleRequests = async (req, res) => {
    try {
        const requests = await SampleRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching sample requests:', error);
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

// Function to fetch a specific sample request by ID
const getSampleRequestById = async (req, res) => {
    try {
        const request = await SampleRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Sample request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        console.error('Error fetching sample request:', error);
        res.status(500).json({ message: 'Error fetching request', error: error.message });
    }
};

// Function to delete a specific sample request by ID
const deleteSampleRequestById = async (req, res) => {
    try {
        const deletedRequest = await SampleRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Sample request not found' });
        }
        res.status(200).json({ message: 'Sample request deleted successfully' });
    } catch (error) {
        console.error('Error deleting sample request:', error);
        res.status(500).json({ message: 'Error deleting request', error: error.message });
    }
};

// Export the functions
module.exports = { submitSampleRequest, getAllSampleRequests, getSampleRequestById, deleteSampleRequestById };