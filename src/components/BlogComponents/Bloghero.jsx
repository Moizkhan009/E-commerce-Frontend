// import React from "react";

// const BlogHero = ({ onSearch }) => {
//   const [query, setQuery] = React.useState("");

//   const handleKey = (e) => {
//     if (e.key === "Enter" && onSearch) onSearch(query);
//   };

//   return (
//     <section style={s.section}>
//       {/* BG image with overlay */}
//       <div style={s.bg} />
//       <div style={s.overlay} />

//       {/* Dot grid */}
//       <div style={s.dotGrid} />

//       <div style={s.inner}>
//         {/* Breadcrumb */}
//         {/* <div style={s.breadcrumb}>
//           <a href="/"     style={s.bcLink}>🏠 Home</a>
//           <span style={s.bcSep}>/</span>
//           <span style={s.bcActive}>Blog</span>
//         </div> */}

//         {/* Headline */}
//         <h1 style={s.heading}>
//           Fresh <em style={{ fontStyle:"italic", color:"#A8EDC8" }}>Stories</em>,<br />
//           Straight from the Farm
//         </h1>
//         <p style={s.sub}>
//           Tips, recipes, nutrition guides and seasonal inspiration — everything you need to eat better and live well.
//         </p>

//         {/* Search bar */}
//         <div style={s.searchWrap}>
//           <span style={s.searchIcon}>🔍</span>
//           <input
//             type="text"
//             placeholder="Search articles, recipes, tips…"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//             onKeyDown={handleKey}
//             style={s.searchInput}
//           />
//           <button
//             onClick={() => onSearch && onSearch(query)}
//             style={s.searchBtn}
//             onMouseEnter={e => e.currentTarget.style.background = "#28976A"}
//             onMouseLeave={e => e.currentTarget.style.background = "#3BB77E"}
//           >
//             Search
//           </button>
//         </div>

//         {/* Quick category pills */}
//         <div style={s.pills}>
//           {["All", "Nutrition", "Cooking Tips", "Seasonal", "Health", "Shopping Tips"].map((c, i) => (
//             <button key={i} style={{ ...s.pill, ...(i === 0 ? s.pillActive : {}) }}
//               onMouseEnter={e => { if (i !== 0) { e.currentTarget.style.background="rgba(255,255,255,.2)"; e.currentTarget.style.color="#fff"; }}}
//               onMouseLeave={e => { if (i !== 0) { e.currentTarget.style.background="rgba(255,255,255,.08)"; e.currentTarget.style.color="rgba(255,255,255,.75)"; }}}
//             >{c}</button>
//           ))}
//         </div>
//       </div>

//       {/* Responsive styles */}
//       <style>{`
//         @media (max-width: 768px) {
//           .blog-hero-inner { padding: 48px 20px 52px !important; }
//           .blog-hero-h1 { font-size: 32px !important; }
//           .blog-hero-search { flex-direction: column !important; border-radius: 14px !important; }
//           .blog-hero-search input { border-radius: 14px 14px 0 0 !important; border-right: none !important; border-bottom: 1px solid #eee !important; }
//           .blog-hero-search button { border-radius: 0 0 14px 14px !important; padding: 13px !important; }
//           .blog-hero-pills { gap: 8px !important; }
//         }
//       `}</style>
//     </section>
//   );
// };

