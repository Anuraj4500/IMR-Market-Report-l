import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonials() {
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
          <p>We have served more than 500 fortune companies since 2019. We support our customer till their last query. </p>
        </div>

        <Slider {...settings}>
          <div className="testimonial-item">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              IMR Market Reports team quickly grasped our requirements & customized the study as per our needs. They were open to accommodate few changes beyond agreed scope to improve the quality of the study. Well organized data and very good presentation of the final report, helped to derive insights easily.
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <h3>VP</h3>
            <h4>Food and Beverages Sector</h4>
          </div>

          <div className="testimonial-item">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              Thank you very much for your interest, appreciated. We were very satisfied with the services rendered by IMR Market Reports. Therefore, should we be in need again, we’d for sure, count on you. 
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <h3>Managing Director</h3>
            <h4>Chemicals Sector</h4>
          </div>

          <div className="testimonial-item">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              I had a great experience with IMR Market Reports team. They were very quick to respond to my inquiry. The package I finally purchased was different from what I first intended. The clear and prompt information I received helped me in finalizing and purchasing this package that would suit my requirements perfectly. It was a great, quick process to get the information I needed. 
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <h3>Strategic Consultant </h3>
            <h4>Business Consulting Sector</h4>
          </div>

          <div className="testimonial-item">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim
              dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
           
            <h3>Matt Brandon</h3>
            <h4>Freelancer</h4>
          </div>
          <div className="testimonial-item">
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa
              labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <h3>John Larson</h3>
            <h4>Entrepreneur</h4>
          </div>
        </Slider>

      </div>
    </section>
    );
  }
  
  export default Testimonials;
  
