// import React from "react";

// const InfoCard = ({ title, text }) => {
//   return (
//     <div style={{ borderLeft: "4px solid #3BB77E", paddingLeft: 20 }}>
//       <h3
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           color: "#253D4E",
//           fontSize: 20,
//           marginBottom: 10,
//         }}
//       >
//         {title}
//       </h3>
//       <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>{text}</p>
//     </div>
//   );
// };

// const InfoCards = () => {
//   const cards = [
//     {
//       title: "Who we are",
//       text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In posuere eleifend odio. Quisque ultrices ullamcorper mauris.",
//     },
//     {
//       title: "Our history",
//       text: "Adipiscing elit, sed do eiusmod tempor incididunt ut labore. Vestibulum ante ipsum primis in faucibus orci luctus ultrices posuere cubilia curae.",
//     },
//     {
//       title: "Our mission",
//       text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In posuere eleifend odio. Quisque ultrices ullamcorper.",
//     },
//   ];

//   return (
//     <section style={{ background: "#F8FBF9", padding: "48px 80px" }}>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: 32,
//           maxWidth: 1100,
//           margin: "0 auto",
//         }}
//       >
//         {cards.map((card) => (
//           <InfoCard key={card.title} {...card} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default InfoCards;
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
      if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ── Data ───────────────────────────────────────────────────────────────────
const cards = [
  {
    icon:"👥", title:"Who We Are",
    text:"We are a passionate team of food lovers and technology experts committed to making fresh, quality groceries accessible to every household. Founded in 2012, Nest has grown from a small local shop to a nationwide platform.",
    gradient:"linear-gradient(135deg,#E8F8F1 0%,#D0F0E3 100%)", iconBg:"#3BB77E",
  },
  {
    icon:"📖", title:"Our History",
    text:"Starting from a single farmer's market stall, Nest expanded city by city, partnering with local farmers and artisan producers. Today we serve over 8,500 happy customers with a mission to connect communities with their food.",
    gradient:"linear-gradient(135deg,#EEF3FF 0%,#DDE5FF 100%)", iconBg:"#4A6CF7",
  },
  {
    icon:"🎯", title:"Our Mission",
    text:"To make wholesome, farm-to-table grocery shopping effortless and affordable for every family. We believe quality food should never be a luxury — it should be a right accessible to all, delivered with transparency and care.",
    gradient:"linear-gradient(135deg,#FFF8EC 0%,#FFE8C2 100%)", iconBg:"#F6A623",
  },
];

// ── Card ───────────────────────────────────────────────────────────────────
const InfoCard = ({ icon, title, text, gradient, iconBg, delay }) => {
  const ref = useReveal(delay);

  return (
    <div ref={ref}
      style={{ background:gradient, borderRadius:22, padding:"36px 30px 32px", boxShadow:"0 2px 16px rgba(29,53,87,.05)", border:"1.5px solid rgba(255,255,255,.8)", display:"flex", flexDirection:"column", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s", cursor:"default" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(29,53,87,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(29,53,87,.05)"; }}
    >
      {/* Icon */}
      <div
        style={{ width:58, height:58, borderRadius:16, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, fontSize:26, boxShadow:"0 6px 20px rgba(0,0,0,.15)", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)", flexShrink:0 }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.14) rotate(-6deg)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}
      >{icon}</div>

      <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22, fontWeight:700, color:"#1D3557" }}>{title}</h3>
      <div style={{ width:36, height:2.5, background:"rgba(29,53,87,.15)", borderRadius:99, margin:"12px 0 16px" }} />
      <p style={{ color:"#6B7E8F", fontSize:14, lineHeight:1.85, flex:1, marginBottom:20 }}>{text}</p>

      <a href="#"
        style={{ color:"#1D3557", fontSize:13, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:5, opacity:0.7, transition:"opacity 0.2s, gap 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.gap="10px"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity="0.7"; e.currentTarget.style.gap="5px"; }}
      >Discover more <span>→</span></a>
    </div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────
const InfoCards = () => {
  const headRef = useReveal(0);

  return (
    <section style={{ background:"#fff", padding:"80px 80px 88px", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <div ref={headRef} style={{ textAlign:"center", marginBottom:52 }}>
        <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#3BB77E", marginBottom:10 }}>About Nest</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"#1D3557", lineHeight:1.15 }}>
          Our <em style={{ color:"#3BB77E", fontStyle:"italic" }}>Story & Values</em>
        </h2>
        <div style={{ width:48, height:3, background:"linear-gradient(90deg,#3BB77E,#28976A)", borderRadius:99, margin:"14px auto 0" }} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1120, margin:"0 auto" }}>
        {cards.map((card, i) => <InfoCard key={i} {...card} delay={i * 100} />)}
      </div>
    </section>
  );
};

export default InfoCards;