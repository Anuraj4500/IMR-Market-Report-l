import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WhyChooseUs = () => {
  const [whyChooseUsData, setWhyChooseUsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchWhyChooseUsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/whychooseus');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setWhyChooseUsData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to fetch data. Please check the API endpoint and try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUsData();
  }, []);

  // Show loading or error message if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if whyChooseUsData is available before rendering
  if (!whyChooseUsData || whyChooseUsData.length === 0) return <div>No data available</div>;

  return (
    <div>
      <section id="why-choose-us" className="counts">
        <div className="container">
          <div className="section-title">
            <h2>
              <span>WHY CHOOSE US</span>
            </h2>
          </div>
          <p>
            We are a global market research firm that uses big data and advanced analytics, combined with strategic
            consulting, to help our clients understand and adapt to upcoming market trends. Our experts in market
            research help our clients gain insights from historical and current market conditions, giving them a
            complete understanding of future market dynamics.
          </p>
          <div className="card">
            <div className="card-body">
              <Slider {...settings}>
                {whyChooseUsData.map((item, index) => (
                  <div key={index}>
                    <div className="row justify-content-center align-items-center">
                      <div className="col-md-4">
                        <h3>{item.title}</h3>
                        <hr />
                        <p className="text-justify">{item.content.replace(/<[^>]+>/g, '')}</p>
                      </div>
                      <div className="col-md-8 counts-img">
                        <img src={require(`../assets/storage/categories_images/${item.image}`)} style={{ width: '100%' }} alt="Why Choose Us" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
