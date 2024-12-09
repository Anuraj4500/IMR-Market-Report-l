import React, { useState, useEffect } from 'react';
import aboutus from '../assets/Images/test/Aboutus.svg';
import Breadcrumb from '../components/Breadcrumb';

function OurServices() {
    const breadcrumbItems = [{ label: 'Our Services' }];

    const [ourservices, setOurServices] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    // Function to fetch data from the API
    const fetchOurServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ourservices');
            const data = await response.json();

            // Check if the data is an array
            if (Array.isArray(data)) {
                setOurServices(data); // Set the state if data is an array
            } else {
                console.error('Expected an array but got:', data);
                setOurServices([]); // Set to empty array if not an array
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setOurServices([]); // Set to empty array on error
        }
    };

    useEffect(() => {
        fetchOurServices();
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index); // Update the active tab index
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <section className="about-us-area py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-12">
                            <div className="about-us-content">
                                <div className="ot-heading">
                                    <span className="ms-4">Our services</span>
                                    <h2 className="main-heading text-dark">Driving innovation and success in Industry Insights</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6 col-md-12 ps-lg-5 mt-4 mt-lg-0">
                            <p className="text-justify">
                                Our expert consultants bring a wealth of experience to the table, offering actionable solutions
                                that enhance business performance, streamline operations, and foster long-term growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <div className="our-expertise bg-section departments">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="our-tab-nav wow fadeInUp" data-wow-delay="0.25s">
                                <ul className="nav nav-tabs justify-content-center flex-column flex-md-row" id="myTab" role="tablist">
                                    {ourservices.map((service, index) => (
                                        <li className="" role="presentation" key={index}>
                                            <button
                                                className={`nav-link btn-highlighted ${index === activeTab ? 'active' : ''} w-100 mb-2 mb-md-0 px-4 py-3`}
                                                id={`tab-${index}`}
                                                type="button"
                                                role="tab"
                                                aria-selected={index === activeTab}
                                                onClick={() => handleTabClick(index)}
                                            >
                                                {service.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="expertise-box tab-content" id="ourservicesTabContent">
                                {ourservices.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`expertise-item tab-pane fade ${index === activeTab ? 'show active' : ''}`}
                                        id={`content-${index}`}
                                        role="tabpanel"
                                    >
                                        <div className="row justify-content-center expertise-content mx-4">
                                            <div className="col-lg-8 col-md-12">
                                                <div className="expertise-content-header">
                                                    <h3 className="mb-3">{service.title}</h3>
                                                    <p className="mb-4 text-dark" style={{ fontSize: "1rem" }}>{service.desc}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                                                <div className="expertise-image">
                                                    <figure className="image-anime">
                                                        <img src={aboutus} alt="Expertise" className="img-fluid" />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurServices;
