import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/IMRLogo.png"

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      {/* Header */}
      <header className="page-header row position-fixed">
        <div className="logo-wrapper d-flex align-items-center col-auto">
         
          <a className="close-btn toggle-sidebar" href="#">
            <i className="fas fa-th-large"></i>
          </a>
        </div>
        <div className="page-main-header col">
          <div className="header-left">
            <form className="form-inline search-full col" action="#" method="get">
              <div className="form-group w-100">
                <div className="Typeahead Typeahead--twitterUsers">
                  <div className="u-posRelative">
                    <input
                      className="demo-input Typeahead-input form-control-plaintext w-100"
                      type="text"
                      placeholder="Search Admiro .."
                      name="q"
                      title=""
                      autoFocus
                    />
                    <div className="spinner-border Typeahead-spinner" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <i className="close-search" data-feather="x"></i>
                  </div>
                  <div className="Typeahead-menu"></div>
                </div>
              </div>
            </form>
          </div>
          <div className="nav-right">
            <ul className="header-right">
              <div className="user-wrap">
                <div className="user-img">
                  <img src="../assets/images/profile.png" alt="user" />
                </div>
                <div className="user-content">
                  <p className="mb-0">
                    Admin <i className="fa-solid fa-chevron-down"></i>
                  </p>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="page-sidebar">
        <div className="left-arrow" id="left-arrow">
          <i data-feather="arrow-left"></i>
        </div>
        <div className="main-sidebar mt-3" id="main-sidebar">
        <a href="index.html">
            <img className="light-logo img-fluid" src={logo} alt="logo" />
            {/* <img className="dark-logo img-fluid" src="../Images/AI-light.png" alt="logo" /> */}
          </a>
          <ul className="sidebar-menu" id="simple-bar">
            <li className="sidebar-list">
              <i className="fa-solid fa-thumbtack"></i>
              <a className="sidebar-link" href="#">
                <h6>Dashboards</h6>
              </a>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownLead"
                role="button"
                onClick={() => toggleDropdown('lead')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'lead'}
              >
                <i className="fas fa-envelope"></i>
                <h6>Lead</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'lead' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownLead">
                <li><Link to="/lead">Lead</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownHome"
                role="button"
                onClick={() => toggleDropdown('home')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'home'}
              >
                <i className="fas fa-home"></i>
                <h6>Home</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'home' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownHome">
                <li><Link to="/manage-home">Manage Home</Link></li>
                <li><Link to="/manage-testimonials">Manage Testimonials</Link></li>
                <li><Link to="/seo">Home SEO</Link></li>
              </ul>
            </li>
            <li className= "sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownAbout"
                role="button"
                onClick={() => toggleDropdown('about')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'about'}
              >
                <i className="fas fa-info-circle"></i>
                <h6>About</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'about' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownAbout">
                <li><Link to="/manage-about">Manage About</Link></li>
                <li><Link to="/about-seo">About SEO</Link></li>
              </ul>
            </li>
            <li className= "sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownReport"
                role="button"
                onClick={() => toggleDropdown('reports')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'reports'}
              >
                <i className="fas fa-file-alt"></i>
                <h6>Reports</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'reports' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownReport">
                <li><Link to="/manage-reports">Manage Reports</Link></li>
                <li><Link to="/reports-seo">Reports SEO</Link></li>
                <li><Link to="/upload">Upload Excel</Link></li>
                <li><Link to="/duplicate-checker">Duplicate Checker</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownOurServices"
                role="button"
                onClick={() => toggleDropdown('ourservices')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'ourservices'}
              >
                <i className="fas fa-cogs"></i>
                <h6>Our Services</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'ourservices' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownOurServices">

                <li><Link to="/our-servicesadd">Add Our Service</Link></li>
                <li><Link to="/manage-our-services">Manage Our Services</Link></li>
                <li><Link to="/edit-our-services/:id">Edit Our Services</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownFaq"
                role="button"
                onClick={() => toggleDropdown('faq')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'faq'}
              >
                <i className="fas fa-question-circle"></i>
                <h6>FAQ</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'faq' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownFaq">
                <li><Link to="/manage-faq">Manage FAQ</Link></li>
                <li><Link to="/faq-seo">FAQ SEO</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownCareer"
                role="button"
                onClick={() => toggleDropdown('career')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'career'}
              >
                <i className="fas fa-briefcase"></i>
                <h6>Career</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'career' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownCareer">
                <li><Link to="/manage-career">Manage Career</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownTerms"
                role="button"
                onClick={() => toggleDropdown('terms')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'terms'}
              >
                <i className="fas fa-file-alt"></i>
                <h6>Terms</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'terms' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownTerms">
                <li><Link to="/manage-terms">Manage Terms</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownOurClients"
                role="button"
                onClick={() => toggleDropdown('ourclients')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'ourclients'}
              >
                <i className="fas fa-users"></i>
                <h6>Our Clients</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'ourclients' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownOurClients">
                <li><Link to="/manage-client">Manage Client</Link></li>
              </ul>
            </li>
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownWhychooseus"
                role="button"
                onClick={() => toggleDropdown('whychooseus')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'whychooseus'}
              >
                <i className="fas fa-star"></i>
                <h6>Why Choose Us</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'whychooseus' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownWhychooseus">
                <li><Link to="/manage-whychooseus">Manage Why Choose Us</Link></li>
              </ul>
            </li>
            
            <li className="sidebar-list">
              <a
                className="sidebar-link"
                href="#"
                id="navbarDropdownAboutUs"
                role="button"
                onClick={() => toggleDropdown('aboutus')}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'aboutus'}
              >
                <i className="fas fa-user"></i>
                <h6>About Us</h6>
              </a>
              <ul className={`sidebar-submenu ${openDropdown === 'aboutus' ? 'active' : 'd-none'}`}
                aria-labelledby="navbarDropdownAboutUs">
                <li><Link to="/manage-about">Manage About</Link></li>
              </ul>
            </li>

          </ul>


        </div>
        <div className="right-arrow" id="right-arrow">
          <i data-feather="arrow-right"></i>
        </div>
      </aside>



  
    </div>
  );
}

export default Navbar;
