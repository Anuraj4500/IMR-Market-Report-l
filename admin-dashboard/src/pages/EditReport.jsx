import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";

const EditReport = () => {
    const { id } = useParams(); // Get report ID from the URL
    const navigate = useNavigate();

    const initialFormState = {
        id: id,
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
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the report data by ID when component mounts
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/adminreports/${id}`);
                console.log("Fetched report data:", response.data); // Log the fetched data
                setFormData(response.data); // Ensure this contains title and summary
            } catch (error) {
                console.error("Error fetching report data:", error);
                alert("Failed to fetch report data.");
            }
        };
        fetchReport();
    }, [id]);

  const createSlug = (keyword) =>
    keyword.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");

  const getMetaTitle = (keyword, fyear, ccyy) => {
    const titles = [
      `${keyword} Market Dynamics, Growth Opportunities, Region, Share, Growth, Trends, Strategic Insights and Forecast ${fyear} - ${ccyy}`,
      `${keyword} Market: Industry Technological Evolution and Market Trends Shaping the Future Analyzing Market Landscape, Regulatory Developments and Forecast ${fyear} - ${ccyy}`,
      `${keyword} Market Innovation and Investment Trends, Growth Drivers, Technology Trends, Competitive Strategies and Forecast ${fyear} - ${ccyy}`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getMetaDescription = (keyword, fyear, ccyy) => {
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

    // Update slug, title, mtitle, and summary when 'keyword' changes
    if (name === "keyword") {
        const currentYear = new Date().getFullYear();
        updatedData.slug = createSlug(value);
        updatedData.title = getTitle(value, currentYear); // Update title
        updatedData.mtitle = getMetaTitle(value, currentYear, currentYear); // Update mtitle
        updatedData.summary = getMetaDescription(value, currentYear, currentYear); // Update summary
    }

    setFormData((prevData) => ({
        ...prevData,
        ...updatedData,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.keyword.trim()) newErrors.keyword = "Keyword is required.";
    if (!formData.pid) newErrors.pid = "Please select a publisher.";
    if (!formData.cid) newErrors.cid = "Please select a category.";
    if (!formData.sprice) newErrors.sprice = "Single user price is required.";
    if (!formData.date) newErrors.date = "Published date is required.";
    if (!formData.pages) newErrors.pages = "Please enter the number of pages.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form data:", formData); // Log formData to check its contents

    // Validate that title and summary are present
    if (!formData.title || !formData.summary) {
        alert("Title and summary are required fields.");
        return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/adminreports/update/${id}`, // Ensure 'id' is being passed here
        formData // Ensure formData contains the updated report data
      );
      console.log("Report updated:", response.data);
      alert("Report updated successfully!");
      navigate("/reports"); // Navigate to reports list
    } catch (error) {
      console.error("Error updating report:", error);
      alert(`An error occurred: ${error.response?.data?.message || "Failed to update report."}`);
    } finally {
      setIsLoading(false);
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
                  <h2>Edit Report</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">Report</li>
                    <li className="breadcrumb-item active">Edit Report</li>
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
                      <h3 className="h3">Edit Report Details</h3>

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
                          {errors.pid && (
                            <span className="text-danger">{errors.pid}</span>
                          )}
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
                          {errors.keyword && (
                            <span className="text-danger">{errors.keyword}</span>
                          )}
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

                      {/* Prices */}
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
                          <label htmlFor="eprice" className="form-label">
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
                          <label htmlFor="date" className="form-label">
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
                          <label htmlFor="cdate" className="form-label">
                            Created Date
                          </label>
                          <input
                            type="date"
                            name="cdate"
                            id="cdate"
                            className="form-control"
                            placeholder="Created Date"
                            value={formData.cdate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="pages" className="form-label">
                            Pages
                          </label>
                          <input
                            type="number"
                            name="pages"
                            id="pages"
                            className="form-control"
                            placeholder="Pages"
                            value={formData.pages}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Report"}
                      </button>
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

export default EditReport;
