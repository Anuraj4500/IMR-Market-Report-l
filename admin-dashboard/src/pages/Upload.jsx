import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import * as XLSX from "xlsx";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // {{ edit_1 }}

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile);
      readExcelFile(selectedFile);
    }
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const extractedKeywords = json.map(row => row[0]);
      setKeywords(extractedKeywords);
      console.log("Extracted Keywords:", extractedKeywords);

      // Generate titles, slugs, IDs, and other metadata for each keyword
      const currentYear = new Date().getFullYear();
      const fyear = currentYear - 1;
      const ccyy = currentYear + 5;

      const generatedData = extractedKeywords.map(keyword => {
        const keywordData = {
          keyword,
          slug: createSlug(keyword),
          title: getTitle(keyword, fyear),
          mtitle: getMetaTitle(keyword, fyear, ccyy),
          summary: getMetaDesc(keyword, fyear, ccyy),
        };
        return keywordData;
      });

      // Save generated data to formData
      setFormData((prevData) => ({
        ...prevData,
        keywordsData: generatedData, // Store generated data
      }));
    };
    reader.readAsArrayBuffer(file);
  };

  const createSlug = (keyword) => {
    return keyword.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const getMetaTitle = (keyword, fyear, ccyy) => {
    const titles = [
      `${keyword} Market Dynamics, Growth Opportunities, Region, Share, Growth, Trends, Strategic Insights and Forecast ${fyear} - ${ccyy}`,
      `${keyword} Market: Industry Technological Evolution and Market Trends Shaping the Future Analyzing Market Landscape, Regulatory Developments and Forecast ${fyear} - ${ccyy}`,
      `${keyword} Market Innovation and Investment Trends, Growth Drivers, Technology Trends, Competitive Strategies and Forecast ${fyear} - ${ccyy}`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getMetaDesc = (keyword, fyear, ccyy) => {
    const descriptions = [
      `The report on ${keyword} covers a summarized study of several factors supporting market growth, such as market size, market type, major regions, and end-user applications.`,
      `${keyword} comes with extensive industry analysis of development components, patterns, flows, and sizes.`,
      `The ${keyword} report provides a detailed analysis of emerging investment pockets, highlighting current and future market trends.`,
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getTitle = (keyword, fyear) => {
    if (keyword.length <= 100) {
      return `${keyword} Market - Praveen2 ${fyear}`;
    }
    if (keyword.length <= 10) {
      return `${keyword} Market - Global Size & Upcoming Industry Trends`;
    }
    if (keyword.length <= 30) {
      return `${keyword} Market - In-Depth Analysis by Size`;
    }
    if (keyword.length <= 40) {
      return `${keyword} Market - Global Industry Share`;
    }
    if (keyword.length <= 55) {
      return `${keyword} Market Report`;
    }
    return `${keyword} Market`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }
        
    setIsSubmitting(true); // {{ edit_2 }}

    if (!file) {
      console.error("No file selected");
      setIsSubmitting(false); // {{ edit_3 }}
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("keywordsData", JSON.stringify(formData.keywordsData));

    try {
      const response = await axios.post("http://localhost:5000/api/adminreports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      
      // Display alert and redirect
      alert("Report submitted successfully!");
      window.location.href = "/upload"; // Redirect to /upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Navbar />
      <div className="page-body-wrapper mt-5">
        <div className="page-body">
          <div className="container-fluid">
            <div className="page-title">
              <div className="row">
                <div className="col-sm-6 col-12">
                  <h2>Add New Report</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">Report</li>
                    <li className="breadcrumb-item active">Add New Report</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form action="/upload" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                      <h3 className="h3">Enter Report Details</h3>

                      {/* Upload File */}
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="file" className="form-label">
                            Upload Excel File
                          </label>
                          <input
                            type="file"
                            name="file"
                            id="file"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="row mt-3">
                        <div className="col-12">
                        <button type="submit" className="btn request-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
