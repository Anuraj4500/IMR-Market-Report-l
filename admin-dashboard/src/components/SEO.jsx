import React, { useState } from "react";
import Navbar from "./Navbar";
import Button from "./Button";

const SEO = ({ title }) => {
    const [projectTitle, setProjectTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [projectRate, setProjectRate] = useState("");
    const [projectType, setProjectType] = useState("Hourly");
    const [priority, setPriority] = useState("Low");
    const [projectSize, setProjectSize] = useState("Small");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [details, setDetails] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
    };
   
    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <div className="page-body-wrapper mt-5">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row mt-3">
                                <div className="col-sm-6 col-12">
                                    <h2>{title}</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Home</li>
                                        <li className="breadcrumb-item active">Home Create</li>
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
                                        <div className="form theme-form basic-form">
                                            <form onSubmit={handleFormSubmit}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Meta Title</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Meta Title *"
                                                                value={projectTitle}
                                                                onChange={(e) => setProjectTitle(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Meta Keywords</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Meta Keywords *"
                                                                value={clientName}
                                                                onChange={(e) => setClientName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Meta Description</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Meta Description *"
                                                                value={projectRate}
                                                                onChange={(e) => setProjectRate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                               
                                                </div>
                                              
                                            
                                                {/* <div class="row">
                                            <div class="col">
                                                <div class="mb-3">
                                                    <h5 class="f-w-600 mb-2">Upload project file</h5>
                                                    <form class="dropzone" id="singleFileUpload" action="/upload.php">
                                                        <div class="dz-message needsclick"> <i
                                                                class="fa-solid fa-cloud-arrow-up"></i>
                                                            <h6>Drop files here or click to upload. </h6><span
                                                                class="note needsclick">(This is just a demo dropzone.
                                                                Selected files are<strong>not</strong> actually
                                                                uploaded.)</span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="row">
                                            <div class="col">
                                                <Button/>         
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
        </div>
    );
}

export default SEO;