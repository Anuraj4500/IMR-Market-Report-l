import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch testimonials data from the backend
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://imr-market-report-l.onrender.com/api/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <div className="slick-next">Next</div>,
    prevArrow: <div className="slick-prev">Prev</div>,
  };

  return (
    <section id="testimonials" className="testimonials pb-2">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Testimonials</h2>
          <p>We have served more than 500 fortune companies since 2019. We support our customer till their last query.</p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-item" key={index}>
              <p>
                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                {testimonial.desc}
                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
              <h3>{testimonial.designation}</h3>
              <h4>{testimonial.sector}</h4>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
