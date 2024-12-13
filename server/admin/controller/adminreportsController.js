// adminreportsController.js
require('dotenv').config(); // Load environment variables
const AWS = require('aws-sdk');
const xlsx = require('xlsx');
const moment = require('moment');
const fs = require('fs');
const Report = require('../models/adminreports'); 
const { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');


// Configure AWS with the region from .env
AWS.config.update({ region: process.env.AWS_REGION });

// Create a DynamoDB client instance
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.uploadReports = async (req, res) => {
  console.log('Received request to upload reports'); // Log the request
  console.log('Uploaded file:', req.file); // Log the uploaded file

  try {
    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Please ensure you are sending a file.' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const mappedReports = [];
    for (const row of rows) {
      // Get report ID from Excel or auto-increment if not provided
     

      // Use existing functions for title, metaTitle, etc.
      const title = getTitle(row['Topic'] || 'Unknown', moment().year());
      const mtitle = getMetaTitle(row['Topic'] || 'Unknown', moment().year(), moment().year());
      const metaDesc = getMetaDesc(row['Topic'] || 'Unknown', moment().year(), moment().year());
      const slug = createSlug(row['Topic'] || 'Unknown');

      // Map the report data
      const mappedReport = {
        id: String(row['RID'] || ''),
        cid: row['Industry'] || '',
        pid: row['Publisher'],
        keyword: row['Topic'] || '',
        title: title,
        mtitle: mtitle,
        summary_desc: row['Summary'] || '',
        toc: row['Table of Contents'] || '',
        sprice: row['Single User Price'] ? row['Single User Price'].toString() : '0', 
        mprice: row['Site License Price'] ? row['Site License Price'].toString() : '0', 
        eprice: row['Enterprisewide Price'] ? row['Enterprisewide Price'].toString() : '0', 
        pages: row['Pages']?.toString() || '0',
        date: moment(row['Published Date'], 'YYYY-MM-DD').toISOString(),
        cdate: moment().toISOString(),
        slug: slug,
        file: req.file.path,
        created_time: moment().toISOString(),
        updated_time: moment().toISOString(),
        summary: metaDesc, // Add generated meta description
      };

      mappedReports.push(mappedReport);
    }

    // Insert into DynamoDB
    for (const report of mappedReports) {
      const params = {
        TableName: 'report', // DynamoDB table name for reports
        Item: report,
      };
      const command = new AWS.DynamoDB.DocumentClient().put(params).promise();
      await command;
    }

    res.status(200).send({ message: 'Reports uploaded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error processing file.' });
  }
};

// Helper functions (kept the same as before)
const createSlug = (keyword) => {
  return keyword.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
};

const getMetaTitle = (keyword, fyear, ccyy) => {
  const titles = [
    `${keyword} Market Dynamics, Growth Opportunities, Region, Share, Growth, Trends, Strategic Insights and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market: Industry Technological Evolution and Market Trends Shaping the Future Analyzing Market Landscape, Regulatory Developments and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market Innovation and Investment Trends, Growth Drivers, Technology Trends, Competitive Strategies and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market: Innovations, Strategic Insights, Segments, Insights into Competitive Landscape, Mergers in Industry and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market Study, Dynamics, Technology Trends, and Industry Challenges, Growth Opportunities and Investment Pockets in Market and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market, Future Technology Innovations, Growth Drivers, and Global Forecast, Strategic Opportunities, Industry Challenges Insights and Forecast ${fyear} - ${ccyy}`,
    `${keyword} Market Trends and Strategic Growth Insights for Industry Leaders, Regulatory Developments, Price Trends, and Import-Export Analysis and Forecast ${fyear} - ${ccyy}`,
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getMetaDesc = (keyword, fyear, ccyy) => {
  const descriptions = [
    `The report on ${keyword} covers a summarized study of several factors supporting market growth, such as market size, market type, major regions, and end-user applications.`,
    `${keyword} comes with extensive industry analysis of development components, patterns, flows, and sizes.`,
    `The ${keyword} report provides a detailed analysis of emerging investment pockets, highlighting current and future market trends.`,
    `The report on ${keyword} enables customers to recognize key drivers that influence and govern the market.`,
    `${keyword} comes with extensive industry analysis of development components, patterns, flows, and sizes. The report calculates present and past market values to forecast potential market management during the forecast period.`,
    `The ${keyword} report provides a detailed analysis of emerging investment pockets, highlighting current and future market trends. It offers strategic insights into capital flows and market shifts, guiding investors toward growth opportunities in key industry segments and regions.`,
    `The ${keyword} market report offers a thorough competitive analysis, mapping key players’ strategies, market share, and business models. It provides insights into competitor dynamics, helping companies align their strategies with the current market landscape and future trends.`,
    `The ${keyword} report features an extensive regional analysis, identifying market penetration levels across major geographic areas. It highlights regional growth trends and opportunities, allowing businesses to tailor their market entry strategies and maximize growth in specific regions.`,
    `Technological advancements in the ${keyword} industry are shaping the future market landscape. The report evaluates innovation-driven growth and how emerging technologies are transforming industry practices, offering a comprehensive outlook on future opportunities and market potential.`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getTitle = (keyword, fyear) => {
  const title = [
    `${keyword} Market - Size, Share & Outlook | Forecast Upto ${fyear}`,
    `${keyword} Market - Global Size & Upcoming Industry Trends`,
    `${keyword} Market - In-Depth Analysis by Size`,
    `${keyword} Market - Global Industry Share`,
    `${keyword} Market Report`,
  ];
  return title[Math.floor(Math.random() * title.length)];
};


// Create a new report in DynamoDB
exports.createReport = async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log("Creating report with data:", req.body);

        // Validate required fields
        const requiredFields = ['cid', 'pid', 'keyword', 'title', 'mtitle', 'summary_desc', 'toc', 'sprice', 'mprice', 'eprice', 'pages', 'date', 'summary', 'id'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing required field: ${field}` });
            }
        }

        // Ensure id is not an empty string
        if (req.body.id.trim() === '') {
            return res.status(400).json({ message: 'ID cannot be an empty string.' });
        }

        const newReport = {
            id: String(req.body.id), // Ensure id is a string
            cid: req.body.cid,
            pid: req.body.pid,
            keyword: req.body.keyword,
            title: req.body.title,
            mtitle: req.body.mtitle,
            summary_desc: req.body.summary_desc,
            toc: req.body.toc,
            sprice: req.body.sprice,
            mprice: req.body.mprice,
            eprice: req.body.eprice,
            pages: req.body.pages,
            date: req.body.date,
            cdate: moment().toISOString(),
            created_time: moment().toISOString(),
            updated_time: moment().toISOString(),
            summary: req.body.summary,
        };

        const params = {
            TableName: 'report',
            Item: newReport,
        };

        const command = new PutItemCommand(params);
        await dynamoDB.send(command);

        res.status(201).json({ message: 'Report created successfully', data: newReport });
    } catch (error) {
        console.error("Error creating report:", error.message);
        res.status(500).json({ message: 'Error creating report', error: error.message });
    }
};

// Get all reports from DynamoDB
exports.getAllReports = async (req, res) => {
  const params = {
    TableName: 'report',
  };

  try {
    const command = new ScanCommand(params); // Create the ScanCommand
    const data = await dynamoDB.send(command); // Use the `send` method to execute

    // Ensure the data is formatted correctly
    const formattedReports = data.Items.map(item => ({
      id: item.id ? item.id.S : null, // Check if id exists
      cid: item.cid ? item.cid.S : null,
      pid: item.pid ? item.pid.S : null,
      keyword: item.keyword ? item.keyword.S : null,
      title: item.title ? item.title.S : null,
      mtitle: item.mtitle ? item.mtitle.S : null,
      summary_desc: item.summary_desc ? item.summary_desc.S : null,
      toc: item.toc ? item.toc.S : null,
      sprice: item.sprice ? Number(item.sprice.N) : 0, // Ensure this is a number
      mprice: item.mprice ? Number(item.mprice.N) : 0, // Ensure this is a number
      eprice: item.eprice ? Number(item.eprice.N) : 0, // Ensure this is a number
      pages: item.pages ? item.pages.S : null,
      date: item.date ? item.date.S : null,
      summary: item.summary ? item.summary.S : null,
      // Add any other fields you need
    }));

    res.status(200).json(formattedReports); // Send the formatted data
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// Get a report by custom ID from DynamoDB
exports.getReportById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching report with ID: ${id}`); // Log the requested ID
  const params = {
    TableName: 'report',
    Key: { id: { S: String(id) } }, // Ensure this matches your DynamoDB key schema
  };

  try {
    const command = new GetItemCommand(params); // Use GetItemCommand
    const data = await dynamoDB.send(command); // Use the `send` method to execute
    if (!data.Item) {
      return res.status(404).json({ message: 'Report not found. Please check the ID and try again.' });
    }

    // Format the response to extract values from the DynamoDB response
    const formattedReport = {
      id: data.Item.id.S,
      cid: data.Item.cid.S,
      pid: data.Item.pid.S,
      keyword: data.Item.keyword.S,
      title: data.Item.title.S,
      mtitle: data.Item.mtitle.S,
      summary_desc: data.Item.summary_desc.S,
      toc: data.Item.toc.S,
      sprice: Number(data.Item.sprice.N),
      mprice: Number(data.Item.mprice.N),
      eprice: Number(data.Item.eprice.N),
      pages: data.Item.pages.S,
      date: data.Item.date.S,
      summary: data.Item.summary.S,
      // Add any other fields you need
    };

    res.status(200).json(formattedReport); // Send the formatted data
  } catch (error) {
    console.error("Error fetching report:", error.message);
    res.status(500).json({ message: 'Error fetching report.', error: error.message });
  }
};

// ... existing code ...
// Update a report by custom ID in DynamoDB
exports.updateReport = async (req, res) => {
  const { id } = req.params;

  if (!id || id.trim() === '') { // Check if id is empty
    return res.status(400).json({ message: 'ID is required for updating the report.' });
  }

  // Ensure only valid fields are updated
  const { title, summary, slug, pages, toc, mtitle, summary_desc, sprice, mprice, eprice, date } = req.body;

  // Check if the required fields are present
  if (!title || !summary) {
    return res.status(400).json({ message: 'Title and summary are required fields.' });
  }

  const params = {
    TableName: 'report',
    Key: { id: { S: String(id) } }, // Ensure this matches your DynamoDB key schema
    UpdateExpression: `SET 
      #title = :title,
      #summary = :summary,
      #slug = :slug,
      #pages = :pages,
      #toc = :toc,
      #mtitle = :mtitle,
      #summary_desc = :summary_desc,
      #sprice = :sprice,
      #mprice = :mprice,
      #eprice = :eprice,
      #date = :date,
      #updated_time = :updated_time`,
    ExpressionAttributeNames: {
      '#title': 'title',
      '#summary': 'summary',
      '#slug': 'slug',
      '#pages': 'pages',
      '#toc': 'toc',
      '#mtitle': 'mtitle',
      '#summary_desc': 'summary_desc',
      '#sprice': 'sprice',
      '#mprice': 'mprice',
      '#eprice': 'eprice',
      '#date': 'date',
      '#updated_time': 'updated_time',
    },
    ExpressionAttributeValues: {
      ':title': { S: title },
      ':summary': { S: summary },
      ':slug': { S: slug || '' },
      ':pages': { S: pages || '0' },
      ':toc': { S: toc || '' },
      ':mtitle': { S: mtitle || '' },
      ':summary_desc': { S: summary_desc || '' },
      ':sprice': { N: sprice || '0' }, // Number type for DynamoDB
      ':mprice': { N: mprice || '0' }, // Number type for DynamoDB
      ':eprice': { N: eprice || '0' }, // Number type for DynamoDB
      ':date': { S: date || new Date().toISOString() },
      ':updated_time': { S: new Date().toISOString() },
    },
    ReturnValues: 'ALL_NEW', // Return updated attributes
  };

  try {
    const command = new UpdateItemCommand(params);
    const data = await dynamoDB.send(command);

    res.status(200).json({
      message: 'Report updated successfully.',
      data: data.Attributes ? AWS.DynamoDB.Converter.unmarshall(data.Attributes) : {},
    });
  } catch (error) {
    console.error("Error updating report:", error.message);
    res.status(500).json({ message: 'Error updating report.', error: error.message });
  }
};



// Delete a report by custom ID from DynamoDB
exports.deleteReport = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: 'report',
        Key: { id: { S: String(id) } }, // Ensure this matches your DynamoDB key schema
    };

    try {
        const command = new DeleteItemCommand(params); // Use DeleteItemCommand
        await dynamoDB.send(command); // Use the `send` method to execute
        res.status(200).json({ message: 'Report deleted successfully.' });
    } catch (error) {
        console.error("Error deleting report:", error.message);
        res.status(500).json({ message: 'Error deleting report.', error: error.message });
    }
};
