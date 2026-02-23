// import React, { useState, useRef, useEffect } from "react";

// const useReveal = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     el.style.opacity = "0"; el.style.transform = "translateY(32px)";
//     el.style.transition = `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
//     }, { threshold: 0.12 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// const BlogNewsletter = () => {
//   const [email, setEmail]   = useState("");
//   const [status, setStatus] = useState("idle");
//   const ref = useReveal(0);

//   const submit = () => {
//     if (!email.includes("@")) { setStatus("error"); setTimeout(() => setStatus("idle"), 2500); return; }
//     setStatus("loading");
//     setTimeout(() => { setStatus("success"); setEmail(""); }, 900);
//   };

//   return (
//     <section style={s.section}>
//       {/* Decorative rings */}
//       <div style={{ ...s.ring, top:-60, left:-60, width:220, height:220 }} />
//       <div style={{ ...s.ring, bottom:-50, right:-50, width:180, height:180 }} />
//       <div style={{ position:"absolute", top:24, right:160, fontSize:64, opacity:0.1, transform:"rotate(20deg)", pointerEvents:"none" }}>🌿</div>
//       <div style={{ position:"absolute", bottom:24, left:140, fontSize:48, opacity:0.1, transform:"rotate(-15deg)", pointerEvents:"none" }}>🥬</div>

//       <div ref={ref} style={s.inner}>
//         {/* Icon */}
//         <div style={s.iconWrap}>📬</div>

//         <span style={s.label}>Newsletter</span>
//         <h2 style={s.heading}>
//           Never Miss a <em style={{ fontStyle:"italic" }}>Fresh Recipe</em>
//         </h2>
//         <p style={s.sub}>
//           Join 12,000+ food lovers who get our best tips, seasonal recipes, and exclusive offers every week — straight to their inbox.
//         </p>

//         {/* Input */}
//         <div style={s.inputRow}>
//           <span style={s.inputIcon}>✉️</span>
//           <input
//             type="email" placeholder="Your email address"
//             value={email} onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
//             onKeyDown={e => e.key === "Enter" && submit()}
//             disabled={status === "success" || status === "loading"}
//             style={{ ...s.input, borderColor: status === "error" ? "#E05C8A" : status === "success" ? "#3BB77E" : "rgba(255,255,255,.3)" }}
//           />
//           <button onClick={submit} disabled={status === "success"} style={s.btn}
//             onMouseEnter={e => { if (status === "idle") e.currentTarget.style.background="rgba(255,255,255,.25)"; }}
//             onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.15)"}
//           >
//             {status === "loading" ? "⏳" : status === "success" ? "✅ Subscribed!" : "Subscribe →"}
//           </button>
//         </div>

//         {status === "error"   && <p style={s.errMsg}>⚠️ Please enter a valid email.</p>}
//         {status === "success" && <p style={s.okMsg}>🎉 Welcome aboard! Check your inbox.</p>}

//         {/* Trust row */}
//         <div style={s.trust}>
//           {["🔒 No Spam", "📦 Weekly Content", "🎁 Exclusive Deals", "❌ Unsubscribe Anytime"].map((t, i) => (
//             <span key={i} style={s.trustItem}>{t}</span>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 600px) {
//           .blog-nl-row { flex-direction: column !important; border-radius: 12px !important; }
//           .blog-nl-row input { border-radius: 12px 12px 0 0 !important; padding-right: 16px !important; }
//           .blog-nl-row button { border-radius: 0 0 12px 12px !important; padding: 14px !important; }
//           .blog-nl-trust { flex-direction: column !important; align-items: center !important; }
//         }
//       `}</style>
//     </section>
//   );
// };

// const s = {
//   section: {
//     position:"relative", overflow:"hidden",
//     background:"linear-gradient(135deg,#1A6B4A 0%,#2D9B68 50%,#3BB77E 100%)",
//     padding:"72px 40px",
//     fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
//     marginTop: 64,
//   },
//   ring: { position:"absolute", borderRadius:"50%", border:"2px solid rgba(255,255,255,.1)", pointerEvents:"none" },
//   inner: { maxWidth:620, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 },
//   iconWrap: { fontSize:44, marginBottom:16 },
//   label: { display:"block", fontSize:11, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,.7)", marginBottom:12 },
//   heading: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:16 },
//   sub: { color:"rgba(255,255,255,.8)", fontSize:15, lineHeight:1.7, marginBottom:32, maxWidth:480, margin:"0 auto 32px" },
//   inputRow: {
//     display:"flex", background:"rgba(255,255,255,.12)",
//     border:"1.5px solid rgba(255,255,255,.25)",
//     borderRadius:12, overflow:"hidden",
//     backdropFilter:"blur(8px)", maxWidth:500, margin:"0 auto 12px",
//   },
//   inputIcon: { padding:"0 14px", display:"flex", alignItems:"center", fontSize:18, flexShrink:0 },
//   input: {
//     flex:1, padding:"15px 10px 15px 0", background:"transparent", border:"none",
//     outline:"none", color:"#fff", fontSize:14, fontFamily:"inherit",
//     "::placeholder": { color:"rgba(255,255,255,.55)" },
//   },
//   btn: {
//     background:"rgba(255,255,255,.15)", color:"#fff",
//     border:"none", borderLeft:"1.5px solid rgba(255,255,255,.25)",
//     padding:"15px 24px", fontWeight:700, fontSize:14,
//     cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s",
//     whiteSpace:"nowrap", flexShrink:0,
//   },
//   errMsg: { color:"#FFB3C6", fontSize:13, fontWeight:500, marginTop:8 },
//   okMsg:  { color:"#A8F0CC", fontSize:13, fontWeight:600, marginTop:8 },
//   trust: { display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12, marginTop:24 },
//   trustItem: { color:"rgba(255,255,255,.7)", fontSize:12, fontWeight:500 },
// };

