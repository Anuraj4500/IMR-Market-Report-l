import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function HomeAdd() {
    const navigate = useNavigate();
    const [slogan, setSlogan] = useState("");
    const [herosectionbackgroundimage, setHeroSectionBackgroundImage] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("slogan", slogan);
        formData.append("image", herosectionbackgroundimage);

        // Debugging: Log the form data
        console.log("Submitting form with data:", {
            slogan,
            image: herosectionbackgroundimage,
        });

        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/home", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Image uploaded successfully:", data);
                alert("Home created successfully!");
                navigate('/manage-home');

                // Clear input fields
                setSlogan("");
                setHeroSectionBackgroundImage(null);
            } else {
                const errorData = await response.text();
                console.error("Error uploading image:", errorData);
                setError("Error uploading image. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setError("Error uploading image. Please try again.");
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
                                    <h2>Add Home</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="form theme-form basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">slogan</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="slogan"
                                                    value={slogan}
                                                    onChange={(e) => setSlogan(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Hero section Background Image</h5>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={(e) => setHeroSectionBackgroundImage(e.target.files[0])}
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

export default HomeAdd;
