import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const CareerDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    file: null,
    captcha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/careerform';

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobile', formData.mobile);
    formDataToSend.append('file', formData.file);
    formDataToSend.append('captcha', formData.captcha);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Your application has been submitted successfully!');
      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    }
    setIsSubmitting(false);
  };

  const breadcrumbItems = [{ label: 'Career Details' }];

  return (
    <div className='container-fluid p-0'>
      <Breadcrumb items={breadcrumbItems} />
      
      <div
        className="job-application-page"
        style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}
      >
        {/* Job Description Section */}
        <div
          className="job-description"
          style={{
            flex: '2',
            backgroundColor: '#f7f9fc',
            padding: '20px',
            border: '1px solid #e0e0e0',
          }}
        >
          <div className="job-description" style={{ flex: '2', backgroundColor: '#f7f9fc', padding: '20px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ color: '#1b365d' }}>Job Description:</h3>
          <table class="custom-table">
    <tr>
        <td><strong>Experience</strong></td>
        <td>0.6 - 1.5 yrs</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td><strong>Fresher Allowed</strong></td>
        <td>Yes</td>
        <td><strong>Location</strong></td>
        <td>Pune</td>
    </tr>
</table>

          <h4 className='mt-4' style={{ color: '#1b365d' }}>Job Functions / Responsibilities:</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Multitasking abilities with primary focus on sales / business development</li>
            <li>Targeting new business development in new and existing markets</li>
            <li>The person will have specific sales targets as key performance indicators</li>
            <li>Pipeline management and constant interaction with the business heads</li>
            <li>Build relationships to up-sell and cross-sell</li>
            <li>Develop and maintain Strategic Alliances</li>
            <li>Development of new clients</li>
            <li>Negotiate and close business dealings</li>
            <li>Retain existing customers</li>
          </ul>
          <h4 style={{ color: '#1b365d' }}>The ideal candidate should be:</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>A highly motivated individual to augment our aggressive growth plans</li>
            <li>Should possess excellent verbal and written communication skills</li>
            <li>Passion for sales and an unyielding drive to succeed in an international selling environment</li>
            <li>Should be a good team player with multitasking abilities</li>
            <li>Graduates / Post Graduates with 1-3 years of experience in B2B selling globally preferred</li>
          </ul>
          <p><strong>Note:</strong> Send your resume to the following email address. HR will call you if your resume is shortlisted.</p>
          <p><strong>Email:</strong> <a href="mailto:career@imrmarketreport.com">career@imrmarketreport.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+918180096367">+91-81800-96367</a></p>

        </div>
        </div>

        {/* Resume Form Section */}
        <div
          className="form-container"
          style={{
            flex: '1',
            backgroundColor: '#f7f9fc',
            border: '1px solid #e0e0e0',
          }}
        >
          <div
            className="form-header"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              background: '#fa6742',
              padding: '10px',
            }}
          >
            Submit Your Resume
          </div>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ padding: '0 10px' }}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label htmlFor="resume">Attach Your Resume (.DOC, .DOCX, .PDF)</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".doc,.docx,.pdf"
              onChange={handleFileChange}
              required
              style={inputStyle}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div className="captcha" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                7852
              </div>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                placeholder="Captcha"
                required
                style={inputStyle}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#fa6742',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default CareerDetails;
