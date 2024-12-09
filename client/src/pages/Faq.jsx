// src/FAQ.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/faqs');
        setFaqs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const breadcrumbItems = [
    { label: 'FAQ' }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Breadcrumb items={breadcrumbItems} />
    <section id="about" className="about pt-2">
      
        <div className="container mt-4" data-aos="fade-up">
            <div className="section-title pb-0">
                <h2>Frequently Asked <span>Questions</span></h2>
            </div>

            <div className="accordion" id="accordionExample">
                {faqs.map((faq) => (
                    <div key={faq.id} className="card">
                        <div className="card-header" id={`heading${faq.id}`}>
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${faq.id}`} aria-expanded="true" aria-controls={`collapse${faq.id}`}>
                                    {faq.que}
                                </button>
                            </h2>
                        </div>

                        <div id={`collapse${faq.id}`} className="collapse" aria-labelledby={`heading${faq.id}`} data-parent="#accordionExample">
                            <div className="card-body">
                                {faq.ans.replace(/<[^>]+>/g, '')}
                            </div>
                        </div>
                    </div>
                ))}
                {faqs.length === 0 && <p>No FAQs available.</p>}
            </div>
        </div>
    </section>
    </>
  );
};

export default FAQ;
