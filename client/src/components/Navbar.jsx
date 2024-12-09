import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 
const NavMenu = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/category`);
        console.log('Fetched categories:', response.data); // Log the fetched data
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.'); // Set error message
      }
    };
 
    fetchCategory();
  }, []);
 
  const openSearch = () => {
    document.getElementById('myOverlay').style.display = 'block';
  };
 
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page on every route change
    window.scrollTo(0, 0);
  }, [location]);
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Replace spaces with plus signs
      const formattedQuery = searchQuery.trim().replace(/\s+/g, '+');
      navigate(`/search?q=${formattedQuery}`);
      document.getElementById('myOverlay').style.display = 'none';
      setSearchQuery('');
    }
  };
 
  return (
    <>
      <div id="topbar" className="d-none d-lg-flex align-items-center fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a href="mailto:info@imrmarketreports.com"><i className="icofont-email"></i> Email Us</a> &nbsp; | &nbsp;<span> <a
                href="skype:live:.cid.6c0df9411dcbe948?chat"><i className="icofont-skype"></i> Skype</a></span>
          </div>
          <div className="d-flex align-items-center">
            <i className="icofont-phone"></i> Call us now &nbsp;<a href="">+91-81800-96367</a>
          </div>
        </div>
      </div>
 
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
 
          <a href="#" className="logo mr-auto"><img src="https://www.imrmarketreports.com/assets/img/test/IMRLogo.png"
              alt="IMR Market Reports" style={{ width: '100%', height: '100%' }} /></a>
          {/* Uncomment below if you prefer to use an image logo */}
          {/* <h1 className="logo mr-auto"><a href="index.html">Medicio</a></h1> */}
 
          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li className="drop-down"><Link to="/About-us">About Us</Link>
                <ul>
                  <li><Link to="/About-us">Our Company</Link></li>
                  <li><Link to="/Our-Client">Our Clients</Link></li>
                  <li><Link to="/Career">Career</Link></li>
                </ul>
              </li>
              <li><Link to="/reports-store">Reports Store</Link></li>
 
              <li className="drop-down"><Link to="/a">Industries</Link>
              <ul>
                        {category.map(category => (
              <li key={category._id}>
                <Link to = {`/${category.slug}/`}>
                  {category.title}
                </Link>
              </li>
            ))}
                        </ul>
               
              </li>
              {/* <li><Link to="/publishers">Publishers</Link></li> */}
              
              <li><Link to="/Our-Services">Our Services</Link></li>
              <li><Link to="/Contact-us">Contact</Link></li>
              <li><button className="openBtn" onClick={openSearch}><i className="fas fa-search"></i></button></li>
 
            </ul>
          </nav>
          {/* <!-- .nav-menu --> */}
 
        </div>
      </header>
      {/* <!-- End Header --> */}
 
      <div id="myOverlay" className="overlay">
        <span className="closebtn" onClick={() => document.getElementById('myOverlay').style.display = 'none'} title="Close Overlay">×</span>
 
        <div className="overlay-content">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="overlay-form"
              placeholder="Search For Market Reports / Keywords"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"><i className="bx bx-search"></i></button><br />
          </form>
        </div>
      </div>
    </>
  );
};
 
export default NavMenu;
 
 