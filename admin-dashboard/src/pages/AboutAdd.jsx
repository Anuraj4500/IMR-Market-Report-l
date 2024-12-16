import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "@tinymce/tinymce-react";

const AboutAdd = () => {
  const [formData, setFormData] = useState({
    id: "",
    title1: "",
    content1: "",
    title2: "",
    content2: "",
    image_1: null,
    image_2: null,
    counter1: "",
    counter2: "",
    counter3: "",
    counter4: "",
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
      'title1', 'content1', 'title2', 'content2', 
      'counter1', 'counter2', 'counter3', 'counter4',
      'image_1', 'image_2'
    ];

    // Check if any required field is empty
    const missingFields = requiredFields.filter(field => {
      if (field.startsWith('image_')) {
        return !formData[field];
      }
      return !formData[field] || formData[field].trim() === '';
    });

    // If any required field is missing, show error
    if (missingFields.length > 0) {
      alert(`The following fields are required: ${missingFields.join(', ')}`);
      return;
    }

    // Validate counter fields are numbers
    const counterFields = ['counter1', 'counter2', 'counter3', 'counter4'];
    const invalidCounters = counterFields.filter(field => 
      isNaN(Number(formData[field]))
    );

    if (invalidCounters.length > 0) {
      alert(`The following counter fields must be numbers: ${invalidCounters.join(', ')}`);
      return;
    }

    // Create FormData to send files
    const formDataToSubmit = new FormData();
    
    // Append all text fields and counters
    Object.keys(formData).forEach(key => {
      if (key.startsWith('image_')) {
        // Append image files
        formDataToSubmit.append(key, formData[key]);
      } else {
        // Append text fields and counters
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "https://imr-market-report-l.onrender.com/api/adminabout/create", 
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log("About Us created:", response.data);
      alert("About Us created successfully!");
      
      // Optional: Reset form after successful submission
      setFormData({
        title1: "",
        content1: "",
        title2: "",
        content2: "",
        image_1: null,
        image_2: null,
        counter1: "",
        counter2: "",
        counter3: "",
        counter4: "",
      });
    } catch (error) {
      console.error(
        "Error creating About Us:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error creating About Us: ${error.response ? error.response.data.message : error.message}`
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
                  <h2>Add New About Us</h2>
                </div>
                <div className="col-sm-6 col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item">About Us</li>
                    <li className="breadcrumb-item active">Add New About Us</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <h3>Section 1</h3>
              <div className="mb-3">
                <label className="form-label">Title 1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title 1"
                  value={formData.title1}
                  onChange={(e) => handleChange("title1", e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Content 1</label>
                <Editor
                  value={formData.content1}
                  apiKey="x0rmmdz7a0aa9c1731p55iv4ljdpundqm1qiupcu6cqnio0y"
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: "link image code table lists",
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(content) => handleEditorChange(content, "content1")}
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="image_1" className="form-label">
                    Upload Image 1
                  </label>
                  <input
                    type="file"
                    name="image_1"
                    id="image_1"
                    className="form-control"
                    onChange={(e) => handleFileChange("image_1", e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <h3>Section 2</h3>
              <div className="mb-3">
                <label className="form-label">Title 2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title 2"
                  value={formData.title2}
                  onChange={(e) => handleChange("title2", e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Content 2</label>
                <Editor
                  value={formData.content2}
                  apiKey="x0rmmdz7a0aa9c1731p55iv4ljdpundqm1qiupcu6cqnio0y"
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: "link image code table lists",
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(content) => handleEditorChange(content, "content2")}
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="image_2" className="form-label">
                    Upload Image 2
                  </label>
                  <input
                    type="file"
                    name="image_2"
                    id="image_2"
                    className="form-control"
                    onChange={(e) => handleFileChange("image_2", e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <h3>Counter</h3>
              {["counter1", "counter2", "counter3", "counter4"].map((key) => (
                <div key={key} className="mb-3">
                  <label className="form-label">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-success">
                Submit About Us
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAdd;