// export default BlogNewsletter;
import React, { useState, useRef, useEffect } from "react";
// import { T } from "./blogData.js";
import { T } from "./BlogData/blogdata";

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(32px)";
    el.style.transition = `opacity .65s cubic-bezier(.4,0,.2,1) ${delay}ms,transform .65s cubic-bezier(.4,0,.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const BlogNewsletter = () => {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle");
  const ref = useReveal(0);

  const submit = () => {
    if (!email.includes("@")) { setStatus("error"); setTimeout(() => setStatus("idle"), 2500); return; }
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setEmail(""); }, 900);
  };

  return (
    <section style={s.section}>
      {/* Decorative circles */}
      <div style={{ ...s.deco, top: -80, left: -80, width: 280, height: 280 }} />
      <div style={{ ...s.deco, bottom: -60, right: -60, width: 200, height: 200, background: "rgba(255,255,255,.06)" }} />
      <div style={{ position: "absolute", top: 28, right: 200, fontSize: 72, opacity: .09, transform: "rotate(20deg)", pointerEvents: "none", userSelect: "none" }}>🌿</div>
      <div style={{ position: "absolute", bottom: 20, left: 150, fontSize: 52, opacity: .09, transform: "rotate(-12deg)", pointerEvents: "none", userSelect: "none" }}>🥬</div>

      <div ref={ref} style={s.inner}>
        {/* Icon */}
        <div style={s.iconWrap}>📬</div>

        <span style={s.label}>Weekly Newsletter</span>
        <h2 style={s.heading}>
          Never Miss a <em style={{ fontStyle: "italic" }}>Fresh Recipe</em>
        </h2>
        <p style={s.sub}>
          Join 12,000+ food lovers getting our best tips, seasonal recipes and exclusive deals every week — straight to their inbox.
        </p>

        {/* Input row */}
        <div style={s.inputRow}>
          <span style={s.inputIcon}>✉️</span>
          <input type="email" placeholder="Your email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            disabled={status === "success" || status === "loading"}
            style={{ ...s.input, borderColor: status === "error" ? "#ff6b9d" : status === "success" ? T.green : "rgba(255,255,255,.3)" }}
          />
          <button onClick={submit} disabled={status === "success"} style={s.btn}
            onMouseEnter={e => { if (status === "idle") e.currentTarget.style.background = "rgba(255,255,255,.28)"; }}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.15)"}
          >
            {status === "loading" ? "⏳" : status === "success" ? "✅ Subscribed!" : "Subscribe →"}
          </button>
        </div>

        {status === "error"   && <p style={s.errMsg}>⚠️ Please enter a valid email address.</p>}
        {status === "success" && <p style={s.okMsg}>🎉 Welcome aboard! Check your inbox for a welcome gift.</p>}

        {/* Trust row */}
        <div style={s.trust}>
          {["🔒 No Spam", "📦 Weekly Content", "🎁 Exclusive Deals", "❌ Unsubscribe Anytime"].map((t, i) => (
            <span key={i} style={s.trustItem}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:600px){
          .nl-row { flex-direction: column !important; }
          .nl-row input { border-radius: 12px 12px 0 0 !important; }
          .nl-row button { border-radius: 0 0 12px 12px !important; padding: 14px !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,.2) !important; }
          .nl-trust { flex-direction: column !important; align-items: center !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
};

const s = {
  section: { position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#1A6B4A 0%,#2D9B68 50%,#3BB77E 100%)", padding: "80px 40px", fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", marginTop: 64 },
  deco: { position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,.07)", pointerEvents: "none" },
  inner: { maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 },
  iconWrap: { fontSize: 48, marginBottom: 16 },
  label: { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: 12 },
  heading: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, color: "#fff", lineHeight: 1.18, marginBottom: 16 },
  sub: { color: "rgba(255,255,255,.78)", fontSize: 15, lineHeight: 1.75, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" },
  inputRow: { display: "flex", background: "rgba(255,255,255,.12)", border: "1.5px solid rgba(255,255,255,.25)", borderRadius: 14, overflow: "hidden", backdropFilter: "blur(10px)", maxWidth: 520, margin: "0 auto 12px" },
  inputIcon: { padding: "0 14px", display: "flex", alignItems: "center", fontSize: 18, flexShrink: 0 },
  input: { flex: 1, padding: "16px 10px 16px 0", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "inherit" },
  btn: { background: "rgba(255,255,255,.15)", color: "#fff", border: "none", borderLeft: "1.5px solid rgba(255,255,255,.25)", padding: "16px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "background .2s", flexShrink: 0, whiteSpace: "nowrap" },
  errMsg: { color: "#FFB3C6", fontSize: 13, fontWeight: 500, marginTop: 8 },
  okMsg: { color: "#A8F0CC", fontSize: 13, fontWeight: 600, marginTop: 8 },
  trust: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, marginTop: 28 },
  trustItem: { color: "rgba(255,255,255,.65)", fontSize: 12, fontWeight: 500 },
};

export default BlogNewsletter;