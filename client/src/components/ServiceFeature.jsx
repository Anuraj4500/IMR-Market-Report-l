import React from 'react';

function ServiceFeature() {
  return (
    <div className="container-fluid p-0">
    
        <div className="card license">
          <div className="card-header style-card-header">
            Service Features
          </div>
          <div className="card-body">
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-lock"></i>
                <strong> Data Privacy:</strong> Adhering to GDPR and CCPA for secure data protection.
              </li>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-headset"></i>
                <strong> 24/4 Support:</strong> Expert assistance available around the clock.
              </li>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-clock"></i>
                <strong> On-Time Delivery:</strong> Timely insights and reports to keep you on track.
              </li>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-user-md"></i>
                <strong> Analyst Access:</strong> Direct support for strategic questions and insights.
              </li>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-cogs"></i>
                <strong> Innovative & Custom Solutions:</strong> Tailored strategies that drive growth and efficiency.
              </li>
              <li className="list-group-item" style={{ paddingLeft: '0', padding:'12px 0px', fontSize: '.9em', color: '#4f6a7d', fontWeight: 'normal' }}>
              <i className="fa fa-check-circle"></i>
                <strong> Unmatched Analytical Precision:</strong> Providing top-tier accuracy in our reports to enhance your strategic decision-making.
              </li>
            </ul>
          </div>
        </div>
      </div>

  );
}

export default ServiceFeature;
