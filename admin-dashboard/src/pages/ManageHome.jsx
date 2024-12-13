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

const ManageHome = () => {
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/home";

    // Fetch terms from the API
    const fetchHomes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setHomes(response.data);
        } catch (err) {
            console.error("Error fetching home:", err);
            setError("Failed to load home. Please try again later.");
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

        if (homes.length > 0) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [homes]);

    // Delete a term
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this home?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setHomes((prev) => prev.filter((home) => home.id !== id));
                alert("Home successfully deleted.");
                fetchHomes();
            } catch (err) {
                console.error("Error deleting home:", err);
                alert("Failed to delete the home. Please try again.");
            }
        }
    };

    // Fetch terms on component mount
    useEffect(() => {
        fetchHomes();
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

    const headers = ["ID", "Slogan", "Actions"];

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar />
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Home</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Manage Home</li>
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
                                            <Link to="/add-home" className="btn btn-primary mb-3">Add Home</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {homes.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No home available.
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
                                                        {homes.map((home) => (
                                                            <tr key={home.id}>
                                                                <td>{home.id}</td>
                                                                <td>{home.slogan}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-home/${home.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(home.id)}
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

export default ManageHome;
