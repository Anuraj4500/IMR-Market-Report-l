import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientAdd = () => {
  const [formData, setFormData] = useState({
    id: "",
    image: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Automatically generate an ID for the client
    const clientId = Date.now(); // or use a UUID library for a unique ID
    setFormData((prevData) => ({
      ...prevData,
      id: clientId,
    }));

    // Check if all fields are filled
    if (!formData.image || !formData.id) {
      return; // Prevent submission if fields are empty
    }

    // Prepare FormData to send
    const dataToSend = new FormData();
    dataToSend.append("id", formData.id);
    dataToSend.append("image", formData.image); // Append the file object

    // Debugging: Log formData to check values
    console.log("Submitting Client with data:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/adminclient/create", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });
      console.log("Client created:", response.data);
      alert("Client created successfully!");
    } catch (error) {
      console.error("Error creating Client:", error.response ? error.response.data : error.message);
      alert(`Error creating Client: ${error.response ? error.response.data.message : error.message}`);
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
                  <h2>Add New Client</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">Client</li>
                    <li className="breadcrumb-item active">Add New Client</li>
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
                      <h3 className="h3">Enter Client Details</h3>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="image" className="form-label">
                            Upload Image
                          </label>
                          <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                      </div>
                      {/* Submit Button */}
                      <div className="row mt-3">
                        <div className="col-12">
                          <button type="submit" className="btn btn-success">
                            Submit Client
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

export default ClientAdd;
