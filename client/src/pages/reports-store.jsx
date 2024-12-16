import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import ReportCard from '../components/Report-Card';
import IndustryCard from '../components/Industry-Card';
import AssistanceCard2 from '../components/AssistanceCard2';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

const ReportsStore = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
 
    const breadcrumbItems = [
        { label: 'Report Store' }
    ];
 
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://imr-market-report-l.onrender.com/api/reports`, {
                    params: { page: currentPage, limit: 10 }
                });
        
                console.log("API Response:", response.data);
        
                // Destructure and set the state correctly
                const { reports, totalPages } = response.data;
                setReports(reports || []);
                setTotalPages(totalPages || 0);
                setError(null);
            } catch (err) {
                console.error("Error fetching reports:", err);
                setError(
                    err.response?.data?.message ||
                    'Unable to fetch reports. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };
 
        fetchReports();
    }, [currentPage]);
 
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
 
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <section className="inner-page">
                <div className="container-fluid">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-9 order-md-2">
                                <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                {Array.isArray(reports) && reports.length > 0 ? (
                                    reports.map(report => (
                                        <ReportCard key={report.id} {...report} />
                                    ))
                                ) : (
                                    <div>No reports available.</div>
                                )}
                                <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                            <div className="col-lg-3 order-md-1">
                                <IndustryCard />
                                <AssistanceCard2 />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
 
export default ReportsStore;