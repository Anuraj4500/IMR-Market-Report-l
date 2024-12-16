import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportAdd = () => {
  const [formData, setFormData] = useState({
    id: "",
    cid: "",
    pid: "",
    keyword: "",
    title: "",
    mtitle: "",
    summary: "",
    summary_desc: "",
    toc: "",
    sprice: "",
    mprice: "",
    eprice: "",
    pages: "",
    date: "",
    cdate: "",
    slug: "",
  });

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
    if (keyword.length <= 10) {
      return `${keyword} Market - Size, Share & Outlook | Forecast Upto ${fyear}`;
    }
    if (keyword.length <= 20) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { [name]: value };

    // Generate slug, mtitle, and summary for 'keyword' changes
    if (name === "keyword") {
      const slug = createSlug(value);
      const currentYear = new Date().getFullYear();
      const fyear = currentYear - 1;
      const ccyy = currentYear + 5;
      updatedData = {
        ...updatedData,
        slug,
        title: getTitle(value, fyear),
        mtitle: getMetaTitle(value, fyear, ccyy),
        summary: getMetaDesc(value, fyear, ccyy),
      };
    }

    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Automatically generate an ID for the report
    const reportId = Date.now(); // or use a UUID library for a unique ID
    const dataToSend = { ...formData, id: reportId }; // Include the generated ID

    try {
        const response = await axios.post("https://imr-market-report-l.onrender.com/api/adminreports/create", dataToSend);
        console.log("Report created:", response.data);
        alert("Report created successfully!");
    } catch (error) {
        console.error("Error creating report:", error.response ? error.response.data : error.message);
        alert(`Error creating report: ${error.response ? error.response.data.message : error.message}`);
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
                    <form onSubmit={handleSubmit}>
                      <h3 className="h3">Enter Report Details</h3>
                       {/* Publisher */}
                       <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="pid" className="form-label">
                            Publisher
                          </label>
                          <select
                            name="pid"
                            id="pid"
                            className="form-control"
                            value={formData.pid}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Publisher</option>
                            <option value="1">ICRWorld Research</option>
                            <option value="2">HNY Research</option>
                            <option value="3">99Strategy</option>
                          </select>
                        </div>
                      </div>

                      {/* Keyword */}
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="keyword" className="form-label">
                            Keyword
                          </label>
                          <input
                            type="text"
                            name="keyword"
                            id="keyword"
                            className="form-control"
                            placeholder="Enter Keyword"
                            value={formData.keyword}
                            onChange={handleChange}
                            required
                          />
                          <span>Slug: {formData.slug}</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="summary_desc" className="form-label">
                            Summary
                          </label>
                          <textarea
                            name="summary_desc"
                            id="summary_desc"
                            className="form-control"
                            rows="4"
                            placeholder="Enter Summary"
                            value={formData.summary_desc}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="toc" className="form-label">
                         Table of Content
                          </label>
                          <textarea
                            name="toc"
                            id="toc"
                            className="form-control"
                            rows="4"
                            placeholder="Enter Table of Content"
                            value={formData.toc}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Single and Multiple Prices */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="sprice" className="form-label">
                            Single User Price
                          </label>
                          <input
                            type="number"
                            name="sprice"
                            id="sprice"
                            className="form-control"
                            placeholder="Enter Price"
                            value={formData.sprice}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="mprice" className="form-label">
                            Multiple User Price
                          </label>
                          <input
                            type="number"
                            name="mprice"
                            id="mprice"
                            className="form-control"
                            placeholder="Enter Price"
                            value={formData.mprice}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="sprice" className="form-label">
                          Enterprise User Price
                          </label>
                          <input
                            type="number"
                            name="eprice"
                            id="eprice"
                            className="form-control"
                            placeholder="Enter Price"
                            value={formData.eprice}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="mprice" className="form-label">
                           Report Published Date
                          </label>
                          <input
                            type="date"
                            name="date"     
                            id="date"
                            className="form-control"
                            placeholder="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="sprice" className="form-label">
                            C Date
                          </label>
                          <input
                            type="date"
                            name="cdate"
                            id="cdate"
                            className="form-control"
                            placeholder="Enter C Date"
                            value={formData.cdate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="mprice" className="form-label">
                            Report Pages
                          </label>
                          <input
                            type="number"
                            name="pages"
                            id="pages"
                            className="form-control"
                            placeholder="Enter No of Pages"
                            value={formData.pages}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="categories" className="form-label">
                           Categories
                          </label>
                          <select
                            name="cid"
                            id="cid"
                            className="form-control"
                            value={formData.cid}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-- Select Categories --</option>
                            <option value="1">
                              Aerospace and Defense
                            </option>
                            <option value="2">
                              Agriculture
                            </option>
                            <option value="3">
                              Automotive and Transport
                            </option>
                            <option value="4">
                              Chemicals and Materials
                            </option>
                            <option value="5">
                              Consumer Goods
                            </option>
                            <option value="6">
                              Electronics and Semiconductors
                            </option>
                            <option value="7">
                              Energy and Natural Resources
                            </option>
                            <option value="8">
                              Food and Beverages
                            </option>
                            <option value="9">
                              Healthcare
                            </option>
                            <option value="10">
                              IT and Telecom
                            </option>
                            <option value="11">
                              Manufacturing and Construction
                            </option>
                            <option value="12">
                              Service Industry
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="row mt-3">
                        <div className="col-12">
                          <button onClick={handleSubmit} className="btn btn-success">
                            Submit Report
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

export default ReportAdd;
