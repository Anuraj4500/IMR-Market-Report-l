import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function UpdateRegistration() {
    const { id } = useParams(); // Get the service ID from the URL parameters
    const navigate = useNavigate();
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_type, setUser_type] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch existing service data when the component mounts
    useEffect(() => {
        const fetchRegistrationData = async () => {
            console.log("Fetching registration with ID:", id);
            try {
                const response = await fetch(`http://localhost:5000/api/login/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Registration with ID ${id} not found.`);
                    }
                    throw new Error('Failed to fetch registration data');
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setUser_name(data.item.user_name);
                setEmail(data.item.email);
                setPassword(data.item.password);
                setUser_type(data.item.user_type);
            } catch (error) {
                console.error('Error fetching registration data:', error);
                setError(error.message);
                // Optionally, redirect or show a message to the user
            }
        };

        fetchRegistrationData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/api/login/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name, email, password, user_type }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                navigate('/manage-registration');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error updating registration:', error);
            setError('Error updating registration. Please try again.');
        } finally {
            setIsUpdating(false);
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
                                    <h2>Update Registration</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Registration</li>
                                        <li className="breadcrumb-item active">Update Registration</li>
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
                                            {error && <p className="text-danger">{error}</p>}
                                            {success && <p className="text-success">{success}</p>}
                                            <form onSubmit={handleUpdate}>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">User Name</h5>
                                                            <input className="form-control" type="text" placeholder="User Name *" value={user_name} onChange={(e) => setUser_name(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Email</h5>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Password</h5>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={password}
                                                            rows="5"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">User Type</h5>
                                                        <select className="form-control" value={user_type} onChange={(e) => setUser_type(e.target.value)} required>
                                                            <option value="admin">Admin</option>
                                                            <option value="user">User</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col">
                                                        <Button text={isUpdating ? 'Updating...' : 'Update'} />
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

export default UpdateRegistration;
