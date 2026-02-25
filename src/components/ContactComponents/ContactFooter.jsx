// import React from "react";

// const FOOTER_COLS = [
//   {
//     title: "Company",
//     links: ["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us", "Support Center", "Careers"],
//   },
//   {
//     title: "Account",
//     links: ["Sign In", "View Cart", "My Wishlist", "Track My Order", "Help Ticket", "Shipping Details", "Compare products"],
//   },
//   {
//     title: "Corporate",
//     links: ["Become a Vendor", "Affiliate Program", "Farm Business", "Farm Careers", "Our Suppliers", "Accessibility", "Promotions"],
//   },
//   {
//     title: "Popular",
//     links: ["Milk & Flavoured Milk", "Butter and Margarine", "Eggs Substitutes", "Marmalades", "Sour Cream and Dips", "Tea & Kombucha", "Cheese"],
//   },
// ];

// export default function Footer() {
//   return (
//     <footer style={{ background: "#111827", color: "rgba(255,255,255,0.55)" }}>
//       {/* Main footer */}
//       <div style={{ padding: "64px 0 48px" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "260px repeat(4, 1fr) 180px",
//             gap: "32px",
//           }}>

//             {/* Brand */}
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
//                 <div style={{
//                   width: "42px", height: "42px",
//                   background: "rgba(59,183,126,0.15)",
//                   borderRadius: "12px",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: "1.3rem",
//                 }}>
//                   🌿
//                 </div>
//                 <div>
//                   <div style={{ fontFamily: "'Georgia', serif", fontSize: "1.3rem", fontWeight: 700, color: "white", lineHeight: 1 }}>
//                     Nest
//                   </div>
//                   <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
//                     MART & GROCERY
//                   </div>
//                 </div>
//               </div>

//               <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
//                 Awesome grocery store website template. Fresh products delivered daily.
//               </p>

//               {[
//                 { icon: "📍", text: "5171 W Campbell Ave, Kent, Utah 53127 USA" },
//                 { icon: "📞", text: "(+91) 540-025-124553" },
//                 { icon: "✉️", text: "sale@Nest.com" },
//                 { icon: "🕐", text: "10:00 – 18:00, Mon - Sat" },
//               ].map((item, i) => (
//                 <div key={i} style={{
//                   display: "flex", alignItems: "flex-start", gap: "8px",
//                   fontSize: "0.78rem", lineHeight: 1.5, marginBottom: "8px",
//                 }}>
//                   <span style={{ flexShrink: 0 }}>{item.icon}</span>
//                   <span>{item.text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Link columns */}
//             {FOOTER_COLS.map((col) => (
//               <div key={col.title}>
//                 <h4 style={{
//                   fontSize: "0.75rem",
//                   fontWeight: 700,
//                   color: "white",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.08em",
//                   marginBottom: "20px",
//                   paddingBottom: "10px",
//                   borderBottom: "1px solid rgba(255,255,255,0.08)",
//                   fontFamily: "inherit",
//                 }}>
//                   {col.title}
//                 </h4>
//                 <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                   {col.links.map((link) => (
//                     <li key={link} style={{ marginBottom: "8px" }}>
//                       <a
//                         href="#"
//                         style={{
//                           fontSize: "0.8rem",
//                           color: "rgba(255,255,255,0.45)",
//                           textDecoration: "none",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           transition: "all 0.25s",
//                         }}
//                         onMouseEnter={(e) => { e.target.style.color = "#3BB77E"; e.target.style.paddingLeft = "4px"; }}
//                         onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.45)"; e.target.style.paddingLeft = "0"; }}
//                       >
//                         › {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}

//             {/* App column */}
//             <div>
//               <h4 style={{
//                 fontSize: "0.75rem",
//                 fontWeight: 700,
//                 color: "white",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.08em",
//                 marginBottom: "20px",
//                 paddingBottom: "10px",
//                 borderBottom: "1px solid rgba(255,255,255,0.08)",
//                 fontFamily: "inherit",
//               }}>
//                 Install App
//               </h4>

//               <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "14px" }}>
//                 From App Store or Google Play
//               </p>

//               {/* App store badges */}
//               {[
//                 { label: "App Store", sub: "Download on the", bg: "#1a1a2e", icon: "🍎" },
//                 { label: "Google Play", sub: "Get it on", bg: "#ea4335", icon: "▶" },
//               ].map((app) => (
//                 <a
//                   key={app.label}
//                   href="#"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     padding: "10px 14px",
//                     borderRadius: "10px",
//                     background: app.bg,
//                     border: app.label === "App Store" ? "1px solid rgba(255,255,255,0.1)" : "none",
//                     marginBottom: "10px",
//                     textDecoration: "none",
//                     color: "white",
//                     transition: "transform 0.2s, opacity 0.2s",
//                   }}
//                   onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
//                 >
//                   <span style={{ fontSize: "1.2rem" }}>{app.icon}</span>
//                   <div>
//                     <div style={{ fontSize: "0.6rem", opacity: 0.75 }}>{app.sub}</div>
//                     <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{app.label}</div>
//                   </div>
//                 </a>
//               ))}

//               <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "5px" }}>
//                 🔒 Secured Payment Gateways
//               </p>

//               {/* Social links */}
//               <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
//                 Follow Us
//               </p>
//               <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
//                 {[
//                   { label: "F", color: "#1877f2" },
//                   { label: "T", color: "#1da1f2" },
//                   { label: "Ig", color: "#e1306c" },
//                   { label: "Yt", color: "#ff0000" },
//                   { label: "P", color: "#e60023" },
//                 ].map((s) => (
//                   <a
//                     key={s.label}
//                     href="#"
//                     style={{
//                       width: "30px", height: "30px",
//                       borderRadius: "50%",
//                       background: "rgba(255,255,255,0.08)",
//                       color: "white",
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: "0.62rem",
//                       fontWeight: 700,
//                       textDecoration: "none",
//                       transition: "all 0.25s",
//                     }}
//                     onMouseEnter={(e) => { e.currentTarget.style.background = s.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
//                   >
//                     {s.label}
//                   </a>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "18px 0" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: "16px",
//             flexWrap: "wrap",
//           }}>
//             <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.25)" }}>
//               © {new Date().getFullYear()} Nest — HTML Ecommerce Template. All rights reserved.
//             </p>

//             <div style={{ display: "flex", gap: "24px" }}>
//               {[
//                 { num: "1900 – 6666", sub: "Working 8:00 – 22:00" },
//                 { num: "1900 – 8888", sub: "24/7 Support Center" },
//               ].map((ph) => (
//                 <a
//                   key={ph.num}
//                   href="#"
//                   style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "white", transition: "color 0.25s" }}
//                   onMouseEnter={(e) => { e.currentTarget.style.color = "#3BB77E"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.color = "white"; }}
//                 >
//                   <span style={{ color: "#3BB77E" }}>📞</span>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{ph.num}</div>
//                     <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>{ph.sub}</div>
//                   </div>
//                 </a>
//               ))}
//             </div>

//             <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: "5px" }}>
//               🎁 Up to 15% discount on your first subscribe
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }