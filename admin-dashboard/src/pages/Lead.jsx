import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import './Tab.css';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
    <Navbar/>
    <div className="page">
   
        <div className="page-body">
            <div className="container-fluid">
                <div className="page-title">
                    <div className="row">
                        <div className="col-sm-6 col-12">
                            <h2>Report Create</h2>
                        </div>
                      
                    </div>
                </div>
            </div>
            <div className="">
      <div className="buttonWrapper">
        <button
          className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
          style={{ borderTopLeftRadius: '10px' }}
          onClick={() => handleTabClick('home')}
        >
          Sample Report
        </button>
        <button
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => handleTabClick('about')}
        >
          Order Report
        </button>
        <button
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          style={{ borderTopRightRadius: '10px' }}
          onClick={() => handleTabClick('contact')}
        >
          Ask Discount
        </button>
      </div>
      <div className="">
        {activeTab === 'home' && (
          <div className="content active" id="home">
           <Table pageType="requests" />
          </div>
        )}
        {activeTab === 'about' && (
          <div className="content active" id="about">
           <Table pageType="checkouts" />
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="content active" id="contact">
           <Table pageType="discounts" />
          </div>
        )}
      </div>
    </div>
        </div>
    </div>
</div>
  );
};

export default Tabs;
