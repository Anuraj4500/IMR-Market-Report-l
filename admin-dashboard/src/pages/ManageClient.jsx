import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";

const ManageClient = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5">
       <h2 className="mt-5" style={{marginLeft: "20%"}}>Manage Client</h2>
       <Button text="Add Client" to="/client-add"/>
       </div>
      <Table pageType="client" />
    </div>
  );
};

export default ManageClient;