const xlsx = require("xlsx");
const fs = require("fs");
const { dynamoDB } = require("../../config");

// Function to normalize keywords
const normalizeKeyword = (keyword) => {
  return keyword
    .toLowerCase()
    .replace(/'s$/g, "")
    .replace(/s$/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
};

// Function to capitalize keywords
const capitalizeKeyword = (keyword) => {
  return keyword.charAt(0).toUpperCase() + keyword.slice(1);
};

// Function to generate a random number for unique file names
const generateRandomNumber = (length = 8) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

// Function to insert non-duplicate keywords into the check-duplicates table
const insertNonDuplicateKeyword = async (keyword) => {
  const params = {
    TableName: "check-duplicates",
    Item: {
      id: generateRandomNumber(),
      keyword,
    },
  };
  return dynamoDB.put(params).promise();
};

// Main function to check duplicates and create an Excel file
exports.checkDuplicatesAndCreateExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded." });
    }

    // Read the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length || !rows[0].hasOwnProperty("Keywords")) {
      return res.status(400).json({
        message: "Invalid file format. Ensure the file contains a 'Keywords' column in column A.",
      });
    }

    // Extract keywords from the uploaded file
    const uploadedKeywords = rows.map((row) => row["Keywords"]).filter(Boolean);

    // Step 1: Remove duplicates and variations (case-insensitive, normalized)
    const seenKeywords = new Map();

    uploadedKeywords.forEach((keyword) => {
      const normalized = normalizeKeyword(keyword);
      if (!seenKeywords.has(normalized)) {
        seenKeywords.set(normalized, keyword);
      }
    });

    // Get the unique keywords in their original form
    const uniqueUploadedKeywords = Array.from(seenKeywords.values());

    console.log("Unique Keywords from uploaded file:", uniqueUploadedKeywords);

    // Capitalize all keywords for the final output
    const capitalizedKeywords = uniqueUploadedKeywords.map(capitalizeKeyword);

    // Step 2: Fetch existing keywords from the report table
    const existingReportData = await dynamoDB.scan({
      TableName: "report",
    }).promise();

    const existingReportKeywords = existingReportData.Items.map((item) =>
      normalizeKeyword(item.keyword)
    );

    console.log("Existing Keywords in 'report' table:", existingReportKeywords);

    // Step 3: Find non-duplicate keywords (not in the report table)
    const nonDuplicateKeywords = capitalizedKeywords.filter((keyword) => {
      const normalized = normalizeKeyword(keyword);
      return !existingReportKeywords.includes(normalized);
    });

    console.log("Non-Duplicate Keywords:", nonDuplicateKeywords);

    if (!nonDuplicateKeywords.length) {
      return res.status(200).json({
        message: "No new non-duplicate keywords found.",
        uploadedData: uniqueUploadedKeywords,
      });
    }

    // Step 4: Save non-duplicate keywords to the check-duplicates table
    await Promise.all(
      nonDuplicateKeywords.map((keyword) => insertNonDuplicateKeyword(keyword))
    );

    // Step 5: Create a new Excel file with non-duplicate keywords
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.aoa_to_sheet([
      ["Keywords"],
      ...nonDuplicateKeywords.map((keyword) => [keyword]),
    ]);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "Non-Duplicate Keywords");

    // Save the Excel file with a random number in its name
    const randomNumber = generateRandomNumber();
    const newFilePath = `uploads/non_duplicate_keywords_${randomNumber}.xlsx`;
    xlsx.writeFile(newWorkbook, newFilePath);

    console.log("File saved at:", newFilePath);

    // Respond with the download link and the uploaded data
    res.status(200).json({
      message: "File processed successfully.",
      downloadLink: newFilePath,
      uploadedData: uniqueUploadedKeywords,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send({ message: "Error processing file." });
  } finally {
    // Clean up the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};
