import React, { useEffect, useState } from "react";
import axios from "axios";
import IndustriesBreadcrumb from "../components/Industries-Breadcrumb";
import ReportCard from "../components/Report-Card";
import IndustryCard from "../components/Industry-Card";
import AssistanceCard2 from "../components/AssistanceCard2";
import { useParams } from "react-router-dom";

const ReportsStore = () => {
    const { slug } = useParams(); // Extract category slug from URL
    const [reports, setReports] = useState([]); // Store matched reports
    const [error, setError] = useState(null); // Handle errors
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log("Slug from URL:", slug); // Log the slug from the URL
        const fetchReportsForCategory = async () => {
            try {
                setLoading(true);
    
                // Fetch the category by slug
                const categoryResponse = await axios.get(
                    `http://localhost:5000/api/category?slug=${slug}`
                );
                console.log("Category Response:", categoryResponse.data); // Log the response
    
                const category = categoryResponse.data;
    
                if (!category || !category.id) {
                    throw new Error("Category not found.");
                }
    
                console.log("Selected Category ID:", category.id); // Log the category ID
    
                // Fetch reports where cid matches the category id
                const reportsResponse = await axios.get(
                    `http://localhost:5000/api/reports?categoryId=${category.id}`
                );
                const matchedReports = reportsResponse.data;
    
                // Update the reports state
                setReports(matchedReports);
                setError(null); // Clear previous errors
            } catch (err) {
                console.error("Error fetching category or reports:", err); // Log the error
                setError(
                    err.response?.data?.message ||
                    "Unable to fetch data. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };
    
        fetchReportsForCategory();
    }, [slug]); // Refetch when slug changes

    // Show loading spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <IndustriesBreadcrumb />
            <section className="inner-page">
                <div className="container">
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : (
                        <div className="row">
                            {/* Reports Section */}
                            <div className="col-lg-9 order-md-2">
                                {reports.length > 0 ? (
                                    reports
                                        .filter(report => report.isActive) // Only include active reports
                                        .map((report) => (
                                            <ReportCard key={report.id} {...report} />
                                        ))
                                ) : (
                                    <div>No reports available for this category.</div>
                                )}
                            </div>

                            {/* Sidebar Section */}
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
