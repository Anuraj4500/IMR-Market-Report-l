import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function AddRegistration() {
    const navigate = useNavigate();
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user_type, setUser_type] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            user_name,
            email,
            password,
            user_type,
        };

        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User Registration created successfully:", data);
                alert("User Registration created successfully!");
                navigate('/manage-registration');

                // Clear input fields
                setUser_name("");
                setEmail("");
                setPassword("");
                setUser_type("");
            } else {
                const errorData = await response.text();
                console.error("Error creating registration:", errorData);
                setError("Error creating registration. Please try again.");
            }
        } catch (error) {
            console.error("Error creating registration:", error);
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
                                    <h2>Add User Registration</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="form theme-form basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">User Name</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Username"
                                                    value={user_name}
                                                    onChange={(e) => setUser_name(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Email</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">Password</h5>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <h5 className="f-w-600 mb-2">User Type</h5>
                                                <select
                                                    className="form-control"
                                                    value={user_type}
                                                    onChange={(e) => setUser_type(e.target.value)}
                                                    required
                                                >
                                                    <option value="admin">Admin</option>
                                                    <option value="employee">Employee</option>
                                                </select>
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

export default AddRegistration;
