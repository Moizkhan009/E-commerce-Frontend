import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


// ── Scroll Reveal Hook (embedded) ──────────────────────────────────────────
const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const useRevealX = (dir = "left", delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateX(${dir === "left" ? "-50px" : "50px"})`;
    el.style.transition = `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [dir, delay]);
  return ref;
};

// ── Component ──────────────────────────────────────────────────────────────
const foodImages = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=85", alt: "Dish" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=85", alt: "Salad" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=85", alt: "Pizza" },
];

const WelcomeSection = () => {
  const navigate =useNavigate();
  const leftRef  = useRevealX("left", 0);
  const rightRef = useRevealX("right", 180);

  return (
    <section style={s.section}>
      <style>{`
        .ws-food:hover { transform: translateY(-7px) scale(1.03); box-shadow: 0 16px 40px rgba(59,183,126,.22) !important; }
        .ws-food img  { transition: transform 0.4s ease; }
        .ws-food:hover img { transform: scale(1.08); }
        .ws-btn-primary:hover { background: #28976A !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(59,183,126,.35) !important; }
        .ws-btn-link:hover   { letter-spacing: 0.8px; color: #28976A !important; }
      `}</style>

      {/* Blobs */}
      <div style={{ position:"absolute", top:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,183,126,.10) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, right:-60, width:220, height:220, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,183,126,.07) 0%,transparent 70%)", pointerEvents:"none" }} />

      {/* LEFT image block */}
      <div ref={leftRef} style={s.imgWrap}>
        {/* Organic badge */}
        <div style={s.badge}>🌿 <span style={{ fontWeight:700, fontSize:13, color:"#1A6B4A", marginLeft:6 }}>100% Organic</span></div>
        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85" alt="Chef" style={s.mainImg} />
        {/* Floating stat */}
        <div style={s.statCard}>
          <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:700, color:"#3BB77E", lineHeight:1 }}>12K+</div>
          <div style={{ fontSize:11, color:"#8A9BAE", fontWeight:500, marginTop:4, letterSpacing:0.4 }}>Happy Customers</div>
        </div>
      </div>

      {/* RIGHT content */}
      <div ref={rightRef} style={s.content}>
        <span style={s.label}>Our Story</span>
        <h2 style={s.heading}>
          Welcome to <em style={{ color:"#3BB77E", fontStyle:"italic" }}>Nest</em><br />Grocery Store
        </h2>
        <div style={s.divider} />
        <p style={s.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.</p>
        <p style={{ ...s.para, marginBottom:34 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

        {/* Food thumbnails */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:36 }}>
          {foodImages.map(({ src, alt }, i) => (
            <div key={i} className="ws-food" style={{ borderRadius:14, overflow:"hidden", boxShadow:"0 4px 20px rgba(29,53,87,.10)", cursor:"pointer", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s" }}>
              <img src={src} alt={alt} style={{ width:"100%", height:118, objectFit:"cover", display:"block" }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          <button 
          onClick={()=> navigate("/Home")}
          className="ws-btn-primary"
           style={
            { background:"#3BB77E",
                color:"#fff",
                border:"none", 
                borderRadius:10,
                padding:"13px 30px",
                fontWeight:700,
                fontSize:14,
                cursor:"pointer",
                transition:"all 0.26s", 
                fontFamily:"inherit",
                letterSpacing:0.3 }}>
            Shop Now →
          </button>
          <a href="#" className="ws-btn-link" style={{ color:"#3BB77E", fontWeight:700, fontSize:13, textDecoration:"none", transition:"all 0.22s", letterSpacing:0.3 }}>
            Learn More →
          </a>
        </div>
      </div>
    </section>
  );
};

const s = {
  section: {
    position:"relative", display:"flex", gap:64, padding:"80px 80px 72px",
    maxWidth:1280, margin:"0 auto", alignItems:"center", overflow:"hidden",
    fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
  },
  imgWrap: { flex:"0 0 440px", position:"relative", borderRadius:24, overflow:"visible" },
  badge: {
    position:"absolute", top:20, left:-16, zIndex:2,
    background:"#fff", border:"1.5px solid #E8F8F1", borderRadius:40,
    padding:"8px 18px", display:"flex", alignItems:"center",
    boxShadow:"0 8px 24px rgba(59,183,126,.18)",
  },
  mainImg: {
    width:"100%", height:500, objectFit:"cover", borderRadius:24,
    display:"block", boxShadow:"0 24px 64px rgba(29,53,87,.16)",
  },
  statCard: {
    position:"absolute", bottom:28, right:-28,
    background:"#fff", borderRadius:16, padding:"16px 22px",
    boxShadow:"0 12px 40px rgba(29,53,87,.14)",
    border:"1.5px solid #E8F8F1", textAlign:"center",
  },
  content: { flex:1 },
  label: { display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#3BB77E", marginBottom:10 },
  heading: {
    fontFamily:"'Cormorant Garamond',Georgia,serif",
    fontSize:"clamp(34px,4vw,50px)", fontWeight:700,
    color:"#1D3557", lineHeight:1.15, marginBottom:18,
  },
  divider: { width:48, height:3, background:"linear-gradient(90deg,#3BB77E,#28976A)", borderRadius:99, marginBottom:26 },
  para: { color:"#6B7E8F", lineHeight:1.85, fontSize:15, marginBottom:16 },
};

export default WelcomeSection;