import React from 'react';
import { Link } from 'react-router-dom';
import thankYouImage from '../assets/Images/thank-you.png';

const ThankYou = () => (
  <section className="thank-you-page" style={{ padding: '50px 0' }}>
    <div className="container text-center" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center align-items-center">
        <div className="thank-you-content col-md-5">
          <div className="section-title">
            <h2>Thank<span> You! </span></h2>
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
          Thank you for your valuable inquiry. Our team will get back to you with report sample copy. In case of any queries or urgency, please <a href="/Contact-us" style={{ color: '#F96641', textDecoration: 'underline' }}>contact us</a> at sales@imrmarketreports.com
          </p>
          </div>
          <Link to="/" className="btn" style={{ padding: '10px 30px', fontSize: '1.1rem', borderRadius: '5px', backgroundColor: '#F96641', color: '#fff', border: 'none' }}>
            Go to Homepage
          </Link>
        </div>
        <div className="col-md-7">
          <img src={thankYouImage} alt="Thank You" style={{ width: '60%', height: 'auto' }} />
        </div>
      </div>
    </div>
  </section>
);

export default ThankYou;
