import React from "react";
import FooterLogo from '../assets/img/IMR_Market_Reports_-_Copy-removebg-preview.png';
import PaymentMethods from '../assets/Images/Footer.png';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <section className="footers pt-5 pb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4 footers-one">
              <div className="footers-logo">

                <img src={FooterLogo} alt="Logo" style={{ width: "220px" }} />
              </div>
              <div className="footers-info mt-3">
                <p>
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magni autem eum porro! Incidunt magnam eius veritatis minus soluta esse!
                  </div>
                  <br />
                  APAC Office: Office No. 403, Saudamini Commercial Complex,  Pune, India 411038

                  Phone: +91-81800-96367

                  Email:
                  <a href="mailto:info@imrmarketreports.com">info@imrmarketreports.com</a>
                  <br />
                  <div className="newsletter-section mt-4">
                    <form method="post" action="send_mail.com">
                      <h4 className="mb-0 text-white">Subscribe to our Newsletter</h4>
                      <input
                        type="email"
                        required
                        name="new_email"
                        placeholder="Enter your email address"
                        style={{ padding: "8px", width: "250px", margin: "10px 0" }}
                      />
                      <button type="submit" className="btn btn-primary" name="gws_newsletter" style={{ padding: "10px" }}>
                        Submit
                      </button>
                    </form>
                  </div>
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-5 footers-two">
              <h5 className="text-center" style={{ color: "white", paddingRight: "80px" }}>Industries</h5>
              <div className="row align-items-center justify-content-center">
                <div className="col-xs-12 col-sm-6 col-md-6 footers-two">
                  <ul className="list-unstyled">
                    <li className="mt-2"><Link to="/aerospace-defense">Aerospace & Defense</Link></li>
                    <li className="mt-2"><Link to="/agriculture">Agriculture</Link></li>
                    <li className="mt-2"><Link to="/automotive-transport">Automotive & Transport</Link></li>
                    <li className="mt-2"><Link to="/chemicals-materials">Chemicals & Materials</Link></li>
                    <li className="mt-2"><Link to="/consumer-goods">Consumer Goods</Link></li>
                    <li className="mt-2"><Link to="/electronics-semiconductor">Electronics & Semiconductor</Link></li>
                  </ul>
                </div>
                <div className="col-xs-12 col-sm-8 col-md-6 footers-three pt-0">
                  <ul className="list-unstyled">
                    <li className="mt-2"><Link to="/energy-natural-resource">Energy & Natural Resources</Link></li>
                    <li className="mt-2"><Link to="/food-beverage">Food & Beverage</Link></li>
                    <li className="mt-2"><Link to="/healthcare">Healthcare</Link></li>
                    <li className="mt-2"><Link to="/it-telecom">IT & Telecom</Link></li>
                    <li className="mt-2"><Link to="/manufacturing-construction">Manufacturing & Construction</Link></li>
                    <li className="mt-2"><Link to="/service-industry">Service Industry</Link></li>
                  </ul>
                </div>
              </div>
              <div className="social-menu">
                <span className="text-white">Follow us</span>
                <ul>
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 footers-five">
              <h5 className="text-center" style={{ color: "white", paddingRight: "80px" }}>Useful Links</h5>
              <div className="row align-items-center justify-content-center">

                <div className="col-xs-12 col-sm-6 col-md-6 footers-five">

                  <ul className="list-unstyled">
                    <li className="mt-2"><Link to="/home">Home</Link></li>
                    <li className="mt-2"><Link to="/about-us">About Us</Link></li>
                    <li className="mt-2"><Link to="/report-store">Report Store</Link></li>
                    <li className="mt-2"><Link to="/our-clients">Our Clients</Link></li>
                    <li className="mt-2"><Link to="/privacy-policy">Privacy Policy</Link></li>
                  </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 footers-six">
                  <ul className="list-unstyled">
                    <li className="mt-2"><Link to="/refundPolicy">Refund Policy</Link></li>
                    <li className="mt-2"><Link to="/contact-us">Contact Us</Link></li>
                    <li className="mt-2"><Link to="/TermsAndConditions">Terms & Conditions</Link></li>
                    <li className="mt-2"><Link to="/faq">FAQ</Link></li>
                    <li className="mt-2"><Link to="/Career">Career</Link></li>
                  </ul>
                </div>
              </div>
              <br></br>
              <br></br>
              
              <div className="col-12 col-lg-12">
                <h5 className="text-white pr-2">We Accept</h5>
                <div className="">
                  <img src={PaymentMethods} className="img-fluid pl-4" alt="payment methods" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="disclaimer border-top p-2">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-6">
              <div className="copyright-text ">
                <p className="" style={{ color: "white" }}>
                  <div> Designed and developed by &nbsp;
                    <a
                      href="https://imrtechsolutions.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: "white", fontWeight: "bold" }}
                    >
                      IMR Tech Solutions
                    </a>
                  </div>
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="copyright-text ">
                <p className="text-right" style={{ color: "white" }}>
                  <div>All Rights Reserved 2024 © IMR Market Reports </div>
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
};

export default Footer;

