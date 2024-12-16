import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';

const TermsAndConditions = () => {
    const [termsData, setTermsData] = useState(null);
    const breadcrumbItems = [
        { label: 'Terms And Conditions' }
    ];

    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const response = await axios.get('https://imr-market-report-l.onrender.com/api/terms'); // Adjust the URL as needed
                setTermsData(response.data);
            } catch (error) {
                console.error('Error fetching terms data:', error);
            }
        };

        fetchTermsData();
    }, []);

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <section id="about" className="about">
            {termsData ? termsData.map((item) => (
                <div className="container mt-4" data-aos="fade-up" key={item.id}>
                    <div className="section-title">
                        <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
                    </div>
                    <div>
                        {item.content ? (
                            <div className='text-justify' dangerouslySetInnerHTML={{ __html: item.content }} />
                        ) : (
                            <p>Loading...</p>
                        )}
                        </div>
                    </div>
                )) : (
                <p>Loading terms data...</p>
            )}
            </section>
        </div>
    );
}

export default TermsAndConditions;