import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";

const ManageFAQs = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-5">
       <h2 className="mt-5" style={{marginLeft: "20%"}}>Manage FAQs</h2>
       <Button text="Add FAQ" to="/faq-add"/>
       </div>
      <Table pageType="faq" />
    </div>
  );
};

export default ManageFAQs;
