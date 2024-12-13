import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function UpdateCareer() {
    const { id } = useParams(); // Get the service ID from the URL parameters
    const navigate = useNavigate();
    const [jobrole, setJobrole] = useState('');
    const [jobdesc, setJobdesc] = useState('');
    const [workmode, setWorkmode] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('');
    const [fresherallowed, setFresherallowed] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch existing service data when the component mounts
    useEffect(() => {
        const fetchCareerData = async () => {
            console.log("Fetching career with ID:", id);
            try {
                const response = await fetch(`http://localhost:5000/api/career/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Career with ID ${id} not found.`);
                    }
                    throw new Error('Failed to fetch career data');
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setJobrole(data.item.jobrole);
                setJobdesc(data.item.jobdesc);
                setWorkmode(data.item.workmode);
                setLocation(data.item.location);
                setExperience(data.item.experience);
                setFresherallowed(data.item.fresherallowed);
            } catch (error) {
                console.error('Error fetching career data:', error);
                setError(error.message);
                // Optionally, redirect or show a message to the user
            }
        };

        fetchCareerData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/api/career/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobrole, jobdesc, workmode, location, experience, fresherallowed }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                navigate('/manage-career');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error updating career:', error);
            setError('Error updating career. Please try again.');
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
                                    <h2>Update Career</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Career</li>
                                        <li className="breadcrumb-item active">Update Career</li>
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
                                                        <h5 className="f-w-600 mb-2">Job Role</h5>
                                                            <input className="form-control" type="text" placeholder="Job Role *" value={jobrole} onChange={(e) => setJobrole(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Job Description</h5>
                                                        <input
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={jobdesc}
                                                            onChange={(e) => setJobdesc(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Work Mode</h5>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Write here"
                                                            value={workmode}
                                                            rows="5"
                                                            onChange={(e) => setWorkmode(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Location</h5>
                                                        <input className="form-control" type="text" placeholder="Location *" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Experience</h5>
                                                        <input className="form-control" type="text" placeholder="Experience *" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <h5 className="f-w-600 mb-2">Fresher Allowed</h5>
                                                        <input className="form-control" type="text" placeholder="Fresher Allowed *" value={fresherallowed} onChange={(e) => setFresherallowed(e.target.value)} required />
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

export default UpdateCareer;
