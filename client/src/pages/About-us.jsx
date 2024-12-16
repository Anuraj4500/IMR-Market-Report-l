import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/Breadcrumb";
import aboutimages from '../assets/storage/categories_images/231730a7fcb0ad429f593644ca2098e1.svg';
import aboutimages1 from '../assets/storage/categories_images/18cd4294dc564f20c6d9fac1b0678205.svg';
import WhyChooseUs from "../components/Why-Choose-Us";
import CountUp from "react-countup";

const AboutUs = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch('https://imr-market-report-l.onrender.com/api/aboutus');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setAboutData(data);
            } catch (err) {
                console.error("Error fetching Data:", err);
                setError('Unable to fetch Data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!aboutData || !Array.isArray(aboutData)) return <div>No data available</div>;

    const breadcrumbItems = [
        { label: 'About Us' }
    ];

    return (
        <div>
            <BreadCrumb items={breadcrumbItems} />
            {aboutData.map((item, index) => (
                <React.Fragment key={index}>
                    <section id="about-1" className="about">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src={aboutimages} className="img-fluid w-75" alt="About Us Image 1" />
                                </div>
                                <div className="col-lg-6 pt-4 pt-lg-0 content">
                                    <h3>{item.title1}</h3>
                                    <p className="text-justify">{item.content1.replace(/<[^>]+>/g, '')}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="about-2" className="about" style={{ backgroundColor: "#4F6A7D", color: "#FFF" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 pt-4 pt-lg-0 content">
                                    <h3 style={{ color: "#FA6742" }}>{item.title2}</h3>
                                    <p className="text-justify">{item.content2.replace(/<[^>]+>/g, '')}</p>
                                </div>
                                <div className="col-lg-6">
                                    <img src={aboutimages1} style={{ width: "80%" }} alt="About Us Image 2" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="counts" style={{ background: "#FA6742" }}>
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="icofont-users-alt-2"></i>
                                        {item.counter1 != null ? (
                                            <CountUp start={0} end={item.counter1} duration={2.5} />
                                        ) : (
                                            <span>0</span>
                                        )}
                                        <p><strong>Clients</strong> served worldwide</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="icofont-document-folder"></i>
                                        <CountUp start={0} end={item.counter2} duration={2.5} />
                                        <p><strong>Reports</strong> collections and counting</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="icofont-team"></i>
                                        <CountUp start={0} end={item.counter3} duration={2.5} />
                                        <p><strong>Research Analysts</strong> supporting our clients 24X7</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                    <div className="count-box">
                                        <i className="icofont-globe-alt"></i>
                                        <CountUp start={0} end={item.counter4} duration={2.5} />
                                        <p><strong>Countries</strong> covered till now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <WhyChooseUs />    
                </React.Fragment>
            ))}
        </div>
    );
};

export default AboutUs;
