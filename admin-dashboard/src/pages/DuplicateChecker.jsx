import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DuplicateChecker = () => {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/adminreports/check-duplicates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDownloadLink(response.data.downloadLink);
      setUploadedData(response.data.uploadedData);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error processing the file. Please check the file format and try again.");
    }
  };

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Navbar />
      <div className="page-body-wrapper mt-5 pt-4">
        <div className="page-body">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <h2>Check Duplicate Keywords</h2>
                <form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileChange} required />
                  <button type="submit" className="btn btn-primary mt-3">Check Duplicates</button>
                </form>
                {downloadLink && (
                  <a href={`http://localhost:5000/${downloadLink}`} download className="btn btn-success mt-3">
                    Download Non-Duplicate Excel
                  </a>
                )}
                {/* {uploadedData && (
              <div className="mt-3">
                <h4>Uploaded Keywords:</h4>
                <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
              </div>
            )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuplicateChecker;
