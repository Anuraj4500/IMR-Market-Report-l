import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function AddTerms() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error
        setIsSubmitting(true);

        // Validate input
        if (!title.trim() || !content.trim()) {
            setError("Both fields are required.");
            setIsSubmitting(false);
            return;
        }

        const formData = { title, content };
        console.log(formData);

        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/terms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Term created successfully!");
                navigate("/manage-terms");
                setTitle("");
                setContent("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Error creating term.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Network error. Please try again later.");
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
                        <h2>Add Term</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Title</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Content</label>
                                <textarea
                                    className="form-control"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="5"
                                    required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <Button text={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTerms;
