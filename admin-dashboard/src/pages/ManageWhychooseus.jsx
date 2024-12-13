import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";

const ManageWhychooseus = () => {
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mt-5">
       <h2 className="mt-5" style={{marginLeft: "20%"}}>Manage Why Choose Us</h2>
       <Button text="Add Why Choose Us" to="/whychooseus-add"/>
       </div>
      <Table pageType="whychooseus" />
    </div>
  );
};

export default ManageWhychooseus;
