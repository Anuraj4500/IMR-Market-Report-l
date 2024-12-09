import React, { useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
const ManageReport = () => {
    const [reportsTable, setReportsTable] = useState({ headers: [], rows: [] });

    return (
        
        <div className="" style={{marginTop: "70px"}}>
            <Button text="Add Report" to="/report-add"/>
            <Table headers={reportsTable.headers} rows={reportsTable.rows} />
        </div>
    );
}

export default ManageReport;