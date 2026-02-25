// import React, { useState } from "react";

// const NewsletterSection = () => {
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = () => {
//     if (email.trim()) {
//       setSubscribed(true);
//       setEmail("");
//     }
//   };

//   return (
//     <section
//       style={{
//         background: "linear-gradient(135deg, #EEF9F4 0%, #D4F5E9 100%)",
//         padding: "60px 80px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 40,
//       }}
//     >
//       {/* Left Text */}
//       <div style={{ flex: 1 }}>
//         <h2
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: 32,
//             color: "#253D4E",
//             marginBottom: 10,
//             lineHeight: 1.3,
//           }}
//         >
//           Stay home &amp; get your <br />
//           <span style={{ color: "#3BB77E" }}>daily needs from our shop</span>
//         </h2>
//         <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>
//           Start Your Daily Shopping with{" "}
//           <strong style={{ color: "#3BB77E" }}>Nest Mart</strong>
//         </p>

//         {subscribed ? (
//           <div
//             style={{
//               background: "#3BB77E",
//               color: "#fff",
//               padding: "14px 24px",
//               borderRadius: 8,
//               fontSize: 14,
//               fontWeight: 600,
//               maxWidth: 420,
//             }}
//           >
//             ✅ Thanks for subscribing!
//           </div>
//         ) : (
//           <div style={{ display: "flex", maxWidth: 420 }}>
//             <input
//               type="email"
//               placeholder="Your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
//               style={{
//                 flex: 1,
//                 padding: "14px 20px",
//                 border: "2px solid #cce8d8",
//                 borderRight: "none",
//                 borderRadius: "8px 0 0 8px",
//                 fontSize: 14,
//                 outline: "none",
//                 background: "#fff",
//               }}
//             />
//             <button
//               onClick={handleSubscribe}
//               style={{
//                 background: "#3BB77E",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "0 8px 8px 0",
//                 padding: "14px 28px",
//                 fontWeight: 700,
//                 fontSize: 14,
//                 cursor: "pointer",
//                 transition: "background .2s",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.background = "#29A56C")}
//               onMouseLeave={(e) => (e.currentTarget.style.background = "#3BB77E")}
//             >
//               Subscribe
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Right Image */}
//       <div style={{ flex: "0 0 220px" }}>
//         <img
//           src="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80"
//           alt="fresh vegetables"
//           style={{
//             width: "100%",
//             height: 220,
//             objectFit: "cover",
//             borderRadius: 16,
//             boxShadow: "0 8px 32px rgba(59,183,126,.25)",
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default NewsletterSection;
import React, { useState, useEffect, useRef } from "react";

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
      if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ── Component ──────────────────────────────────────────────────────────────
const NewsletterSection = () => {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const ref = useReveal(0);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setEmail(""); }, 1000);
  };

  const inputBorder =
    status === "error"   ? "#E05C8A" :
    status === "success" ? "#3BB77E" : "#C8E6D5";

  return (
    <section style={{ position:"relative", background:"linear-gradient(135deg,#EAF9F2 0%,#D0F0E3 60%,#C5EBD9 100%)", padding:"80px 80px", overflow:"hidden", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:-100, right:-100, width:380, height:380, borderRadius:"50%", background:"rgba(59,183,126,.12)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:280, height:280, borderRadius:"50%", background:"rgba(59,183,126,.08)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:32, right:340, fontSize:80, opacity:0.12, pointerEvents:"none", transform:"rotate(25deg)", userSelect:"none" }}>🌿</div>

      <div ref={ref} style={{ display:"flex", alignItems:"center", gap:72, maxWidth:1120, margin:"0 auto", position:"relative" }}>

        {/* LEFT: content */}
        <div style={{ flex:1 }}>
          <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#28976A", marginBottom:10 }}>Newsletter</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:700, color:"#1A6B4A", lineHeight:1.25, marginBottom:14 }}>
            Stay home &amp; get your<br />
            <em style={{ fontStyle:"italic" }}>daily needs from our shop</em>
          </h2>
          <p style={{ color:"#4A8A6A", fontSize:15, marginBottom:28, lineHeight:1.65 }}>
            Start Your Daily Shopping with <strong style={{ color:"#1A6B4A" }}>Nest Mart</strong> — Fresh deals every morning!
          </p>

          {/* Email row */}
          <div style={{ display:"flex", maxWidth:480, marginBottom:12 }}>
            <div style={{ position:"relative", flex:1 }}>
              <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>✉️</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                disabled={status === "loading" || status === "success"}
                style={{ width:"100%", padding:"15px 18px 15px 46px", border:`2px solid ${inputBorder}`, borderRight:"none", borderRadius:"10px 0 0 10px", fontSize:14, outline:"none", background:"#fff", fontFamily:"inherit", color:"#253D4E", transition:"border-color 0.2s", boxSizing:"border-box" }}
              />
            </div>
            <button
              onClick={handleSubscribe}
              disabled={status === "loading" || status === "success"}
              style={{ background:"#3BB77E", color:"#fff", border:"none", borderRadius:"0 10px 10px 0", padding:"15px 28px", fontWeight:700, fontSize:14, cursor:status === "idle" ? "pointer":"default", fontFamily:"inherit", transition:"background 0.22s", whiteSpace:"nowrap", opacity:status !== "idle" ? 0.85:1 }}
              onMouseEnter={e => { if (status === "idle") e.currentTarget.style.background="#28976A"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#3BB77E"; }}
            >
              {status === "loading" ? "⏳ Sending..." : status === "success" ? "✅ Done!" : "Subscribe →"}
            </button>
          </div>

          {/* Feedback */}
          {status === "error"   && <p style={{ color:"#E05C8A", fontSize:13, fontWeight:500, marginBottom:12 }}>⚠️ Please enter a valid email address.</p>}
          {status === "success" && <p style={{ color:"#28976A", fontSize:13, fontWeight:600, marginBottom:12 }}>🎉 You're subscribed! Check your inbox for a welcome gift.</p>}

          {/* Trust badges */}
          <div style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
            {["🔒 No Spam", "📦 Weekly Deals", "🎁 Exclusive Offers"].map((b, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.7)", border:"1.5px solid rgba(59,183,126,.3)", borderRadius:40, padding:"5px 14px", fontSize:12, fontWeight:600, color:"#1A6B4A" }}>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: image */}
        <div style={{ flex:"0 0 260px", position:"relative" }}>
          <img
            src="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&q=85"
            alt="Fresh vegetables"
            style={{ width:"100%", height:280, objectFit:"cover", borderRadius:20, display:"block", boxShadow:"0 16px 48px rgba(29,53,87,.18)" }}
          />
          {/* Floating pill */}
          <div style={{ position:"absolute", bottom:-16, left:-24, background:"#fff", borderRadius:14, padding:"12px 16px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 8px 28px rgba(29,53,87,.14)", border:"1.5px solid #E8F8F1" }}>
            <span style={{ fontSize:22 }}>🥬</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#1D3557" }}>Fresh Today</div>
              <div style={{ fontSize:11, color:"#8A9BAE", marginTop:1 }}>Just harvested</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;