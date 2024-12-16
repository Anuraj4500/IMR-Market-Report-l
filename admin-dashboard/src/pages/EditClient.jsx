import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`https://imr-market-report-l.onrender.com/api/adminclient/${id}`);
        setFormData({
          id: response.data.id,
          image: "",
        });
      } catch (error) {
        console.error("Error fetching Client:", error);
        alert(`An error occurred: ${error.response?.data?.message || "Failed to fetch Client."}`);
      }
    };

    fetchClient();
  }, [id]);

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
        setFormData((prevData) => ({
            ...prevData,
            image: files[0], // Store the file object
        }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!formData.image) {
        alert("All fields are required.");
        return;
    }

    setIsLoading(true);
    try {
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image); // Append the image file
        formDataToSend.append('id', formData.id); // Append the ID

        console.log("Submitting form data:", formDataToSend); // Debugging log
        const response = await axios.put(
            `https://imr-market-report-l.onrender.com/api/adminclient/update/${formData.id}`, // Use formData.id
            formDataToSend,
            { headers: { 'Content-Type': 'multipart/form-data' } } // Set the content type
        );
        console.log("Client updated successfully:", response.data); // Debugging log
        alert("Client updated successfully!");
        navigate("/client"); // Redirect to client list
    } catch (error) {
        console.error("Error updating Client:", error);
        alert(`An error occurred: ${error.response?.status} - ${error.response?.data?.message || "Failed to update Client."}`);
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
                  
                    


                    {/* Answer */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="image" className="form-label">
                          Upload Image
                        </label>
                        <input
                          type="FILE"
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
                           Update Client
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

export default EditClient;
