import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    que: "",
    ans: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`https://imr-market-report-l.onrender.com/api/adminfaq/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        alert(`An error occurred: ${error.response?.data?.message || "Failed to fetch FAQ."}`);
      }
    };

    fetchFaq();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!formData.que || !formData.ans) {
        alert("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Submitting form data:", formData); // Debugging log
      const response = await axios.put(
        `https://imr-market-report-l.onrender.com/api/adminfaq/update/${id}`,
        formData
      );
      console.log("FAQ updated successfully:", response.data); // Debugging log
      alert("FAQ updated successfully!");
      navigate("/faq"); // Redirect to FAQ list
    } catch (error) {
      console.error("Error updating FAQ:", error);
      alert(`An error occurred: ${error.response?.status} - ${error.response?.data?.message || "Failed to update FAQ."}`);
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
                  <h2>Add New FAQ</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">FAQ</li>
                    <li className="breadcrumb-item active">Add New FAQ</li>
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
                      <h3 className="h3">Enter FAQ Details</h3>
                    
                      

                      {/* Question */}
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="que" className="form-label">
                            Question
                          </label>
                          <input
                            type="text"
                            name="que"
                            id="que"
                            className="form-control"
                            placeholder="Enter Question"
                            value={formData.que}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Answer */}
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="ans" className="form-label">
                            Answer
                          </label>
                          <textarea
                            name="ans"
                            id="ans"
                            className="form-control"
                            rows="4"
                            placeholder="Enter Answer"
                            value={formData.ans}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                          {/* Submit Button */}
                          <div className="row mt-3">
                        <div className="col-12">
                          <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update FAQ"}
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

export default EditFaq;
