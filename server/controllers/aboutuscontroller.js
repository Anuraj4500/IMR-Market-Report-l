// // controllers/aboutuscontroller.js
// const AboutUs = require('../models/aboutus');

// // Controller function to get the about data
// const getAboutData = async (req, res) => {
//     console.log('Received request for about'); // Debugging log
//     try {
//         const aboutData = await AboutUs.find();
//         if (!aboutData) {
//             return res.status(404).json({ message: 'About data not found' });
//         }
//         console.log('Fetched about:', aboutData); // Log fetched about
//         res.json(aboutData);
//     } catch (error) {
//         console.error('Error fetching about:', error); // Log error
//         res.status(500).json({ message: 'Error fetching about' });
//     }
// };

// module.exports = {
//     getAboutData,
// };
