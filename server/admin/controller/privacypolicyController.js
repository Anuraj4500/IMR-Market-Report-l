const PrivacyPolicy = require('../models/privacypolicy');

// Get all privacy policies
const getAllPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find();
    res.json(policies);
  } catch (error) {
    console.error("Error fetching privacy policies:", error);
    res.status(500).send("Server Error");
  }
};

// Add a new privacy policy
const addPolicy = async (req, res) => {
  const { title } = req.body;
  try {
    const newPolicy = new PrivacyPolicy({ title });
    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    console.error("Error adding privacy policy:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllPolicies,
  addPolicy,
};