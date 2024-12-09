import React from 'react';
import { Link } from 'react-router-dom';

function Careercard() {
  return (
    <div className="">
      <div className="col-12 col-md-6 col-lg-4 mb-4">
        <div className="card shadow-sm">
          <div className="row no-gutters">
            <div className="col-4 text-center">
              <div className="badge-circle bg-primary text-center py-3">
                <span className="text-warning">We're Hiring</span>
              </div>
            </div>
            <div className="col-8">
              <div className="card-body">
                <h5 className="card-title1 animated-title">SEO Executive</h5>
                <p className="card-text fs-6">
                  <i className="fas fa-briefcase"></i> Full Time <br />
                  <i className="fas fa-map-marker-alt"></i> Pune
                </p>
                <Link to="/Career-details" className="custom-btn btn-10">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careercard;
