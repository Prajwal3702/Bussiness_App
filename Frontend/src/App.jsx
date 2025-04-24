import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton"; // Import the WhatsApp button
import { VideoPopup } from "../src/components/VideoPopup"; // Import the VideoPopup component
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component

// Import pages
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Certification from "./pages/Certification";
import Gallery from "./pages/Gallery";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import PageLoader from "./components/PageLoader";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageLoader>
      <div className="bg-white min-h-screen flex flex-col">
        <NavbarComponent />
        <main className="flex-grow pt-20">
          {/* Padding for floating navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
          {/* Add the VideoPopup component */}
          <VideoPopup />
        {/* WhatsApp Button - appears on all pages */}
        <WhatsAppButton 
          phoneNumber="+919922990829" 
          message="Hello! I'm interested in your products. Can you provide more information?" 
        />
      </div>
      </PageLoader>
    </Router>
  );
}

export default App;