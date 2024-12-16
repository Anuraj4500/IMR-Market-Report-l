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

const ManageOurServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null); // Reference for the table

    const fetchServices = async () => {
        try {
            const response = await fetch("https://imr-market-report-l.onrender.com/api/ourservices");
            if (!response.ok) {
                throw new Error("Failed to fetch services");
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        const initializeDataTable = () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy(); // Destroy previous instance
            }

            // Initialize DataTable
            $(tableRef.current).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                responsive: true,
            });
        };

        if (services.length > 0) {
            initializeDataTable();
        }
    }, [services]);

    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this service?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://imr-market-report-l.onrender.com/api/ourservices/${id}`);
                setServices(services.filter((service) => service.id !== id)); // Remove the deleted service from the list
                alert("Service successfully deleted.");
                fetchServices();
            } catch (error) {
                console.error("Error deleting service:", error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    const headers = ["ID", "Title", "Action"];

    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Navbar />
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2>Manage Our Services</h2>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">Our Services</li>
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
                                            <Link to="/our-servicesadd" className="btn btn-primary mb-3">Add Our Service</Link>
                                        </div>
                                        <div className="container-fluid p-2">
                                            {services.length === 0 ? (
                                                <div className="alert alert-warning text-center">
                                                    No services available.
                                                </div>
                                            ) : (
                                                <table
                                                    id="example"
                                                    className="table table-striped"
                                                    ref={tableRef} // Attach the ref to the table
                                                >
                                                    <thead>
                                                        <tr>
                                                            {headers.map((header, index) => (
                                                                <th key={index}>{header}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {services.map((service) => (
                                                            <tr key={service.id}>
                                                                <td>{service.id}</td>
                                                                <td>{service.title}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/edit-our-services/${service.id}`}
                                                                        className="btn btn-primary btn-sm"
                                                                        style={{ marginRight: "5px" }}
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => deleteRow(service.id)}
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

export default ManageOurServices;
