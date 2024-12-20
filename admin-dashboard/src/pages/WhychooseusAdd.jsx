import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "@tinymce/tinymce-react";

const WhychooseusAdd = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",    
    image: "",
    
  });

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleFileChange = (fieldName, file) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: file }));
  };

  const handleEditorChange = (content, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: content }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Comprehensive validation
    const requiredFields = [
        'title', 'content', 'image'
    ];

    // Check if any required field is empty
    const missingFields = requiredFields.filter(field => {
        return !formData[field] || (field === 'image' && !formData[field]?.name);
    });

    // If any required field is missing, show error
    if (missingFields.length > 0) {
        alert(`The following fields are required: ${missingFields.join(', ')}`);
        return;
    }

    // Create FormData to send files
    const formDataToSubmit = new FormData();
    
    // Append all text fields and counters
    Object.keys(formData).forEach(key => {
        if (key === 'image') {
            formDataToSubmit.append('image', formData[key]);
        } else {
            formDataToSubmit.append(key, formData[key]);
        }
    });

    try {
        const response = await axios.post(
            "https://imr-market-report-l.onrender.com/api/adminwhychooseus/create", 
            formDataToSubmit,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log("Why Choose Us created:", response.data);
        alert("Why Choose Us created successfully!");
        
        // Optional: Reset form after successful submission
        setFormData({
            id: "",
            title: "",
            content: "",
            image: null,
        });
    } catch (error) {
        console.error(
            "Error creating Why Choose Us:",
            error.response ? error.response.data : error.message
        );
        alert(
            `Error creating Why Choose Us: ${error.response ? error.response.data.message : error.message}`
        );
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
                  <h2>Add New Why Choose Us</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/manage-whychooseus">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">Why Choose Us</li>
                    <li className="breadcrumb-item active">Add New Why Choose Us</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <Editor
                  value={formData.content}
                  apiKey="x0rmmdz7a0aa9c1731p55iv4ljdpundqm1qiupcu6cqnio0y"
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: "link image code table lists",
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(content) => handleEditorChange(content, "content")}
                />
              </div>

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
                    onChange={(e) => handleFileChange("image", e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Submit Why Choose Us
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhychooseusAdd;
