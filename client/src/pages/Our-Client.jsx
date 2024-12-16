import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';

const OurClient = () => {
    const [clients, setClients] = useState([]);
    const [refundData, setRefundData] = useState(null);
    const breadcrumbItems = [
      { label: 'Our Clients' }
    ];
    useEffect(() => {
        const fetchClients = async () => {
            try {
                console.log('Starting fetch request...');
                const response = await axios.get('https://imr-market-report-l.onrender.com/api/clients');
                console.log('Response:', response.data);
                if (response.data.length === 0) {
                    console.log('No clients data received');
                }
                setClients(response.data);
            } catch (error) {
                console.error('Error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
            }
        };
        fetchClients();
    }, []);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="container-fluid p-0">
                <section className="client-logo-area-two pt-0 rpt-70 pb-2 rpb-60 bgp-center services-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center p-4 pt-0">
                            <div className="section-title">
                                <div dangerouslySetInnerHTML={{ __html: clients[0]?.title || 'Our Clients' }} />
                                <p>{clients[0]?.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        {clients.map((client, index) => (
                            <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-6">
                                <div className="client-logo-item style-three" data-aos="fade-up" data-aos-delay={200 * index} data-aos-duration="1000" data-aos-offset="50">
                                    <a href="#">
                                        <img src={`https://imr-market-report-l.onrender.com/uploads/${client.image}`} className="img-fluid" alt={client.title} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </div>
        </>
    );
};

export default OurClient;
