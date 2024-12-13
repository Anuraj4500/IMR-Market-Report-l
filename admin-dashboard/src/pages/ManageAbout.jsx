import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";

const ManageAbout = () => {
  return (
    <div>
       <div className="d-flex justify-content-between align-items-center mt-5">
       <h2 className="mt-5" style={{marginLeft: "20%"}}>Manage About Us</h2>
       <Button text="Add About Us" to="/about-add"/>
       </div>
      <Table pageType="about" />
    </div>
  );
};

export default ManageAbout;
