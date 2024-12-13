import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function AddTestimonials() {
    const navigate = useNavigate();
    const [designation, setDesignation] = useState("");
    const [sector, setSector] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            designation,
            sector,
            desc,
        };

        try {
            const response = await fetch("http://localhost:5000/api/testimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Testimonial created successfully:", data);
                alert("Testimonial created successfully!");
                navigate('/manage-testimonials');

                // Clear input fields
                setDesignation("");
                setDesc("");
                setSector("");
            } else {
                const errorData = await response.text();
                console.error("Error creating testimonial:", errorData);
                setError("Error creating testimonial. Please try again.");
            }
        } catch (error) {
            console.error("Error creating testimonial:", error);
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
                                    <h2>Add Testimonial</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="form theme-form basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Designation</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Designation"
                                                    value={designation}
                                                    onChange={(e) => setDesignation(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Sector</h5>
                                                <input
                                                    className="form-control"
                                                    placeholder="Write here"
                                                    value={sector}
                                                    onChange={(e) => setSector(e.target.value)}
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
    );
}

export default AddTestimonials;
