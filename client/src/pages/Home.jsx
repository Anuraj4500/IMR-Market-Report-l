import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import aboutus from '../assets/Images/test/Aboutus.svg';
import latest_reports from '../assets/Images/test/latestreports.svg';
import ExploreButton from '../components/Explore-button';
import ClientCarousel from '../components/Client-Carousel';
import Testimonials from '../components/Testimonials';
import OurServices from '../components/Our-services';
import axios from 'axios'; // Added axios
import { Link } from 'react-router-dom';
// ... existing code ...


function Home() {
  const [latestReports, setLatestReports] = useState([]);
  
  

  useEffect(() => {
    const fetchLatestReports = async () => {
      try {
        const response = await axios.get('https://imr-market-report-l.onrender.com/api/reports'); 
        console.log("Full response:", response); // Check full structure
        // Assuming the response data is structured like { data: { reports: [] } }
        const reports = Array.isArray(response.data) ? response.data : response.data.reports || [];
        setLatestReports(reports.slice(0, 4)); // Slice only if reports is an array
        console.log("Latest Reports State:", reports.slice(0, 4)); // Log the state after setting
      } catch (error) {
        console.error("Error fetching latest reports:", error);
      }
    };
  
    fetchLatestReports();
  }, []);
  
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <section id="intro" className="clearfix">
        <div className="container d-flex h-100">
          <div className="row align-self-center">
            <div className="col-md-5 intro-info order-md-first order-last">
              <h1>Design Your Business Strategies  With Our Market Research Reports</h1>
              <br />
              <ExploreButton name="Explore Market Reports" to="/reports-store" />
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about" className="about pb-0">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>About <span>Us</span></h2>
              <p>We are a technology-driven market research company with strategic analysis of more than 12 industrial verticals. We analyze extremely large sets of data to discover deeper insights and provide accurate consulting.</p>
            </div>
            <div className="row">
              <div className="col-lg-6" data-aos="fade-right">
                <img src={aboutus} alt="About us" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                <h3>IMR Market Reports an Innovative Market Research Company </h3>
                <p className="text-justify">
                  IMR Market Reports is a visionary market research company who is ready to assist their
                  clients to grow their business by offering strategies through our market research
                  reports for gaining success. We have a well experienced team, who work efficiently
                  and provides complete excellent research data in a complete sync to provide overall coverage and accurate market insights on various industries.The company excels in competitive benchmarking, recognizing its importance in market research. With extensive industry expertise, modern methodologies, and access to a vast global database, they deliver both off-the-shelf and customized research solutions.  We are more than just a market research firm; we are solution providers.
                </p>
                <ul>
                  <li><i className="icofont-check-circled"></i> We are complete solution providers.</li>
                  <li><i className="icofont-check-circled"></i> We help you in your business decisions.</li>
                  <li><i className="icofont-check-circled"></i> We known for quality with unique reports.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End About Us Section -->
        <!--Latest report code removed from here--> */}
        <section id="departments" className="departments pb-4 pt-3 position-relative">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Latest <span>Reports</span></h2>
              <p>Find our latest reports published. We have more than 5,00,000+ market research reports covering major industrial products.</p>
            </div>
            <div className="row justify-content-center align-items-center">

              <div className="col-md-12">
                <Slider {...settings} dots={false} arrows={false}>
                  {latestReports.map(report => (
                    <div className="px-2" key={report._id}>
                    <div className="report-slide"  style={{ padding: '30px'}}>
                      <h3><Link to={`/reports/${report.slug}`}>{report.keyword} Market</Link></h3>
                      <strong>{new Date(report.cdate).toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
                      <p className="text-justify" style={{ textAlign: 'justify' }}>
                        {report.summary.split(' ').slice(0, 20).join(' ') + (report.summary.split(' ').length > 30 ? '...' : '')}
                      </p>
                    </div>
                    </div>
                  ))}
  
                </Slider>
              </div>
              
            </div>
          </div>
        </section>
        <OurServices />
        {/* <!-- ======= Featured Services Section ======= --> */}
        <section id="featured-services" className="featured-services pb-4 pt-2">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Industry <span>Verticals</span></h2>
              <p>We are a global market research company, specialized in using big data and advanced analytics with strategic consulting covering more than 12 industrial verticals like Food and Beverages, Consumer Goods, Service Industry, Chemicals and Materials and etc.</p>
            </div>

            <div className="row align-items-center justify-content-center text-center">
              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i class="fas fa-fighter-jet"></i></div>
                    <h4 className="title"><a href="https://imrmarketreports.com/aerospace-defense">Aerospace &amp; Defense</a></h4>

                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0" style={{ width: '100%' }}>
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-tractor"></i></div>
                    <h4 className="title"><a href=" https://imrmarketreports.com/agricluture">Agriculture</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-truck"></i></div>
                    <h4 className="title"><a href="https://imrmarketreports.com/automotive-transport">Automotive &amp; Transport</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-flask"></i></div>
                    <h4 className="title"><a href=" https://www.imrmarketreports.com/chemicals-materials">Chemicals &amp; Materials</a></h4>
                  </div>
                </a>
              </div>

            </div>
            <br />
            <div className="row align-items-center justify-content-center text-center">
              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0" style={{ height: '160px' }}>
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                    <div className="icon"><i className="fas fa-shopping-cart"></i></div>
                    <h4 className="title"><a href="#">Consumer Goods</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-0 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="300" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-microchip"></i></div>
                    <h4 className="title"><a href="#">Electronics &amp; Semiconductors</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-solar-panel"></i></div>
                    <h4 className="title"><a href="#">Energy &amp; Natural Resources</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-apple-alt"></i></div>
                    <h4 className="title"><a href="#">Food &amp; Beverages</a></h4>
                  </div>
                </a>
              </div>

            </div>
            <br />
            <div className="row align-items-center justify-content-center text-center">
              <div className="col-lg-3 align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-heartbeat"></i></div>
                    <h4 className="title"><a href="#">Healthcare</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-calculator"></i></div>
                    <h4 className="title"><a href="#">IT &amp; Telecom</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-industry"></i></div>
                    <h4 className="title"><a href="#">Manufacturing &amp; Construction</a></h4>
                  </div>
                </a>
              </div>

              <div className="col-lg-3  align-items-stretch mb-5 mb-lg-0">
                <a href="#" style={{ cursor: 'pointer' }}>
                  <div className="icon-box" data-aos="fade-up" data-aos-delay="400" style={{ height: '160px' }}>
                    <div className="icon"><i className="fas fa-hotel"></i></div>
                    <h4 className="title"><a href="#">Service Industry</a></h4>
                  </div>
                </a>
              </div>

            </div>

          </div>
        </section>
        {/* <!-- End Featured Services Section -->
    
        {/* <!-- Testimonial Area start --> */}
        <Testimonials> </Testimonials>

        {/* <!-- Testimonial Section end --> */}

        <ClientCarousel> </ClientCarousel>
      </main>
    </div>
  )
}

export default Home
