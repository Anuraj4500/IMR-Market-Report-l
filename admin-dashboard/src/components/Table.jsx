import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "datatables.net";
import "datatables.net-bs5";
import { Link } from "react-router-dom";

const Table = () => {
  const [reportsTable, setReportsTable] = useState({ headers: [], rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adminreports/");
        setReportsTable({
          headers: ["ID", "Title", "Action"],
          rows: response.data.map((report, index) => ({
            id: report.id || index + 1,
            title: report.title,
            action: null, // Placeholder, updated later
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      $("#example").DataTable({
        destroy: true, // Ensure reinitialization doesn't cause errors
        columnDefs: [{ targets: -1, className: "dt-body-center" }],
      });
    }, 0);
  }, [reportsTable.rows]);

  const deleteRow = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/adminreports/${id}`);
        setReportsTable((prevState) => ({
          ...prevState,
          rows: prevState.rows.filter((row) => row.id !== id),
        }));
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };

  const addRow = () => {
    const newId = reportsTable.rows.length > 0 
      ? Math.max(...reportsTable.rows.map(row => row.id)) + 1 
      : 1; // Ensure unique ID
    setReportsTable((prevState) => ({
      ...prevState,
      rows: [
        ...prevState.rows,
        {
          id: newId,
          title: "New Report",
          action: null, // Placeholder
        },
      ],
    }));
  };

  // Update rows with the delete button action
  const updatedRows = reportsTable.rows.map((row) => ({
    ...row,
    action: (
      <>
        <Link
          to={`/report-edit/${row.id}`}
          className="btn btn-primary btn-sm"
          style={{ marginRight: "5px" }}
        >
          <i className="fa fa-edit"></i>
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteRow(row.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <div className="page-body-wrapper mt-5">
        <div className="page-body">
          <div className="container-fluid">
            {reportsTable.rows.length === 0 ? (
              <div className="alert alert-warning text-center">
                No reports available.
              </div>
            ) : (
              <table id="example" className="table table-striped">
                <thead>
                  <tr>
                    {reportsTable.headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {updatedRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.title}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
