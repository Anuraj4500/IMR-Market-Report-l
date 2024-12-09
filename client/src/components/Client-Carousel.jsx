import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import clientA from '../assets/Images/test/Clients/a.png';
import clientB1 from '../assets/Images/test/Clients/b1.png';
import clientC from '../assets/Images/test/Clients/c.png';
import clientD from '../assets/Images/test/Clients/d.png';
import clientE from '../assets/Images/test/Clients/e.png';
import clientF2 from '../assets/Images/test/Clients/f2.png';
import clientG from '../assets/Images/test/Clients/g.png';
import clientH from '../assets/Images/test/Clients/h.png';
import clientI from '../assets/Images/test/Clients/i.png';
import clientJ from '../assets/Images/test/Clients/j.png';
import clientK from '../assets/Images/test/Clients/k.png';
import clientL from '../assets/Images/test/Clients/l.png';
import clientM from '../assets/Images/test/Clients/m.png';

function ClientCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="client-logo-area-two pt-2 pb-0  bgp-center services-section" style={{ backgroundImage: 'url(../assets/Images/test/Clients/circle.png)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center p-4 pt-0">
            <div className="section-title">
              <h2>Our <span>Clients</span></h2>
              <p>Trusted by Clients across the world</p>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {[clientA, clientB1, clientC, clientD, clientE, clientF2, clientG, clientH, clientI, clientJ, clientK, clientL, clientM].map((client, index) => (
            <div key={index} className="client-logo-item style-three" data-aos="fade-up" data-aos-delay={`${200 * (index + 1)}`} data-aos-duration="1000" data-aos-offset="50">
              <a href="#"><img src={client} className="img-fluid" alt="Client Logo" /></a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ClientCarousel;
