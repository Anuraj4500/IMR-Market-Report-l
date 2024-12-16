const express = require('express');
const router = express.Router();
const Report = require('../models/report');

// GET all reports
router.get('/reports', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const { reports, totalPages } = await Report.getAllReports(parseInt(page), parseInt(limit));
        res.json({ reports, totalPages });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

// GET reports by cid with pagination
router.get('/reports/cid', async (req, res) => {
    const { cid, page = 1, limit = 10 } = req.query;

    if (!cid) {
        return res.status(400).json({ message: 'CID is required' });
    }

    try {
        const { reports, totalPages } = await Report.getReportsByCid(cid, parseInt(page), parseInt(limit));
        console.log("Fetched Reports:", reports);
        res.json({ reports, totalPages });
    } catch (error) {
        console.error('Error fetching reports by cid:', error);
        res.status(500).json({ message: 'Error fetching reports by cid' });
    }
});


// GET report by slug
router.get('/reports/slug/:slug', async (req, res) => {
    console.log("Received request for slug:", req.params.slug);
    try {
        const report = await Report.getReportBySlug(req.params.slug);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        console.error('Error fetching report by slug:', error);
        res.status(500).json({ message: 'Error fetching report' });
    }
});

// Search reports
router.get('/reports/search', async (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const reports = await Report.searchReports(searchQuery);
        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports matched your search query.' });
        }
        res.json(reports);
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ message: 'Error performing search' });
    }
});

// POST: Create a new report
router.post('/reports', async (req, res) => {
    const report = req.body;
    try {
        await Report.createReport(report);
        res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
});

// PUT: Update an existing report
router.put('/reports/:id', async (req, res) => {
    const id = req.params.id;
    const report = req.body;
    try {
        await Report.updateReport(id, report);
        res.json({ message: 'Report updated successfully' });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Error updating report' });
    }
});

// DELETE: Delete a report
router.delete('/reports/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Report.deleteReport(id);
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Error deleting report' });
    }
});

// GET report by ID
router.get('/reports/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.getReportById(id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found.' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching report:", error.message);
        res.status(500).json({ message: 'Error fetching report.', error: error.message });
    }
});

module.exports = router;
