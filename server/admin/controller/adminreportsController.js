const Report = require('../models/adminreports');
const Counter = require('../models/Counter'); // Import Counter model
const mongoose = require('mongoose');
const xlsx = require("xlsx");
const moment = require("moment");

exports.uploadReports = async(req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const mappedReports = [];
    for (const row of rows) {
      // Get auto-increment ID
      const counter = await Counter.findOneAndUpdate(
        { _id: "reportId" }, 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } // Create the counter if it doesn't exist
      );

      const reportId = counter.seq;

      // Use the existing getTitle, getMetaTitle, getMetaDesc functions
      const title = getTitle(row["Topic"] || "Unknown", moment().year());
      const mtitle = getMetaTitle(row["Topic"] || "Unknown", moment().year(), moment().year());
      const metaDesc = getMetaDesc(row["Topic"] || "Unknown", moment().year(), moment().year());
      const slug = createSlug(row["Topic"] || "Unknown");

      // Map the report data
      const mappedReport = {
        id: reportId,
        cid: row["Industry"] || "",
        pid: row["Publisher"],
        keyword: row["Topic"] || "",
        title: title,
        mtitle: mtitle,
        summary_desc: row["Summary"] || "",
        toc: row["Table of Contents"] || "",
        sprice: parseFloat(row["Single User Price"]) || 0,
        mprice: parseFloat(row["Site License Price"]) || 0,
        eprice: parseFloat(row["Enterprisewide Price"]) || 0,
        pages: row["Pages"]?.toString() || "0",
        date: moment(row["Published Date"], "YYYY-MM-DD").toISOString(),
        cdate: moment().toISOString(),
        slug: slug,
        file: req.file.path,
        created_time: moment().toISOString(),
        updated_time: moment().toISOString(),
        summary: metaDesc // Add the generated meta description
      };

      mappedReports.push(mappedReport);
    }

    // Insert into MongoDB
    const result = await Report.insertMany(mappedReports);
    res.status(200).send({ message: "Reports uploaded successfully!", result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error processing file." });
  }
};

// Helper functions
const createSlug = (keyword) => {
  return keyword.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
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
    `${keyword} comes with extensive industry analysis of development components, patterns, flows, and sizes. The report calculates present and past market values to forecast potential market management during the forecast period between .`,
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

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      created_time: new Date(),
      updated_time: new Date(),
    });
    await newReport.save();
    res.status(201).json({ message: 'Report created successfully', data: newReport });
  } catch (error) {
    console.error("Error creating report:", error.message);
    res.status(400).json({ message: 'Error creating report', error: error.message });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// Get a report by custom ID
exports.getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findOne({ id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error.message);
    res.status(500).json({ message: 'Error fetching report.', error: error.message });
  }
};

// Update a report by custom ID
exports.updateReport = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReport = await Report.findOneAndUpdate(
      { id },
      { ...req.body, updated_time: new Date() },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.status(200).json({ message: 'Report updated successfully.', data: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error.message);
    res.status(500).json({ message: 'Error updating report.', error: error.message });
  }
};

// Delete a report by custom ID
exports.deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findOneAndDelete({ id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    res.status(200).json({ message: 'Report deleted successfully.' });
  } catch (error) {
    console.error("Error deleting report:", error.message);
    res.status(500).json({ message: 'Error deleting report.', error: error.message });
  }
};