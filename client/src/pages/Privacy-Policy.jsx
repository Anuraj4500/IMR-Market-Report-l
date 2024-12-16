import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState(null);
  const breadcrumbItems = [
    { label: 'Privacy Policy' }
  ];

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get('https://imr-market-report-l.onrender.com/api/privacypolicy');
        setPrivacyData(response.data);
      } catch (error) {
        console.error('Error fetching privacy policy:', error.response ? error.response.data : error.message);
      }
    };
    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section id="about" className="about">
        <div className="container mt-4" data-aos="fade-up">
          {privacyData ? (
            <>
              {privacyData.map((item) => (
                <div key={item.id}>
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
              ))}
            </>
          ) : (
              <p>No items available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
