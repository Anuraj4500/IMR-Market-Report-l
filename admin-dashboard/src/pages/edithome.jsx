import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function UpdateHome() {
    const { id } = useParams(); // Get the id from the URL parameters
    const navigate = useNavigate(); // To navigate after the update
    const [slogan, setSlogan] = useState('');
    const [heroSectionBackgroundImage, setHeroSectionBackgroundImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch existing data for the home (initial state) when the component mounts
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch(`https://imr-market-report-l.onrender.com/api/home/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Home with ID ${id} not found.`);
                    }
                    throw new Error('Failed to fetch home data');
                }
                const data = await response.json();
                setSlogan(data.item.slogan);
            } catch (error) {
                console.error('Error fetching home data:', error);
                setError(error.message);
            }
        };

        fetchHomeData();
    }, [id]); // Fetch home data when component mounts or id changes

    // Handle form submission to update the home data
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('slogan', slogan);
        if (heroSectionBackgroundImage) {
            formData.append('image', heroSectionBackgroundImage);
        }

        try {
            const response = await fetch(`https://imr-market-report-l.onrender.com/api/home/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Home updated successfully!');
                navigate('/manage-home');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update home.');
            }
        } catch (error) {
            console.error('Error updating home:', error);
            setError('Error updating home. Please try again.');
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
                                    <h2>Update Home</h2>
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
                                                            <h5 className="f-w-600 mb-2">Slogan</h5>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Slogan"
                                                                value={slogan}
                                                                onChange={(e) => setSlogan(e.target.value)}
                                                               
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <h5 className="f-w-600 mb-2">Hero Section Background Image</h5>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="form-control"
                                                                onChange={(e) => setHeroSectionBackgroundImage(e.target.files[0])}
                                                               
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
        </div>
    );
}

export default UpdateHome;
