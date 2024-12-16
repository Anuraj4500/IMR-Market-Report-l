import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import HomeSEO from "./pages/HomeSEO";
import HomeAdd from "./pages/addhome";
import EditHome from "./pages/edithome";
import ManageHome from "./pages/ManageHome";
import ReportSEO from "./pages/ReportSEO";
import ManageReport from "./pages/ManageReport";
import ReportAdd from "./pages/ReportAdd";
import EditReport from "./pages/EditReport";
import Upload from "./pages/Upload";
import DuplicateChecker from "./pages/DuplicateChecker";
import OurServicesAdd from "./pages/our-servicesadd"; // Fixed casing
import ManageOurServices from "./pages/Manageourservices";
import EditOurServices from "./pages/editourservices";
import Login from "./pages/login"; // Fixed casing
import ManageTestimonials from "./pages/manage-testimonials"; // Fixed casing
import AddTestimonials from "./pages/addtestimonials"; // Fixed casing
import UpdateTestimonials from "./pages/edittestimonials"; // Fixed casing and import
import ManageCareer from "./pages/manage-career"; // Fixed casing
import AddCareer from "./pages/addcareer"; // Fixed casing
import EditCareer from "./pages/editcareer"; // Fixed casing
import ManageTerms from "./pages/manage-terms"; // Fixed casing
import AddTerms from "./pages/addterms"; // Fixed casing
import EditTerms from "./pages/editterms"; // Fixed casing
import ManageAbout from "./pages/ManageAbout"; // Fixed casing
import AboutAdd from "./pages/AboutAdd"; // Fixed casing
import EditAbout from "./pages/EditAbout"; // Fixed casing
import ManageClient from "./pages/ManageClient"; // Fixed casing
import ClientAdd from "./pages/ClientAdd"; // Fixed casing
import EditClient from "./pages/EditClient"; // Fixed casing
import Lead from "./pages/Lead"; // Fixed casing
import ManageWhychooseus from "./pages/ManageWhychooseus"; // Fixed casing
import WhychooseusAdd from "./pages/WhychooseusAdd"; // Fixed casing
import EditWhychooseus from "./pages/Editwhychooseus"; // Fixed casing
import ManageFaq from "./pages/ManageFaq"; // Fixed casing
import AddFaq from "./pages/FaqAdd"; // Fixed casing
import EditFaq from "./pages/EditFaq"; // Fixed casing
import ManageRegistration from "./pages/manage-registration"; // Fixed casing
import EditRegistration from "./pages/editregistration"; // Fixed casing
import AddRegistration from "./pages/addregistration"; // Fixed casing
import Dashboard from "./pages/dashboard"; // Fixed casing


import "./App.css";

// Dummy components for missing ones
const UserHeader = () => <div>User Header</div>;

// Guest Layout
const GuestLayout = ({ children }) => (
  <>
    <div className="content">{children}</div>
    <Footer />
  </>
);

// User Layout
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="content">{children}</div>
    <Footer />
  </>
);

const App = () => {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from Auth context

  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<GuestLayout><Login /></GuestLayout>} />
        <Route path="/login" element={<GuestLayout><Login /></GuestLayout>} />

        {/* User Routes */}
        {isLoggedIn ? (
          <>
          
            <Route path="/dashboard" element={<UserLayout><Dashboard /></UserLayout>} />
            <Route path="/add-home" element={<UserLayout><HomeAdd /></UserLayout>} />
            <Route path="/edit-home/:id" element={<UserLayout><EditHome /></UserLayout>} />
            <Route path="/manage-our-services" element={<UserLayout><ManageOurServices /></UserLayout>} />
            <Route path="/edit-our-services/:id" element={<UserLayout><EditOurServices /></UserLayout>} />
            <Route path="/manage-home" element={<UserLayout><ManageHome /></UserLayout>} />
            <Route path="/seo" element={<UserLayout><HomeSEO /></UserLayout>} />
            <Route path="/reports-seo" element={<UserLayout><ReportSEO /></UserLayout>} />
            <Route path="/manage-reports" element={<UserLayout><ManageReport /></UserLayout>} />
            <Route path="/report-add" element={<UserLayout><ReportAdd /></UserLayout>} />
            <Route path="/report-edit/:id" element={<UserLayout><EditReport /></UserLayout>} />
            <Route path="/our-servicesadd" element={<UserLayout><OurServicesAdd /></UserLayout>} />
            <Route path="/upload" element={<UserLayout><Upload /></UserLayout>} />
            <Route path="/duplicate-checker" element={<UserLayout><DuplicateChecker /></UserLayout>} />
            <Route path="/manage-testimonials" element={<UserLayout><ManageTestimonials /></UserLayout>} />
            <Route path="/add-testimonials" element={<UserLayout><AddTestimonials /></UserLayout>} />
            <Route path="/edit-testimonials/:id" element={<UserLayout><UpdateTestimonials /></UserLayout>} />
            <Route path="/manage-career" element={<UserLayout><ManageCareer /></UserLayout>} />
            <Route path="/add-career" element={<UserLayout><AddCareer /></UserLayout>} />
            <Route path="/edit-career/:id" element={<UserLayout><EditCareer /></UserLayout>} />
            <Route path="/manage-terms" element={<UserLayout><ManageTerms /></UserLayout>} />
            <Route path="/add-terms" element={<UserLayout><AddTerms /></UserLayout>} />
            <Route path="/edit-terms/:id" element={<UserLayout><EditTerms /></UserLayout>} />
            <Route path="/manage-about" element={<UserLayout><ManageAbout /></UserLayout>} />
            <Route path="/about-add" element={<UserLayout><AboutAdd /></UserLayout>} />
            <Route path="/edit-about/:id" element={<UserLayout><EditAbout /></UserLayout>} />
            <Route path="/manage-client" element={<UserLayout><ManageClient /></UserLayout>} />
            <Route path="/client-add" element={<UserLayout><ClientAdd /></UserLayout>} />
            <Route path="/client-edit/:id" element={<UserLayout><EditClient /></UserLayout>} />
            <Route path="/lead" element={<UserLayout><Lead /></UserLayout>} />
            <Route path="/manage-whychooseus" element={<UserLayout><ManageWhychooseus /></UserLayout>} />
            <Route path="/whychooseus-add" element={<UserLayout><WhychooseusAdd /></UserLayout>} />
            <Route path="/whychooseus-edit/:id" element={<UserLayout><EditWhychooseus /></UserLayout>} />
            <Route path="/manage-faq" element={<UserLayout><ManageFaq /></UserLayout>} />
            <Route path="/faq-add" element={<UserLayout><AddFaq /></UserLayout>} />
            <Route path="/faq-edit/:id" element={<UserLayout><EditFaq /></UserLayout>} />
            <Route path="/manage-registration" element={<UserLayout><ManageRegistration /></UserLayout>} />
            <Route path="/add-registration" element={<UserLayout><AddRegistration /></UserLayout>} />
            <Route path="/edit-registration/:id" element={<UserLayout><EditRegistration /></UserLayout>} />
          </>
        ) : (
          // Redirect to login if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
