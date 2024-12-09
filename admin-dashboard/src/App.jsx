import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeSEO from './pages/HomeSEO';
// import Footer from './components/Footer'; 
import HomeAdd from './pages/HomeAdd';
import ManageHome from './pages/ManageHome';
import AboutAdd from './pages/AboutAdd';
import AboutSEO from './pages/AboutSEO';
import ManageAbout from './pages/ManageAbout';
import ReportSEO from './pages/ReportSEO';
import ManageReport from './pages/ManageReport';
import ReportAdd from './pages/ReportAdd';
import EditReport from './pages/EditReport';
import Upload from './pages/Upload';
import DuplicateChecker from './pages/DuplicateChecker';
import OurServicesAdd from './pages/our-servicesadd';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <div className="content">
          <Routes>
            <Route path="/home-add" element={<HomeAdd/>} />
            <Route path="/manage-home" element={<ManageHome/>} />
            <Route path="/seo" element={<HomeSEO/>} />
            <Route path="/about-seo" element={<AboutSEO/>} />
            <Route path="/manage-about" element={<ManageAbout />} />
            <Route path="/about-add" element={<AboutAdd />} />
            <Route path="/reports-seo" element={<ReportSEO />} />
            <Route path="/manage-reports" element={<ManageReport />} />
            <Route path="/report-add" element={<ReportAdd />} />
            <Route path="/report-edit/:id" element={<EditReport />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/duplicate-checker" element={<DuplicateChecker />} />
            <Route path="/our-servicesadd" element={<OurServicesAdd />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
