// import React from "react";

// const socialIcons = ["𝕏", "in", "📸", "▶"];

// const TeamCard = ({ name, role, img }) => {
//   return (
//     <div
//       style={{
//         borderRadius: 16,
//         overflow: "hidden",
//         boxShadow: "0 6px 28px rgba(0,0,0,.10)",
//         background: "#fff",
//         transition: "transform .3s",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//     >
//       <img
//         src={img}
//         alt={name}
//         style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
//       />
//       <div style={{ padding: "18px 20px", textAlign: "center" }}>
//         <h4
//           style={{
//             color: "#253D4E",
//             fontSize: 17,
//             fontFamily: "'Playfair Display', serif",
//             marginBottom: 4,
//           }}
//         >
//           {name}
//         </h4>
//         <p style={{ color: "#3BB77E", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{role}</p>
//         <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
//           {socialIcons.map((icon, i) => (
//             <span
//               key={i}
//               style={{
//                 cursor: "pointer",
//                 fontSize: 15,
//                 opacity: 0.5,
//                 transition: "opacity .2s, color .2s",
//                 color: "#253D4E",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.opacity = "1";
//                 e.currentTarget.style.color = "#3BB77E";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.opacity = "0.5";
//                 e.currentTarget.style.color = "#253D4E";
//               }}
//             >
//               {icon}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TeamSection = () => {
//   const members = [
//     {
//       name: "Hi. Merinda",
//       role: "CEO & Co-Founder",
//       img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
//     },
//     {
//       name: "Dilan Specter",
//       role: "Head Engineer",
//       img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     },
//     {
//       name: "Sara Mitchell",
//       role: "Head of Design",
//       img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
//     },
//     {
//       name: "James Okafor",
//       role: "Marketing Lead",
//       img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
//     },
//   ];

//   return (
//     <section style={{ padding: "72px 80px", background: "#fff" }}>
//       {/* Header Row */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-end",
//           maxWidth: 1100,
//           margin: "0 auto 48px",
//         }}
//       >
//         <div>
//           <p
//             style={{
//               color: "#3BB77E",
//               fontSize: 12,
//               fontWeight: 700,
//               letterSpacing: 2,
//               textTransform: "uppercase",
//               marginBottom: 6,
//             }}
//           >
//             Our Team
//           </p>
//           <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#253D4E" }}>
//             Meet Our <span style={{ color: "#3BB77E" }}>Expert Team</span>
//           </h2>
//         </div>
//         <button
//           style={{
//             background: "#3BB77E",
//             color: "#fff",
//             border: "none",
//             borderRadius: 8,
//             padding: "12px 28px",
//             fontWeight: 600,
//             fontSize: 14,
//             cursor: "pointer",
//             transition: "background .2s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#29A56C")}
//           onMouseLeave={(e) => (e.currentTarget.style.background = "#3BB77E")}
//         >
//           View All Members →
//         </button>
//       </div>

//       {/* Cards Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: 24,
//           maxWidth: 1100,
//           margin: "0 auto",
//         }}
//       >
//         {members.map((m, i) => (
//           <TeamCard key={i} {...m} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TeamSection;
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
const members = [
  { name:"Hi. Merinda",  role:"CEO & Co-Founder", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=85", bio:"Visionary leader with 12+ years in retail & e-commerce." },
  { name:"Dilan Specter", role:"Head Engineer",    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=85", bio:"Full-stack expert building scalable grocery platforms." },
  { name:"Sara Mitchell", role:"Head of Design",   img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=85", bio:"Crafting delightful experiences for millions of shoppers." },
  { name:"James Okafor",  role:"Marketing Lead",   img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=85", bio:"Growth strategist driving brand love across channels." },
];

// ── Team Card ──────────────────────────────────────────────────────────────
const TeamCard = ({ name, role, img, bio, delay }) => {
  const ref = useReveal(delay);
  const overlayRef = useRef(null);
  const socialsRef = useRef(null);

  const handleEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
    if (socialsRef.current) { socialsRef.current.style.transform = "translateY(0)"; socialsRef.current.style.opacity = "1"; }
    ref.current.style.transform = "translateY(-10px)";
    ref.current.style.boxShadow = "0 24px 60px rgba(29,53,87,.14)";
  };
  const handleLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (socialsRef.current) { socialsRef.current.style.transform = "translateY(16px)"; socialsRef.current.style.opacity = "0"; }
    ref.current.style.transform = "translateY(0)";
    ref.current.style.boxShadow = "0 2px 16px rgba(29,53,87,.06)";
  };

  return (
    <div ref={ref} style={{ background:"#fff", borderRadius:20, boxShadow:"0 2px 16px rgba(29,53,87,.06)", border:"1.5px solid #EEF4F0", overflow:"hidden", transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s", cursor:"default", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}
    >
      {/* Photo */}
      <div style={{ position:"relative", overflow:"hidden", borderRadius:"18px 18px 0 0" }}>
        <img src={img} alt={name} style={{ width:"100%", height:270, objectFit:"cover", display:"block", transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.06)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        />

        {/* Hover overlay */}
        <div ref={overlayRef} style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(29,53,87,.75) 0%,rgba(29,53,87,.2) 100%)", opacity:0, transition:"opacity 0.35s", display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:20 }}>
          <div ref={socialsRef} style={{ display:"flex", gap:10, transform:"translateY(16px)", opacity:0, transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s" }}>
            {["𝕏", "in", "📸"].map((icon, i) => (
              <a key={i} href="#" style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"1.5px solid rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, textDecoration:"none", backdropFilter:"blur(4px)", transition:"background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background="#3BB77E"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.15)"}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Role chip */}
        <div style={{ position:"absolute", top:14, left:14, background:"#3BB77E", color:"#fff", fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", padding:"4px 10px", borderRadius:40 }}>
          {role}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:"18px 20px 22px" }}>
        <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:21, fontWeight:700, color:"#1D3557", marginBottom:6 }}>{name}</h4>
        <p style={{ color:"#8A9BAE", fontSize:13, lineHeight:1.7 }}>{bio}</p>
      </div>
    </div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────
const TeamSection = () => {
  const headRef = useReveal(0);

  return (
    <section style={{ padding:"80px 80px 88px", background:"#F8FAFC", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      {/* Heading row */}
      <div ref={headRef} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", maxWidth:1120, margin:"0 auto 52px" }}>
        <div>
          <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#3BB77E", marginBottom:10 }}>Our Team</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"#1D3557", lineHeight:1.15 }}>
            Meet Our <em style={{ color:"#3BB77E", fontStyle:"italic" }}>Expert Team</em>
          </h2>
          <div style={{ width:48, height:3, background:"linear-gradient(90deg,#3BB77E,#28976A)", borderRadius:99, marginTop:14 }} />
        </div>
        <button
          style={{ background:"#3BB77E", color:"#fff", border:"none", borderRadius:10, padding:"13px 28px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", letterSpacing:0.3, transition:"all 0.26s", alignSelf:"flex-end" }}
          onMouseEnter={e => { e.currentTarget.style.background="#28976A"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(59,183,126,.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#3BB77E"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
        >
          View All Members →
        </button>
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, maxWidth:1120, margin:"0 auto" }}>
        {members.map((m, i) => <TeamCard key={i} {...m} delay={i * 90} />)}
      </div>
    </section>
  );
};

export default TeamSection;