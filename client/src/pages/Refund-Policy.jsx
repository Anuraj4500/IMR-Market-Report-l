import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';

const RefundPolicy = () => {
  const [refundData, setRefundData] = useState(null);
  const breadcrumbItems = [
    { label: 'Refund Policy' }
  ];

  useEffect(() => {
    const fetchRefundPolicy = async () => {
        try {
            const response = await axios.get('https://imr-market-report-l.onrender.com/api/refund-policy'); // Adjust the URL as needed
            setRefundData(response.data);
        } catch (error) {
            console.error('Error fetching refund policy:', error);
        }
    };

    fetchRefundPolicy();
}, []);
  

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section id="about" className="about">
        <div className="container mt-4" data-aos="fade-up">
          {refundData ? (
            <>
              {refundData.map((item) => (
                <div key={item.id}>
                  <div className="section-title"> 
                    <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
                  </div>
                  <div>
                    <div className='text-justify' dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No items available.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default RefundPolicy;