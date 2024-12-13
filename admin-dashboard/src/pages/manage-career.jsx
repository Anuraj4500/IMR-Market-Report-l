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

const ManageCareer = () => {
    const [career, setCareer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/career";

    // Fetch testimonials from the API
    const fetchCareer = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setCareer(response.data);
        } catch (err) {
            console.error("Error fetching career:", err);
            setError("Failed to load career. Please try again later.");
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

        if (career.length > 0) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [career]);

    // Delete a career
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this career?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setCareer((prev) => prev.filter((career) => career.id !== id));
                alert("Career successfully deleted.");
                fetchCareer();
            } catch (err) {
                console.error("Error deleting career:", err);
                    alert("Failed to delete the career. Please try again.");
            }
        }
    };

    // Fetch career on component mount
    useEffect(() => {
        fetchCareer();
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

    const headers = ["ID", "Job Role", "Actions"];

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar />
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Career</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Manage Career</li>
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
                                            <Link to="/add-career" className="btn btn-primary mb-3">Add Career</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {career.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No career available.
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
                                                        {career.map((career) => (
                                                            <tr key={career.id}>
                                                                <td>{career.id}</td>
                                                                <td>{career.jobrole}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-career/${career.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(career.id)}
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

export default ManageCareer;
