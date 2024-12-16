import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function OurServicesAdd() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [icon, setIcon] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("icon", icon);
        formData.append("image", image);

        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/ourservices", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Service created successfully:", data);
                alert("Service created successfully!"); // Show alert message
                navigate('/manage-our-services');

                // Clear input fields
                setTitle("");
                setDesc("");
                setIcon("");
                setImage("");
            } else {
                const errorData = await response.text();
                console.error("Error creating service:", errorData);
                setError("Error creating service. Please try again.");
            }
        } catch (error) {
            console.error("Error creating service:", error);
        } finally {
            setIsSubmitting(false);
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
                                    <h2>Add Our Service</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Our Services</li>
                                        <li className="breadcrumb-item active">Add Our Service</li>
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
                                            <form onSubmit={handleSubmit}>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Title</h5>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Title *"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Write Fontawesome Icon Name</h5>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={icon}
                                                            onChange={(e) => setIcon(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Enter Description</h5>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={desc}
                                                            rows="5"
                                                            onChange={(e) => setDesc(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Image</h5>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="form-control"
                                                            onChange={(e) => setImage(e.target.files[0])}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                {error && <p className="text-danger">{error}</p>}
                                                <div className="row">
                                                    <div className="col">
                                                        <Button text={isSubmitting ? 'Submitting...' : 'Submit'} />
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

export default OurServicesAdd;
