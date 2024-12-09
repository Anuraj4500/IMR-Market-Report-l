import React from 'react';
import Careercard from '../components/CareerCard';
import Breadcrumb from '../components/Breadcrumb';
import career from '../assets/Images/career.png';

const breadcrumbItems = [
    { label: 'Career' }
];

function Career() {
    return (
        <>
                    <Breadcrumb items={breadcrumbItems} />
            <div className='container-fluid p-0'>
            <section className="container mt-0">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6">
                        <img src={career} className="img-fluid" alt="Career" />
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="ot-heading">
                            <span className="ms-4">Join Us</span>
                            <h2 className="main-heading text-dark">Shape the Future of Market Intelligence | Careers at IMR Market Reports </h2>
                            <p className="text-justify">
                            At IMR Market Reports, we don't just analyse markets we inspire progress. If you're driven by curiosity, fueled by innovation, and passionate about creating actionable insights, this is your destination. 
                            </p>
                        <h4 className="text-dark">Why Build Your Future with Us?</h4>
                        <ul>
                            <li>Trailblazing Opportunities: Be part of groundbreaking research that shapes global strategies.</li>
                            <li>Unleash Your Potential: Thrive in an environment that values growth, creativity, and bold ideas.</li>
                            <li>Impact Beyond Borders: Contribute to solutions influencing industries on a global scale.</li>
                        </ul>
                        
                        </div>
                    </div>
                </div>
                <div className="text-justify">
                <h4 className="text-dark">What Makes IMR Unique?</h4>
                        <p>We believe in limitless thinking, where data meets creativity and ideas become transformative solutions. At IMR, you’re not just an employee you’re an innovator, a collaborator, and a catalyst for change.</p>
                        <h4 className="text-dark">Your Journey Starts Here:</h4>
                        <ul>
                            <li>Visionary Roles: Drive the future of market research with cutting-edge projects.</li>
                            <li>Next-Gen Internships: Dive into the action and learn from the best minds in the industry.</li>
                        </ul>
                        <p>Are you ready to step beyond ordinary? Join IMR Market Reports and redefine what’s possible.</p>
                </div>
            </section>
            <div className='container mt-0'>
                <Careercard />
            </div>
        </div>
        </>
    );
}

export default Career;
