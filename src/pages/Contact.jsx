import React from "react";
// import HeroSection from "../components/HeroSection";
import ContactHeroSection from "../components/ContactComponents/ContactHero";
// import MapSection from "../components/MapSection";
import MapSection from "../components/ContactComponents/Mapsection";
// import ContactForm from "../components/ContactForm";
import ContactForm from "../components/ContactComponents/Contactform";
// import Newsletter from "../components/Newsletter";
import ContactNewsletter from "../components/ContactComponents/contactNewsletter";
// import Footer from "../components/Footer";
// import ContactFooter from "../components/footer";
import Footer from "../components/footer";
import Header from "../components/header";
export default function ContactPage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{
        background: "#f0faf4",
        borderBottom: "1px solid #DEF9EC",
        padding: "12px 0",
      }}>
        {/* <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}>
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>🏠 Home</a>
            <span style={{ color: "#d1d5db" }}>›</span>
            <a href="#" style={{ color: "#6b7280", textDecoration: "none" }}>Pages</a>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#3BB77E", fontWeight: 600 }}>Contact</span>
          </nav>
        </div> */}
      </div>

      {/* Page Sections */}
      <Header/>
      <ContactHeroSection />
      <MapSection />
      <ContactForm />
      <ContactNewsletter />
      <Footer />
    </div>
  );
}