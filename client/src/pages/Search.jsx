import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import AssistanceCard2 from '../components/AssistanceCard2';
import IndustryCard from '../components/Industry-Card';
import ReportCard from '../components/Report-Card';
 
const Search = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    // Helper function to sanitize the search query
    const sanitizeQuery = (query) => query.replace(/[^\w\s-]/g, '').trim();
 
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchQuery) {
                console.log('No search query provided.');
                setLoading(false);
                return;
            }
 
            const cleanQuery = searchQuery.replace(/\+/g, ' ').trim();
            console.log(`Starting search for query: "${cleanQuery}"`);
 
            // setLoading(true);
            setError(null);
 
            try {
                const isIdSearch = /^\d+$/.test(cleanQuery);
                console.log(`Is it an ID search? ${isIdSearch}`);
 
                let response;
                if (isIdSearch) {
                    console.log(`Fetching report by ID: ${cleanQuery}`);
                    response = await axios.get(
                        `${process.env.REACT_APP_API_URL || 'https://imr-market-report-l.onrender.com'}/api/reports/${cleanQuery}`
                    );
                    console.log('Report fetched by ID:', response.data);
                    setReports([response.data]);
                } else {
                    console.log(`Fetching reports by keyword: ${cleanQuery}`);
                    response = await axios.get(
                        `${process.env.REACT_APP_API_URL || 'https://imr-market-report-l.onrender.com'}/api/reports/search`,
                        {
                            params: { query: cleanQuery },
                        }
                    );
                    console.log('Reports fetched by keyword:', response.data);
                    setReports(response.data);
                }
 
                if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
                    console.warn('No matching reports found.');
                    setError('No matching reports found.');
                }
            } catch (err) {
                console.error('Search error:', err.response || err);
                setReports([]);
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    'An unexpected error occurred while fetching the reports.'
                );
            } finally {
                console.log('Search completed.');
                setLoading(false);
            }
        };
 
        fetchSearchResults();
    }, [searchQuery]);
 
    const breadcrumbItems = [{ label: 'Search Results' }];
 
    const getSearchTitle = () => {
        const cleanQuery = sanitizeQuery(searchQuery?.replace(/\+/g, ' '));
        if (/^\d+$/.test(cleanQuery)) {
            return `Search Results for Report ID: ${cleanQuery}`;
        }
        return `Search Results for Keywords: "${cleanQuery}"`;
    };
 
    const getErrorMessage = () => {
        if (error) {
            if (error.includes('No report found')) {
                return 'No reports matched your search query. Please refine your keywords.';
            }
            if (error.includes('Network Error')) {
                return 'Unable to connect to the server. Please check your connection and try again.';
            }
            return error;
        }
        return '';
    };
 
    console.log('Rendering search results...');
    console.log('Error state:', error);
    console.log('Loading state:', loading);
    console.log('Reports state:', reports);
 
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <section className="inner-page">
                <div className="container-fluid">
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            {getErrorMessage()}
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-9">
                                <h2>{getSearchTitle()}</h2>
                                <p>Found {reports.length} result(s)</p>
 
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {reports.length > 0 ? (
                                            reports.map((report) => (
                                                <ReportCard
                                                    key={report.id}
                                                    id={report.id}
                                                    title={report.title}
                                                    summary={report.description || report.summary}
                                                    pages={report.pages}
                                                    date={report.date}
                                                    slug={report.slug}
                                                />
                                            ))
                                        ) : (
                                            <div className="alert alert-info">
                                                No reports found matching "
                                                {sanitizeQuery(searchQuery?.replace(/\+/g, ' '))}"
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="col-md-3">
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
 
export default Search;