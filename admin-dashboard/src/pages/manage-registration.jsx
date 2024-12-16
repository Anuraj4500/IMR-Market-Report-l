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

const ManageRegistration = () => {
    const [registration, setRegistration] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/login";

    // Fetch registration from the API
    const fetchRegistration = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setRegistration(response.data);
        } catch (err) {
            console.error("Error fetching registration:", err);
            setError("Failed to load registration. Please try again later.");
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

        if (registration.length > 0) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [registration]);

    // Delete a career
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this registration?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setRegistration((prev) => prev.filter((registration) => registration.id !== id));
                alert("Registration successfully deleted.");
                fetchRegistration();
            } catch (err) {
                console.error("Error deleting registration:", err);
                    alert("Failed to delete the registration. Please try again.");
            }
        }
    };

    // Fetch career on component mount
    useEffect(() => {
        fetchRegistration();
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

    const headers = ["ID", "User Name", "Email", "Password", "User Type", "Actions"];

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar />
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Registration</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Manage Registration</li>
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
                                            <Link to="/add-registration" className="btn btn-primary mb-3">Add Registration</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {registration.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No registration available.
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
                                                        {registration.map((registration) => (
                                                            <tr key={registration.id}>
                                                                <td>{registration.id}</td>
                                                                <td>{registration.user_name}</td>
                                                                <td>{registration.email}</td>
                                                                <td>{registration.password}</td>
                                                                <td>{registration.user_type}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-registration/${registration.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(registration.id)}
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

export default ManageRegistration;