// const s = {
//   section: { position:"relative", overflow:"hidden", background:"#1D3557" },
//   bg: {
//     position:"absolute", inset:0,
//     backgroundImage:"url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80)",
//     backgroundSize:"cover", backgroundPosition:"center",
//     filter:"brightness(0.35)",
//   },
//   overlay: {
//     position:"absolute", inset:0,
//     background:"linear-gradient(135deg,rgba(29,53,87,.7) 0%,rgba(59,183,126,.35) 100%)",
//   },
//   dotGrid: {
//     position:"absolute", inset:0,
//     backgroundImage:"radial-gradient(circle at 2px 2px,rgba(255,255,255,.06) 1px,transparent 0)",
//     backgroundSize:"32px 32px", pointerEvents:"none",
//   },
//   inner: {
//     position:"relative", zIndex:2,
//     maxWidth:820, margin:"0 auto",
//     padding:"72px 40px 80px",
//     textAlign:"center",
//     fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
//   },
//   breadcrumb: { display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginBottom:24 },
//   bcLink:   { color:"rgba(255,255,255,.65)", textDecoration:"none", fontSize:13 },
//   bcSep:    { color:"rgba(255,255,255,.4)", fontSize:13 },
//   bcActive: { color:"#3BB77E", fontSize:13, fontWeight:600 },
//   heading: {
//     fontFamily:"'Cormorant Garamond',Georgia,serif",
//     fontSize:"clamp(36px,6vw,60px)", fontWeight:700,
//     color:"#fff", lineHeight:1.15, marginBottom:18,
//   },
//   sub: { color:"rgba(255,255,255,.75)", fontSize:16, lineHeight:1.7, marginBottom:36, maxWidth:560, margin:"0 auto 36px" },
//   searchWrap: {
//     display:"flex", maxWidth:560, margin:"0 auto 28px",
//     background:"#fff", borderRadius:14,
//     boxShadow:"0 8px 32px rgba(0,0,0,.25)",
//     overflow:"hidden",
//   },
//   searchIcon: { padding:"0 14px", display:"flex", alignItems:"center", fontSize:18, flexShrink:0 },
//   searchInput: {
//     flex:1, padding:"15px 12px", border:"none", outline:"none",
//     fontSize:14, fontFamily:"inherit", color:"#253D4E", background:"transparent",
//   },
//   searchBtn: {
//     background:"#3BB77E", color:"#fff", border:"none",
//     padding:"15px 28px", fontWeight:700, fontSize:14,
//     cursor:"pointer", fontFamily:"inherit", transition:"background 0.22s",
//     flexShrink:0,
//   },
//   pills: { display:"flex", justifyContent:"center", flexWrap:"wrap", gap:10 },
//   pill: {
//     background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.75)",
//     border:"1.5px solid rgba(255,255,255,.2)", borderRadius:40,
//     padding:"7px 18px", fontSize:13, fontWeight:600, cursor:"pointer",
//     fontFamily:"inherit", transition:"all 0.2s",
//   },
//   pillActive: { background:"#3BB77E", color:"#fff", border:"1.5px solid #3BB77E" },
// };

// export default BlogHero;
import React, { useState } from "react";
// import { CATEGORIES, T } from "./blogData.js";
import { CATEGORIES,T } from "./BlogData/blogdata";

