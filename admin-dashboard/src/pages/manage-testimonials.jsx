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

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL || "https://imr-market-report-l.onrender.com/api/testimonials";

    // Fetch testimonials from the API
    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setTestimonials(response.data);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            setError("Failed to load testimonials. Please try again later.");
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

        if (testimonials.length > 0) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [testimonials]);

    // Delete a testimonial
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
                alert("Testimonial successfully deleted.");
                fetchTestimonials();
            } catch (err) {
                console.error("Error deleting testimonial:", err);
                alert("Failed to delete the testimonial. Please try again.");
            }
        }
    };

    // Fetch testimonials on component mount
    useEffect(() => {
        fetchTestimonials();
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

    const headers = ["ID", "Designation", "Actions"];

    return (
        <>
        <Navbar />
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
          
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Testimonials</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Manage Testimonials</li>
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
                                            <Link to="/add-testimonials" className="btn btn-primary mb-3">Add Testimonial</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {testimonials.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No testimonials available.
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
                                                        {testimonials.map((testimonial) => (
                                                            <tr key={testimonial.id}>
                                                                <td>{testimonial.id}</td>
                                                                <td>{testimonial.designation}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-testimonials/${testimonial.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(testimonial.id)}
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
        </>
    );
};

export default ManageTestimonials;
