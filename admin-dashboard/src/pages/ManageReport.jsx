import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";
const ManageReports = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5">
       <h2 className="mt-5" style={{marginLeft: "20%"}}>Manage Reports</h2>
       <Button text="Add Report" to="/report-add"/>
       </div>
      <Table pageType="reports" />
    </div>
  );
};

export default ManageReports;
