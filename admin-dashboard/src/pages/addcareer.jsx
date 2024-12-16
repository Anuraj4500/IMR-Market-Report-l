import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function AddCareer() {
    const navigate = useNavigate();
    const [jobrole, setJobrole] = useState("");
    const [jobdesc, setJobdesc] = useState("");
    const [workmode, setWorkmode] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");
    const [fresherallowed, setFresherallowed] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            jobrole,
            jobdesc,
            workmode,   
            location,
            experience,
            fresherallowed,
        };

        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/career", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Career created successfully:", data);
                alert("Career created successfully!");
                navigate('/manage-career');

                // Clear input fields
                setJobrole("");
                setJobdesc("");
                setWorkmode("");
                setLocation("");
                setExperience("");
                setFresherallowed("");
            } else {
                const errorData = await response.text();
                console.error("Error creating career:", errorData);
                setError("Error creating career. Please try again.");
            }
        } catch (error) {
            console.error("Error creating career:", error);
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
                                    <h2>Add Career</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="form theme-form basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Job Role</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Job Role"
                                                    value={jobrole}
                                                    onChange={(e) => setJobrole(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Work Mode</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Work Mode"
                                                    value={workmode}
                                                    onChange={(e) => setWorkmode(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Location</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Experience</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Experience"
                                                    value={experience}
                                                    onChange={(e) => setExperience(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Fresher Allowed</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Fresher Allowed"
                                                    value={fresherallowed}
                                                    onChange={(e) => setFresherallowed(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Job Description</h5>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Job Description"
                                                    rows="5"
                                                    value={jobdesc}
                                                    onChange={(e) => setJobdesc(e.target.value)}
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

export default AddCareer;
