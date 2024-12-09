import React, { useState } from "react";
import Navbar from "../components/Navbar";
import 'font-awesome/css/font-awesome.min.css';
import Button from "../components/Button";


const HomeAdd = () => {
    const [ReportTitle, setReportTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [ReportRate, setReportRate] = useState("");
    const [ReportType, setReportType] = useState("Hourly");
    const [priority, setPriority] = useState("Low");
    const [ReportSize, setReportSize] = useState("Small");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [details, setDetails] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
    };

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar/>
            <div className="page-body-wrapper mt-5">
           
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Report Create</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Report</li>
                                        <li className="breadcrumb-item active">Report Create</li>
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
                                                            <h5 className="f-w-600 mb-2">Report Title</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Report name *"
                                                                value={ReportTitle}
                                                                onChange={(e) => setReportTitle(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Client name</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Name client or company name"
                                                                value={clientName}
                                                                onChange={(e) => setClientName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Report Rate</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Enter Report Rate"
                                                                value={ReportRate}
                                                                onChange={(e) => setReportRate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Report Type</h5>
                                                            <select
                                                                className="form-select"
                                                                value={ReportType}
                                                                onChange={(e) => setReportType(e.target.value)}
                                                            >
                                                                <option>Hourly</option>
                                                                <option>Fix price</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Priority</h5>
                                                            <select
                                                                className="form-select"
                                                                value={priority}
                                                                onChange={(e) => setPriority(e.target.value)}
                                                            >
                                                                <option>Low</option>
                                                                <option>Medium</option>
                                                                <option>High</option>
                                                                <option>Urgent</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        {/* <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Report Size</h5>
                                                            <select
                                                                className="form-select"
                                                                value={ReportSize}
                                                                onChange={(e) => setReportSize(e.target.value)}
                                                            >
                                                                <option>Small</option>
                                                                <option>Medium</option>
                                                                <option>Big</option>
                                                            </select>
                                                        </div> */}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Starting date</h5>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Ending date</h5>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                value={endDate}
                                                                onChange={(e) => setEndDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Enter some Details</h5>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Write here"
                                                                value={details}
                                                                onChange={(e) => setDetails(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                            <div class="col">
                                                <div class="mb-3">
                                                    <h5 class="f-w-600 mb-2">Upload Report file</h5>
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
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <Button label="Submit" link="/home-submit" />
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
};

export default HomeAdd;
