import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "datatables.net";
import "datatables.net-bs5";
import { Link } from "react-router-dom";

const Table = ({ pageType }) => {
  const [reportsTable, setReportsTable] = useState({ headers: [], rows: [] });
  const [faqTable, setFaqTable] = useState({ headers: [], rows: [] });
  const [clientTable, setClientTable] = useState({ headers: [], rows: [] });
  const [aboutTable, setAboutTable] = useState({ headers: [], rows: [] });
  const [table, setTable] = useState({ headers: [], rows: [] });
  const [requestTable, setRequestTable] = useState({ headers: [], rows: [] });
  const [checkoutTable, setCheckoutTable] = useState({ headers: [], rows: [] });
  const [discountTable, setDiscountTable] = useState({ headers: [], rows: [] });
  const [whychooseusTable, setWhychooseusTable] = useState({ headers: [], rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminreports/");
        const data = response.data || [];
        setReportsTable({
          headers: ["ID", "Title", "Action"],
          rows: data.map((report, index) => ({
            id: report?.id ?? index + 1,
            title: report?.title ?? "N/A",
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching reports:", error.message);
        setReportsTable({ headers: [], rows: [] });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminfaq/");
        const data = response.data || [];
        setFaqTable({
          headers: ["ID", "Question", "Answer", "Action"],
          rows: data.map((faq, index) => ({
            id: faq?.id ?? index + 1,
            question: faq?.que ?? "N/A",
            answer: faq?.ans ?? "N/A",
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching FAQs:", error.message);
        setFaqTable({ headers: [], rows: [] });
      }
    };

    fetchFaqData();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminclient/");
        const data = response.data || [];
        setClientTable({
          headers: ["ID", "Image", "Action"],
          rows: data.map((client, index) => ({
            id: client?.id ?? index + 1,
            image: client?.image ?? "N/A",
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching clients:", error.message);
        setClientTable({ headers: [], rows: [] });
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminabout");
        const data = response.data || [];
        setAboutTable({
          headers: ["ID", "Title", "Content", "Action"],
          rows: data.map((about, index) => ({
            id: about?.id ?? index + 1,
            title1: about?.title1 ?? "N/A",
            content1: about?.content1 ?? "N/A", 
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching About Us:", error.message);
        setAboutTable({ headers: [], rows: [] });
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminlead/requests");
        const data = response.data || [];
        setRequestTable({
          headers: ["ID", "Name", "Email", "Phone", "Country", "Company", "Report ID", "Request Date", "Action"],
          rows: data.map((request, index) => ({
            id: request?.id ?? index + 1,
            name: request?.name ?? "N/A",
            email: request?.email ?? "N/A",
            phone: request?.phone ?? "N/A",
            country: request?.country ?? "N/A",
            company: request?.company ?? "N/A",
            rid: request?.rid ?? "N/A",
            requestdate: request?.requestdate ?? "N/A",

            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching requests:", error.message);
        setRequestTable({ headers: [], rows: [] });
      }
    };

    fetchRequestData();
  }, []);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminlead/checkouts");
        const data = response.data || [];
        setCheckoutTable({
          headers: ["ID", "Name", "Email", "Designation", "City", "State", "Country", "Phone",  "Report ID",  "Order Date",  "Action"],
          rows: data.map((checkout, index) => ({
            id: checkout?.id ?? index + 1,
            name: checkout?.name ?? "N/A",
            email: checkout?.email ?? "N/A",
            designation: checkout?.designation ?? "N/A",
            city: checkout?.city ?? "N/A",
            state: checkout?.state ?? "N/A",
            country: checkout?.country ?? "N/A",
            phone: checkout?.phone ?? "N/A",
            rid: checkout?.rid ?? "N/A",
            orderDate: checkout?.orderDate ?? "N/A",
            paymentStatus: checkout?.paymentStatus ?? "N/A",
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching checkouts:", error.message);
        setCheckoutTable({ headers: [], rows: [] });
      }
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminlead/discount");
        const data = response.data || [];
        setDiscountTable({
          headers: ["ID", "Name", "Email", "Phone", "Country", "Company", "Report ID", "Request Date",  "Action"],
          rows: data.map((discount, index) => ({
            id: discount?.id ?? index + 1,
            name: discount?.name ?? "N/A",
            email: discount?.email ?? "N/A",
            phone: discount?.phone ?? "N/A",
            country: discount?.country ?? "N/A",
            company: discount?.company ?? "N/A",
            rid: discount?.rid ?? "N/A",
            requestdate: discount?.requestdate ?? "N/A",
            action: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching discounts:", error.message);
        setDiscountTable({ headers: [], rows: [] });
      }
    };

    fetchDiscountData();
  }, []);

  useEffect(() => {
    const fetchWhychooseusData = async () => {
      try {
        const response = await axios.get("https://imr-market-report-l.onrender.com/api/adminwhychooseus/");
        const data = response.data || [];
        setWhychooseusTable({ headers: ["ID", "Title", "Content", "Image", "Action"], rows: data });
      } catch (error) {
        console.error("Error fetching Why Choose Us:", error.message);
        setWhychooseusTable({ headers: [], rows: [] });
      }
    };

    fetchWhychooseusData();
  }, []);

  useEffect(() => {
    if (pageType === "reports") {
      setTable(reportsTable);
    } else if (pageType === "faq") {
      setTable(faqTable);
    } else if (pageType === "client") {
      setTable(clientTable);
    } else if (pageType === "about") {
      setTable(aboutTable);
    } else if (pageType === "checkouts") {
      setTable(checkoutTable);
    } else if (pageType === "discounts") {
      setTable(discountTable);
    } else if (pageType === "requests") {
      setTable(requestTable);
    } else if (pageType === "whychooseus") {
      setTable(whychooseusTable);
    }
  }, [pageType, reportsTable, faqTable, clientTable, aboutTable, checkoutTable, discountTable, requestTable, whychooseusTable]);

  useEffect(() => {
    const initDataTable = () => {
      const table = $('#example').DataTable({
        destroy: true,
        columnDefs: [{ targets: -1, className: "dt-body-center" }],
      });
      return () => table.destroy();
    };

    initDataTable();
  }, [table.rows]);

  const deleteRow = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${pageType === "reports" ? "report" : pageType === "faq" ? "FAQ" : pageType === "client" ? "client" : pageType === "whychooseus" ? "Why Choose Us" : "about"}?`
    );

    if (confirmDelete) {
      try {
        if (pageType === "reports") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminreports/${id}`);
          setReportsTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "faq") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminfaq/${id}`);
          setFaqTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "client") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminclient/${id}`);
          setClientTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "about") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminabout/${id}`);
          setAboutTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "requests") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminlead/requests/${id}`);
          setRequestTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "checkouts") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminlead/checkouts/${id}`);
          setCheckoutTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "discounts") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminlead/discount/${id}`);
          setDiscountTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        } else if (pageType === "whychooseus") {
          await axios.delete(`https://imr-market-report-l.onrender.com/api/adminwhychooseus/${id}`);
          setWhychooseusTable((prevState) => ({
            ...prevState,
            rows: prevState.rows.filter((row) => row.id !== id),
          }));
        }
      } catch (error) {
        console.error(`Error deleting ${pageType}:`, error.message);
      }
    }
  };

  const getUpdatedRows = () => {
    const rows = pageType === "reports" ? reportsTable.rows
                : pageType === "faq" ? faqTable.rows
                : pageType === "client" ? clientTable.rows
                : pageType === "about" ? aboutTable.rows
                : pageType === "requests" ? requestTable.rows // Added handling for requests
                : pageType === "checkouts" ? checkoutTable.rows // Added handling for checkouts
                : pageType === "discounts" ? discountTable.rows // Added handling for discounts
                : pageType === "whychooseus" ? whychooseusTable.rows // Added handling for whychooseus
                : [];
  
    return rows
      .filter(row => 
        (pageType === "reports" && row.title !== "N/A") ||
        (pageType === "faq" && (row.question !== "N/A" || row.answer !== "N/A")) ||
        (pageType === "client" && row.image !== "N/A") ||
        (pageType === "about" && (row.title1 !== "N/A" || row.content1 !== "N/A")) ||
        (pageType === "requests" && row.name !== "N/A") || // Ensure requests have valid names
        (pageType === "checkouts" && row.name !== "N/A") || // Ensure checkouts have valid names
        (pageType === "discounts" && row.name !== "N/A") || // Ensure discounts have valid names
        (pageType === "whychooseus" && row.title !== "N/A") // Ensure whychooseus have valid names
      )
      .map((row) => ({
        ...row,
        action: (
          <>
            <Link to={`/${pageType}-edit/${row.id}`} className="btn btn-primary btn-sm">
              <i className="fa fa-edit"></i>
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => deleteRow(row.id)}>
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
        question: row.question || "N/A",
        answer: row.answer || "N/A",
        image: row.image ? `https://imr-market-report-l.onrender.com/${row.image}` : "N/A",
        title1: row.title1 || "N/A",
        content1: row.content1 || "N/A",
      }));
  };

  const updatedRows = getUpdatedRows();

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
    <div className="page-body-wrapper mt-3">
      <div className="page-body">
        <div className="container-fluid">
          {table.rows.length === 0 ? (
            <div className="alert alert-warning text-center">
              No {pageType} available.
            </div>
          ) : (
            <table id="example" className="table table-striped">
              <thead>
                <tr>
                  {table.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {updatedRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    {pageType === "reports" ? (
                      <td>{row.title}</td>
                    ) : pageType === "faq" ? (
                      <>
                        <td>{row.question}</td> 
                        <td>{row.answer}</td>
                      </>
                    ) : pageType === "client" ? (
                      <td>
                        <img src={row.image} alt="Client" style={{ width: "50px", height: "50px" }} />
                      </td>
                    ) : pageType === "requests" ? (
                      <>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.country}</td>
                        <td>{row.company}</td>
                        <td>{row.rid}</td>
                        <td>{row.requestdate}</td>
                
                      </>
                    ) : pageType === "checkouts" ? (
                      <>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.designation}</td>
                        <td>{row.city}</td>
                        <td>{row.state}</td>
                        <td>{row.country}</td>
                        <td>{row.phone}</td>
                        <td>{row.rid}</td>
                        <td>{row.orderDate}</td>
                  
                      </>
                    ) : pageType === "discounts" ? (
                      <>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.country}</td>
                        <td>{row.company}</td>
                        <td>{row.rid}</td>
                        <td>{row.requestdate}</td>
                      </>
                    ) : pageType === "whychooseus" ? (
                      <>
                        <td>{row.title}</td>
                        <td>{row.content}</td>
                        <td>{row.image}</td>
                      </>
                    ) : (
                      <>
                        <td>{row.title1}</td>
                        <td>{row.content1}</td>
                        
                      </>
                    )}
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
