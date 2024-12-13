import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "datatables.net";
import "datatables.net-bs5";
import Navbar from "../components/Navbar";

const ManageTerms = () => {
    const [terms, setTerms] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/terms";

    // Fetch terms from the API
    const fetchTerms = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            // Assuming API returns an array or an object containing an array
            const fetchedTerms = response.data.items;
            console.log(response.data);
            setTerms(fetchedTerms || []);
            console.log(terms);
        } catch (err) {
            console.error("Error fetching terms:", err);
            setError("Failed to load terms. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Initialize DataTable
    useEffect(() => {
        const initializeDataTable = () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            $(tableRef.current).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                responsive: true,
            });
        };

        if (terms.length > 0) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [terms]);

    // Delete a term
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this term?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setTerms((prev) => prev.filter((term) => term.id !== id));
                alert("Term successfully deleted.");
                fetchTerms();
            } catch (err) {
                console.error("Error deleting term:", err);
                alert("Failed to delete the term. Please try again.");
            }
        }
    };

    // Fetch terms on component mount
    useEffect(() => {
        fetchTerms();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    const headers = ["ID", "Title", "Actions"];

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar />
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Terms</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Manage Terms</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end">
                                            <Link to="/add-terms" className="btn btn-primary mb-3">Add Term</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {Array.isArray(terms) && terms.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No terms available.
                                                </div>
                                            ) : (
                                                <table
                                                    id="example"
                                                    className="table table-striped"
                                                    ref={tableRef}
                                                >
                                                    <thead>
                                                        <tr>
                                                            {headers.map((header, index) => (
                                                                <th key={index}>{header}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(terms) && terms.map((term) => (
                                                            <tr key={term.id}>
                                                                <td>{term.id}</td>
                                                                <td>{term.title}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-terms/${term.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(term.id)}
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
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
};

export default ManageTerms;
