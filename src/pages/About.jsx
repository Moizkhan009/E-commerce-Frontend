import React, { useEffect } from "react";
import WelcomeSection from "../components/AboutComponents/Welcomesection";
import WhatWeProvide from "../components/AboutComponents/Whatweprovide";
import PartnerSection from "../components/AboutComponents/Partnersection";
import InfoCards from "../components/AboutComponents/Infocards";
import StatsSection from "../components/AboutComponents/Statssection";
import TeamSection from "../components/AboutComponents/Teamsection";
import NewsletterSection from "../components/AboutComponents/Newslettersection";
import Header from "../components/header";
const Aboutpage = () =>{
return(
    <div>

  <Header/>
 <WelcomeSection />
     <WhatWeProvide />
       <PartnerSection />
     <InfoCards />
      <StatsSection />
       <TeamSection />
     <NewsletterSection />


    </div>
)


}
export default Aboutpage
// const AboutPage = () => {
//   useEffect(() => {
//     // Load Google Fonts
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap";
//     document.head.appendChild(link);

//     // Reset body styles
//     document.body.style.margin = "0";
//     document.body.style.fontFamily = "'DM Sans', sans-serif";
//     document.body.style.background = "#fff";
//   }, []);

//   return (
//     <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
//       {/* Breadcrumb */}
//       <div style={{ background: "#F4F6FA", padding: "12px 80px", fontSize: 13, color: "#888" }}>
//         🏠 Home /{" "}
//         <span style={{ color: "#555" }}>Pages</span> /{" "}
//         <span style={{ color: "#3BB77E", fontWeight: 600 }}>About Us</span>
//       </div>

//       {/* Page Sections */}
//       <WelcomeSection />
//       <WhatWeProvide />
//       <PartnerSection />
//       <InfoCards />
//       <StatsSection />
//       <TeamSection />
//       <NewsletterSection />
//     </div>
//   );
// };

// export default AboutPage;