const BlogHero = ({ onSearch, onCategory, activeCategory }) => {
  const [query, setQuery] = useState("");

  const submit = () => onSearch && onSearch(query);

  return (
    <section style={s.section}>
      {/* BG layers */}
      <div style={s.bgImg} />
      <div style={s.bgOverlay} />
      <div style={s.bgDots} />

      {/* Floating blobs */}
      <div style={{ ...s.blob, top: -80, left: -80, width: 320, height: 320 }} />
      <div style={{ ...s.blob, bottom: -60, right: -60, width: 240, height: 240, background: "rgba(59,183,126,.12)" }} />

      <div style={s.inner}>
        {/* Label */}
        <div style={s.labelRow}>
          <span style={s.labelDot} />
          <span style={s.labelText}>Nest Journal</span>
          <span style={s.labelDot} />
        </div>

        {/* Heading */}
        <h1 style={s.heading}>
          Fresh <em style={{ fontStyle: "italic", color: "#A8EDC8" }}>Stories</em> &amp;<br />
          Farm Inspiration
        </h1>
        <p style={s.sub}>
          Recipes, nutrition guides, seasonal tips and everything you need to eat better, live well and shop smarter.
        </p>

        {/* Search */}
        <div style={s.searchBox}>
          <span style={s.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search articles, recipes, tips…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            style={s.searchInput}
          />
          <button onClick={submit} style={s.searchBtn}
            onMouseEnter={e => e.currentTarget.style.background = T.greenDark}
            onMouseLeave={e => e.currentTarget.style.background = T.green}
          >Search</button>
        </div>

        {/* Category pills */}
        <div style={s.pills}>
          {CATEGORIES.map((cat, i) => {
            const active = (activeCategory || "All") === cat.name;
            return (
              <button key={i}
                onClick={() => onCategory && onCategory(cat.name)}
                style={{ ...s.pill, ...(active ? s.pillActive : {}) }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,.18)"; e.currentTarget.style.color = "#fff"; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "rgba(255,255,255,.7)"; }}}
              >
                {cat.name}
                <span style={{ ...s.pillCount, ...(active ? { background: "rgba(255,255,255,.3)" } : {}) }}>{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Stats row */}
        <div style={s.statsRow}>
          {[{ n: "48+", l: "Articles" }, { n: "12K", l: "Readers" }, { n: "6", l: "Categories" }].map((st, i) => (
            <React.Fragment key={i}>
              <div style={s.stat}>
                <div style={s.statN}>{st.n}</div>
                <div style={s.statL}>{st.l}</div>
              </div>
              {i < 2 && <div style={s.statSep} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .bh-inner { padding: 52px 20px 60px !important; }
          .bh-h1 { font-size: 34px !important; }
          .bh-search { flex-direction: column !important; border-radius: 14px !important; }
          .bh-search input { padding-right: 16px !important; }
          .bh-search button { border-radius: 0 0 12px 12px !important; padding: 13px !important; }
          .bh-pills { gap: 8px !important; }
        }
      `}</style>
    </section>
  );
};

const s = {
  section: { position: "relative", overflow: "hidden", background: "#1D3557", fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" },
  bgImg: {
    position: "absolute", inset: 0,
    backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80)",
    backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.28)",
  },
  bgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(29,53,87,.75) 0%,rgba(59,183,126,.3) 100%)" },
  bgDots: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 2px 2px,rgba(255,255,255,.05) 1px,transparent 0)", backgroundSize: "30px 30px", pointerEvents: "none" },
  blob: { position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,.05)", pointerEvents: "none" },
  inner: { position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "80px 40px 88px", textAlign: "center" },
  labelRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 },
  labelDot: { width: 6, height: 6, borderRadius: "50%", background: T.green, display: "inline-block" },
  labelText: { fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.65)" },
  heading: {
    fontFamily: "'Cormorant Garamond',Georgia,serif",
    fontSize: "clamp(38px,7vw,68px)", fontWeight: 700,
    color: "#fff", lineHeight: 1.12, marginBottom: 20,
  },
  sub: { color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.75, marginBottom: 40, maxWidth: 540, margin: "0 auto 40px" },
  searchBox: {
    display: "flex", maxWidth: 580, margin: "0 auto 32px",
    background: "#fff", borderRadius: 16,
    boxShadow: "0 12px 48px rgba(0,0,0,.28)", overflow: "hidden",
  },
  searchIcon: { padding: "0 16px", display: "flex", alignItems: "center", fontSize: 18, flexShrink: 0 },
  searchInput: { flex: 1, padding: "16px 12px", border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", color: T.navy, background: "transparent" },
  searchBtn: { background: T.green, color: "#fff", border: "none", padding: "16px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "background .2s", flexShrink: 0 },
  pills: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: 40 },
  pill: { background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.7)", border: "1.5px solid rgba(255,255,255,.18)", borderRadius: 40, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", display: "flex", alignItems: "center", gap: 7 },
  pillActive: { background: T.green, color: "#fff", border: `1.5px solid ${T.green}` },
  pillCount: { background: "rgba(255,255,255,.18)", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "1px 7px" },
  statsRow: { display: "flex", justifyContent: "center", alignItems: "center", gap: 32 },
  stat: { textAlign: "center" },
  statN: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1 },
  statL: { fontSize: 11, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 },
  statSep: { width: 1, height: 36, background: "rgba(255,255,255,.2)" },
};

export default BlogHero;