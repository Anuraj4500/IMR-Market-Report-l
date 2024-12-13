import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function UpdateOurService() {
    const { id } = useParams(); // Get the service ID from the URL parameters
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch existing service data when the component mounts
    useEffect(() => {
        const fetchServiceData = async () => {
            console.log("Fetching service with ID:", id);
            try {
                const response = await fetch(`http://localhost:5000/api/ourservices/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Service with ID ${id} not found.`);
                    }
                    throw new Error('Failed to fetch service data');
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setTitle(data.item.title);
                setDesc(data.item.desc);
                setIcon(data.item.icon || '');
            } catch (error) {
                console.error('Error fetching service data:', error);
                setError(error.message);
                // Optionally, redirect or show a message to the user
            }
        };

        fetchServiceData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/api/ourservices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, desc, icon }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                navigate('/manage-our-services');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error updating service:', error);
            setError('Error updating service. Please try again.');
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
                                    <h2>Update Our Service</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Our Services</li>
                                        <li className="breadcrumb-item active">Update Our Service</li>
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
                                                        <h5 className="f-w-600 mb-2">Title</h5>
                                                        <input className="form-control" type="text" placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
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

export default UpdateOurService;
