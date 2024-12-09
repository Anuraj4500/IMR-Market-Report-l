import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import ReportStore from './pages/reports-store';
import Reports from './pages/reports';
import AboutUs from './pages/About-us';
import OurClient from './pages/Our-Client';
import Faq from './pages/Faq';  // Ensure this is the correct path for Faq
import ContactUs from './pages/Contact-us';  // Import the ContactUs component correctly
import PrivacyPolicy from './pages/Privacy-Policy';
import Careerdetails from './pages/Career-details';
import Career from './pages/Career';
import Checkout from './pages/Checkout';
import SampleRequest from './pages/SampleRequest';
import Industryreports from './pages/Industry-reports';
import ManufacturingConstruction from './pages/manufacturing-construction';
import ChemicalsMaterials from './pages/chemicals-materials';
import TermsAndConditions from './pages/Terms-and-Conditions';
import RefundPolicy from './pages/Refund-Policy';
import Agriculture from './pages/agriculture';
import ConsumerGoods from './pages/consumer-goods';
import ElectronicsSemiconductors from './pages/electronics-semiconductors';
import EnergyNaturalResource from './pages/energy-natural-resource';
import Healthcare from './pages/healthcare';
import ITTelecom from './pages/it-telecom';
import FoodBeverages from './pages/food-beverages';
import ServiceIndustry from './pages/service-industry';
import AutomotiveTransport from './pages/automotive-transport';
import AerospaceDefense from './pages/aerospace-defense';
import Search from './pages/Search';
import OurServices from './pages/Our-Services';
import AskDiscount from './pages/Ask-Discount';
import Thankyou from './pages/ThankYou';
import CheckoutPage from './pages/Checkout';

import './App.css';
import './App1.css';
import './report-style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Fixed Navbar */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports-store" element={<ReportStore />} />
            <Route path="/reports/:url" element={<Reports />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-client" element={<OurClient />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact-us" element={<ContactUs />} /> 
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/Career-details" element={<Careerdetails />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/Checkout/:slug" element={<Checkout />} />
            <Route path="/SampleRequest/:slug" element={<SampleRequest />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/RefundPolicy" element={<RefundPolicy />} />
            <Route path="/Industry-reports/:slug" element={<Industryreports />} />
            <Route path="/Manufacturing-Construction" element={<ManufacturingConstruction />} />
            <Route path="/Chemicals-Materials" element={<ChemicalsMaterials />} />
            <Route path="/Agriculture" element={<Agriculture />} />
            <Route path="/Consumer-Goods" element={<ConsumerGoods />} />
            <Route path="/Electronics-Semiconductors" element={<ElectronicsSemiconductors />} />
            <Route path="/Energy-Natural-Resource" element={<EnergyNaturalResource />} />
            <Route path="/Healthcare" element={<Healthcare />} />
            <Route path="/IT-Telecom" element={<ITTelecom />} />
            <Route path="/Food-Beverages" element={<FoodBeverages />} />
            <Route path="/Service-Industry" element={<ServiceIndustry />} />
            <Route path="/Automotive-Transport" element={<AutomotiveTransport />} />
            <Route path="/Aerospace-Defense" element={<AerospaceDefense />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Our-Services" element={<OurServices />} />
            <Route path="/Ask-Discount/:slug" element={<AskDiscount />} />
            <Route path="/thank-you" element={<Thankyou />} />
            <Route path="/Checkout/:slug" element={<CheckoutPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
