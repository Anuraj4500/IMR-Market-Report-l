import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function UpdateOurService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ourservices/${id}`);
                if (!response.ok) throw new Error('Failed to fetch service data');

                const data = await response.json();
                setTitle(data.item.title);
                setDesc(data.item.desc);
                setIcon(data.item.icon || '');
            } catch (error) {
                setError(error.message);
            }
        };
        fetchServiceData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        // Prepare FormData to handle file upload and text data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('icon', icon);
        if (image) formData.append('image', image);

        try {
            const response = await fetch(`http://localhost:5000/api/ourservices/${id}`, {
                method: 'PUT',
                body: formData, // Send formData
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
                        <h2>Update Our Service</h2>
                        {error && <p className="text-danger">{error}</p>}
                        {success && <p className="text-success">{success}</p>}
                        <form onSubmit={handleUpdate} encType="multipart/form-data">
                            <div className="mb-3">
                                <label>Title</label>
                                <input
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}                                    
                                />
                            </div>
                            <div className="mb-3">
                                <label>Icon</label>
                                <input
                                    className="form-control"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    rows="5"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    accept="image/*"
                                />
                            </div>
                            <Button text={isUpdating ? 'Updating...' : 'Update'} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateOurService;
