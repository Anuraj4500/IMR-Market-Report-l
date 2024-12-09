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
