import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FaqAdd = () => {
  const [formData, setFormData] = useState({
    id: "",
    que: "",
    ans: "",
 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!formData.que || !formData.ans) {
        alert("All fields are required.");
        return; // Prevent submission if fields are empty
    }

    // Debugging: Log formData to check values
    console.log("Submitting FAQ with data:", formData);

    // Automatically generate an ID for the FAQ
    const faqId = Date.now(); // or use a UUID library for a unique ID
    const dataToSend = { ...formData, id: faqId }; // Include the generated ID

    try {
        const response = await axios.post("http://localhost:5000/api/adminfaq/create", dataToSend);
        console.log("FAQ created:", response.data);
        alert("FAQ created successfully!");
    } catch (error) {
        console.error("Error creating FAQ:", error.response ? error.response.data : error.message);
        alert(`Error creating FAQ: ${error.response ? error.response.data.message : error.message}`);
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
                          <button type="submit" className="btn btn-success">
                            Submit FAQ
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

export default FaqAdd;
