import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const response = await axios.get(process.env.REACT_APP_API_URL + '/api/reports');
                setReports(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch reports. Please try again later.');
                console.error('Error fetching reports:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="reports-container">
            <h1>Reports</h1>
            {reports.length === 0 ? (
                <p>No reports available.</p>
            ) : (
                <ul className="reports-list">
                    {reports.map(report => (
                        <li key={report._id} className="report-item">
                            <h3>{report.title}</h3>
                            {/* Add more report details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reports;
