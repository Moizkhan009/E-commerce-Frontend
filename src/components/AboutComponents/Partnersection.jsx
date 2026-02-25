// import React from "react";

// const PartnerSection = () => {
//   return (
//     <section
//       style={{
//         display: "flex",
//         gap: 48,
//         padding: "72px 80px",
//         maxWidth: 1200,
//         margin: "0 auto",
//         alignItems: "center",
//       }}
//     >
//       {/* Overlapping Images */}
//       <div style={{ flex: "0 0 460px", position: "relative", height: 360 }}>
//         <img
//           src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
//           alt="grocery store"
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 40,
//             width: 220,
//             height: 260,
//             objectFit: "cover",
//             borderRadius: 14,
//             boxShadow: "0 8px 32px rgba(0,0,0,.15)",
//           }}
//         />
//         <img
//           src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&q=80"
//           alt="shopping"
//           style={{
//             position: "absolute",
//             left: 180,
//             top: 0,
//             width: 240,
//             height: 320,
//             objectFit: "cover",
//             borderRadius: 14,
//             boxShadow: "0 12px 40px rgba(59,183,126,.25)",
//           }}
//         />
//       </div>

//       {/* Text Content */}
//       <div style={{ flex: 1 }}>
//         <p
//           style={{
//             color: "#3BB77E",
//             fontSize: 12,
//             fontWeight: 700,
//             letterSpacing: 2,
//             textTransform: "uppercase",
//             marginBottom: 8,
//           }}
//         >
//           Our Performance
//         </p>
//         <h2
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: 36,
//             color: "#253D4E",
//             lineHeight: 1.3,
//             marginBottom: 20,
//           }}
//         >
//           Your Partner for <br />
//           <span style={{ color: "#3BB77E" }}>e-commerce grocery</span>
//           <br />
//           solution
//         </h2>
//         <p style={{ color: "#777", lineHeight: 1.8, marginBottom: 16 }}>
//           Sit ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
//           laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
//         </p>
//         <p style={{ color: "#777", lineHeight: 1.8 }}>
//           Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
//           consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default PartnerSection;
import React, { useEffect, useRef } from "react";

// ── Scroll Reveal Hook (embedded) ──────────────────────────────────────────
const useRevealX = (dir = "left", delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateX(${dir === "left" ? "-50px" : "50px"})`;
    el.style.transition = `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateX(0)"; obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [dir, delay]);
  return ref;
};

// ── Component ──────────────────────────────────────────────────────────────
const highlights = [
  { value:"12K+", label:"Products Available" },
  { value:"99%",  label:"Customer Satisfaction" },
  { value:"2hr",  label:"Express Delivery" },
];

const PartnerSection = () => {
  const leftRef  = useRevealX("left",  0);
  const rightRef = useRevealX("right", 180);

  return (
    <section style={{ display:"flex", gap:80, padding:"88px 80px", maxWidth:1280, margin:"0 auto", alignItems:"center", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>

      {/* ── LEFT: image composition ── */}
      <div ref={leftRef} style={{ flex:"0 0 480px", position:"relative", height:420 }}>
        {/* Back image */}
        <div style={{ position:"absolute", left:0, bottom:0, width:250, height:320, borderRadius:20, overflow:"hidden", boxShadow:"0 12px 40px rgba(29,53,87,.16)" }}>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=85" alt="Grocery" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </div>

        {/* Front image */}
        <div style={{ position:"absolute", right:0, top:0, width:270, height:360, borderRadius:20, overflow:"hidden", boxShadow:"0 20px 56px rgba(59,183,126,.22)", border:"4px solid #fff" }}>
          <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&q=85" alt="Shopper" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </div>

        {/* Years badge */}
        <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", background:"#3BB77E", borderRadius:"50%", width:100, height:100, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(59,183,126,.40)", border:"4px solid #fff", zIndex:2, textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:700, color:"#fff", lineHeight:1 }}>12</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.85)", fontWeight:600, marginTop:3, lineHeight:1.4, letterSpacing:0.3 }}>Years of<br/>Excellence</div>
        </div>

        {/* Dashed ring */}
        <div style={{ position:"absolute", bottom:28, right:28, width:70, height:70, borderRadius:"50%", border:"3px dashed rgba(59,183,126,.35)", pointerEvents:"none", animation:"spin 14s linear infinite" }} />
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>

      {/* ── RIGHT: content ── */}
      <div ref={rightRef} style={{ flex:1 }}>
        <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#3BB77E", marginBottom:10 }}>Our Performance</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(30px,4vw,46px)", fontWeight:700, color:"#1D3557", lineHeight:1.2, marginBottom:18 }}>
          Your Partner for<br />
          <em style={{ color:"#3BB77E", fontStyle:"italic" }}>e-commerce grocery</em><br />
          solution
        </h2>
        <div style={{ width:48, height:3, background:"linear-gradient(90deg,#3BB77E,#28976A)", borderRadius:99, marginBottom:26 }} />

        <p style={{ color:"#6B7E8F", lineHeight:1.85, fontSize:15, marginBottom:16 }}>
          Sit ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.
        </p>
        <p style={{ color:"#6B7E8F", lineHeight:1.85, fontSize:15, marginBottom:36 }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        {/* Highlight pills */}
        <div style={{ display:"flex", gap:0, borderTop:"1.5px solid #EEF4F0", paddingTop:28, marginBottom:36 }}>
          {highlights.map(({ value, label }, i) => (
            <div key={i} style={{ flex:1, paddingRight:i < 2 ? 24:0, borderRight:i < 2 ? "1.5px solid #EEF4F0":"none", marginRight:i < 2 ? 24:0 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:34, fontWeight:700, color:"#3BB77E", lineHeight:1, marginBottom:4 }}>{value}</div>
              <div style={{ fontSize:12, color:"#8A9BAE", fontWeight:500, letterSpacing:0.5 }}>{label}</div>
            </div>
          ))}
        </div>

        <button
          style={{ background:"#3BB77E", color:"#fff", border:"none", borderRadius:10, padding:"13px 30px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", letterSpacing:0.3, transition:"all 0.26s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#28976A"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(59,183,126,.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#3BB77E"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
        >
          Learn More →
        </button>
      </div>
    </section>
  );
};

export default PartnerSection;