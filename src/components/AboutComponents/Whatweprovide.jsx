// import React from "react";

// const FeatureCard = ({ icon, title, desc }) => {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 16,
//         padding: "32px 24px",
//         textAlign: "center",
//         boxShadow: "0 4px 24px rgba(0,0,0,.07)",
//         transition: "transform .25s, box-shadow .25s",
//         cursor: "default",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px)";
//         e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,183,126,.18)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,.07)";
//       }}
//     >
//       <div style={{ fontSize: 42, marginBottom: 14 }}>{icon}</div>
//       <h4
//         style={{
//           color: "#253D4E",
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 17,
//           marginBottom: 10,
//         }}
//       >
//         {title}
//       </h4>
//       <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
//       <a href="#" style={{ color: "#3BB77E", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
//         Read more →
//       </a>
//     </div>
//   );
// };

// const WhatWeProvide = () => {
//   const features = [
//     { icon: "🏷️", title: "Best Prices & Offers", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//     { icon: "🛒", title: "Wide Assortment", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//     { icon: "🚚", title: "Free Delivery", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//     { icon: "↩️", title: "Easy Returns", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//     { icon: "✅", title: "100% Satisfaction", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//     { icon: "🤝", title: "Great Daily Deal", desc: "There are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form." },
//   ];

//   return (
//     <section style={{ background: "#F8FBF9", padding: "64px 80px" }}>
//       {/* Heading */}
//       <div style={{ textAlign: "center", marginBottom: 48 }}>
//         <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#253D4E" }}>
//           What We <span style={{ color: "#3BB77E" }}>Provide?</span>
//         </h2>
//         <div style={{ width: 60, height: 3, background: "#3BB77E", margin: "12px auto 0", borderRadius: 4 }} />
//       </div>

//       {/* Cards Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: 24,
//           maxWidth: 1100,
//           margin: "0 auto",
//         }}
//       >
//         {features.map((f, i) => (
//           <FeatureCard key={i} {...f} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WhatWeProvide;
import React, { useEffect, useRef } from "react";

// ── Scroll Reveal Hook (embedded) ──────────────────────────────────────────
const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ── Feature data ───────────────────────────────────────────────────────────
const features = [
  { icon:"🏷️", title:"Best Prices & Offers",  desc:"Competitive pricing on thousands of products with weekly deals and exclusive member discounts you won't find anywhere else.", bg:"#FFF7E6", accent:"#F6A623" },
  { icon:"🛒", title:"Wide Assortment",        desc:"Over 12,000 curated products across fresh produce, dairy, bakery, meats, and international specialty items.", bg:"#E8F4FF", accent:"#4A90D9" },
  { icon:"🚚", title:"Free Delivery",          desc:"Free same-day delivery on orders above $49. Express slots available within 2 hours for urgent needs.", bg:"#E8F8F1", accent:"#3BB77E" },
  { icon:"↩️", title:"Easy Returns",           desc:"Not satisfied? Return any item within 7 days for a full refund — no questions asked, no hassle.", bg:"#FFF0F5", accent:"#E05C8A" },
  { icon:"⭐", title:"100% Satisfaction",      desc:"Every product is quality-checked before dispatch. We guarantee freshness or we replace it immediately.", bg:"#F5F0FF", accent:"#8B5CF6" },
  { icon:"🤝", title:"Great Daily Deal",       desc:"A new hand-picked deal drops every morning at 8 AM — save up to 60% on featured seasonal products.", bg:"#FFF4E8", accent:"#F5820B" },
];

// ── Feature Card ───────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, bg, accent, delay }) => {
  const ref = useReveal(delay);
  const cardId = `fc-${title.replace(/\s/g,"")}`;

  return (
    <div ref={ref} id={cardId} style={{ background:"#fff", borderRadius:20, padding:"32px 26px 28px", boxShadow:"0 2px 16px rgba(29,53,87,.06)", border:"1.5px solid #EEF4F0", display:"flex", flexDirection:"column", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s", cursor:"default" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-10px)"; e.currentTarget.style.boxShadow="0 20px 56px rgba(29,53,87,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(29,53,87,.06)"; }}
    >
      {/* Icon */}
      <div style={{ width:58, height:58, borderRadius:16, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, fontSize:26, transition:"transform 0.3s", flexShrink:0 }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.12) rotate(-4deg)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}
      >{icon}</div>

      <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:21, fontWeight:700, color:"#1D3557", marginBottom:2 }}>{title}</h4>
      <div style={{ width:"100%", height:1, background:"#EEF2F5", margin:"12px 0 14px" }} />
      <p style={{ color:"#6B7E8F", fontSize:14, lineHeight:1.8, marginBottom:18, flex:1 }}>{desc}</p>

      <a href="#" style={{ color:accent, fontSize:13, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:5, transition:"gap 0.22s" }}
        onMouseEnter={e => e.currentTarget.style.gap="10px"}
        onMouseLeave={e => e.currentTarget.style.gap="5px"}
      >Read more <span>→</span></a>
    </div>
  );
};

// ── Main Section ───────────────────────────────────────────────────────────
const WhatWeProvide = () => {
  const headRef = useReveal(0);

  return (
    <section style={{ position:"relative", background:"#F8FAFC", padding:"80px 80px 88px", overflow:"hidden", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      {/* Dot grid bg */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 2px 2px,rgba(59,183,126,.06) 1px,transparent 0)", backgroundSize:"36px 36px", pointerEvents:"none" }} />

      {/* Heading */}
      <div ref={headRef} style={{ textAlign:"center", marginBottom:56, position:"relative" }}>
        <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#3BB77E", marginBottom:10 }}>Why Choose Us</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"#1D3557", lineHeight:1.15 }}>
          What We <em style={{ color:"#3BB77E", fontStyle:"italic" }}>Provide?</em>
        </h2>
        <div style={{ width:48, height:3, background:"linear-gradient(90deg,#3BB77E,#28976A)", borderRadius:99, margin:"14px auto 16px" }} />
        <p style={{ color:"#8A9BAE", fontSize:15, maxWidth:460, margin:"0 auto", lineHeight:1.7 }}>
          Everything you need for your daily grocery — delivered with care, quality, and speed.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1120, margin:"0 auto", position:"relative" }}>
        {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 80} />)}
      </div>
    </section>
  );
};

export default WhatWeProvide;