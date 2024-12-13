import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import '../login.css';
import logo from '../assets/Images/IMRLogo.png';
import loginImage from '../assets/Images/login-image.jpg';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                sessionStorage.setItem('isLoggedIn', 'true');
                login(); // Call your login hook
                navigate("/lead");
            } else {
                alert(data.message || "Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
                <img src={loginImage} alt="login-image" className="login-image" style={{width: '70%'}}/>
            </div>
            <div className="col-md-6">
                <div className="login-container">
                    <img src={logo} alt="logo" className="logo" />
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} className="text-center">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control email-input"
                                id="floatingInput"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control password-input"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" class="submit-btn mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;
