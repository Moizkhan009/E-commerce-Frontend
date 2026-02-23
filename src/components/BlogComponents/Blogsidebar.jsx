// import React, { useState } from "react";
// // import { CATEGORIES, TAGS, POSTS, T } from "./blogData.js";
// import { CATEGORIES,TAGS,POSTS,T } from "./BlogData/blogdata";

// const BlogSidebar = ({ onSearch, onCategory, onTag, activeCategory, onReadPost }) => {
//   const [query, setQuery] = useState("");
//   const recent = POSTS.slice(0, 3);

//   return (
//     <aside style={s.sidebar}>

//       {/* ── Search ── */}
//       <div style={s.widget}>
//         <h4 style={s.widgetTitle}>🔍 Search</h4>
//         <div style={s.searchRow}>
//           <input
//             type="text" placeholder="Search posts…"
//             value={query} onChange={e => setQuery(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && onSearch && onSearch(query)}
//             style={s.searchInput}
//           />
//           <button
//             onClick={() => onSearch && onSearch(query)}
//             style={s.searchBtn}
//             onMouseEnter={e => e.currentTarget.style.background=T.greenDark}
//             onMouseLeave={e => e.currentTarget.style.background=T.green}
//           >→</button>
//         </div>
//       </div>

//       {/* ── Categories ── */}
//       <div style={s.widget}>
//         <h4 style={s.widgetTitle}>📂 Categories</h4>
//         <div style={s.catList}>
//           {CATEGORIES.map((cat, i) => (
//             <div
//               key={i} style={{ ...s.catItem, ...(activeCategory === cat.name ? s.catItemActive : {}) }}
//               onClick={() => onCategory && onCategory(cat.name)}
//               onMouseEnter={e => { if (activeCategory !== cat.name) { e.currentTarget.style.background=T.greenPale; e.currentTarget.style.color=T.green; }}}
//               onMouseLeave={e => { if (activeCategory !== cat.name) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.text; }}}
//             >
//               <span style={s.catDot} />
//               <span style={{ flex:1 }}>{cat.name}</span>
//               <span style={{ ...s.catCount, ...(activeCategory === cat.name ? s.catCountActive : {}) }}>{cat.count}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Recent Posts ── */}
//       <div style={s.widget}>
//         <h4 style={s.widgetTitle}>🕐 Recent Posts</h4>
//         <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//           {recent.map((post, i) => (
//             <div key={i} style={s.recentItem}
//               onClick={() => onReadPost && onReadPost(post)}
//               onMouseEnter={e => e.currentTarget.querySelector("p").style.color=T.green}
//               onMouseLeave={e => e.currentTarget.querySelector("p").style.color=T.navy}
//             >
//               <img src={post.image} alt={post.title} style={s.recentImg} />
//               <div>
//                 <p style={{ ...s.recentTitle, transition:"color 0.2s" }}>{post.title}</p>
//                 <span style={s.recentDate}>{post.date}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Tags ── */}
//       <div style={s.widget}>
//         <h4 style={s.widgetTitle}>🏷️ Popular Tags</h4>
//         <div style={s.tagCloud}>
//           {TAGS.map((tag, i) => (
//             <button key={i} style={s.tag}
//               onClick={() => onTag && onTag(tag)}
//               onMouseEnter={e => { e.currentTarget.style.background=T.green; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor=T.green; }}
//               onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.text; e.currentTarget.style.borderColor=T.border; }}
//             >#{tag}</button>
//           ))}
//         </div>
//       </div>

//       {/* ── Promo banner ── */}
//       <div style={s.promo}>
//         <div style={s.promoEmoji}>🥦</div>
//         <h5 style={s.promoTitle}>Get 20% Off Your First Order</h5>
//         <p style={s.promoText}>Fresh organic groceries delivered to your door.</p>
//         <button style={s.promoBtn}
//           onMouseEnter={e => e.currentTarget.style.background="#fff"}
//           onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.15)"}
//         >Shop Now →</button>
//       </div>

//     </aside>
//   );
// };

// const s = {
//   sidebar: {
//     display:"flex", flexDirection:"column", gap:24,
//     fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
//     width:"100%",
//   },
//   widget: {
//     background:"#fff", borderRadius:18, padding:"24px",
//     boxShadow:"0 2px 16px rgba(29,53,87,.06)", border:"1.5px solid #EEF4F0",
//   },
//   widgetTitle: {
//     fontFamily:"'Cormorant Garamond',Georgia,serif",
//     fontSize:19, fontWeight:700, color:T.navy, marginBottom:18,
//   },
//   searchRow: { display:"flex", borderRadius:10, overflow:"hidden", border:`1.5px solid ${T.border}` },
//   searchInput: {
//     flex:1, padding:"11px 14px", border:"none", outline:"none",
//     fontSize:13, fontFamily:"inherit", color:T.navy, background:"transparent",
//   },
//   searchBtn: {
//     background:T.green, color:"#fff", border:"none",
//     padding:"11px 18px", fontWeight:700, fontSize:16, cursor:"pointer",
//     transition:"background 0.2s",
//   },
//   catList: { display:"flex", flexDirection:"column", gap:4 },
//   catItem: {
//     display:"flex", alignItems:"center", gap:10,
//     padding:"10px 12px", borderRadius:10, cursor:"pointer",
//     color:T.text, fontSize:14, fontWeight:500, transition:"all 0.2s",
//   },
//   catItemActive: { background:T.greenLight, color:T.green, fontWeight:700 },
//   catDot: { width:6, height:6, borderRadius:"50%", background:T.green, flexShrink:0 },
//   catCount: {
//     background:T.offWhite, color:T.textLight,
//     fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:40,
//   },
//   catCountActive: { background:T.green, color:"#fff" },
//   recentItem: {
//     display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer",
//   },
//   recentImg: { width:64, height:64, borderRadius:10, objectFit:"cover", flexShrink:0 },
//   recentTitle: { fontSize:13, fontWeight:600, color:T.navy, lineHeight:1.5, marginBottom:4 },
//   recentDate: { fontSize:11, color:T.textLight },
//   tagCloud: { display:"flex", flexWrap:"wrap", gap:8 },
//   tag: {
//     background:"transparent", color:T.text, border:`1.5px solid ${T.border}`,
//     borderRadius:40, padding:"5px 12px", fontSize:12, fontWeight:600,
//     cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
//   },
//   promo: {
//     background:"linear-gradient(135deg,#2D9B68,#3BB77E)",
//     borderRadius:18, padding:"28px 24px", textAlign:"center",
//     color:"#fff",
//   },
//   promoEmoji: { fontSize:40, marginBottom:12 },
//   promoTitle: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:700, marginBottom:8 },
//   promoText: { fontSize:13, opacity:0.85, lineHeight:1.6, marginBottom:18 },
//   promoBtn: {
//     background:"rgba(255,255,255,.15)", color:"#fff",
//     border:"1.5px solid rgba(255,255,255,.5)", borderRadius:8,
//     padding:"10px 22px", fontWeight:700, fontSize:13,
//     cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s",
//   },
// };

// // expose T tokens used in JSX
// const { greenPale: _gp, offWhite: _ow, greenDeep: _gd, greenLight: _gl } = T;

// export default BlogSidebar;
import React, { useState } from "react";
// import { CATEGORIES, TAGS, POSTS, T } from "./blogData.js";
import { CATEGORIES,TAGS,POSTS,T } from "./BlogData/blogdata";
import { useNavigate } from "react-router-dom";

const BlogSidebar = ({ onSearch, onCategory, onTag, activeCategory, onReadPost }) => {
    const navigate=useNavigate();
  const [query, setQuery] = useState("");
  const recent = POSTS.filter(p => !p.featured).slice(0, 4);

  return (
    <aside style={s.sidebar}>

      {/* ── Search ── */}
      <div style={s.widget}>
        <h4 style={s.wTitle}>🔍 Search Articles</h4>
        <div style={s.searchRow}>
          <input type="text" placeholder="Search…" value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSearch && onSearch(query)}
            style={s.searchInput}
          />
          <button onClick={() => onSearch && onSearch(query)} style={s.searchBtn}
            onMouseEnter={e => e.currentTarget.style.background = T.greenDark}
            onMouseLeave={e => e.currentTarget.style.background = T.green}
          >→</button>
        </div>
      </div>

      {/* ── Categories ── */}
      <div style={s.widget}>
        <h4 style={s.wTitle}>📂 Categories</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {CATEGORIES.map((cat, i) => {
            const active = (activeCategory || "All") === cat.name;
            return (
              <div key={i}
                onClick={() => onCategory && onCategory(cat.name)}
                style={{ ...s.catRow, ...(active ? s.catRowActive : {}) }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.greenPale; e.currentTarget.style.color = T.green; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.text; }}}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? "#fff" : T.green, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: active ? 700 : 500 }}>{cat.name}</span>
                </div>
                <span style={{ ...s.catBadge, ...(active ? s.catBadgeActive : {}) }}>{cat.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recent Posts ── */}
      <div style={s.widget}>
        <h4 style={s.wTitle}>🕐 Recent Posts</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {recent.map((post, i) => (
            <div key={i} style={s.recentItem} onClick={() => onReadPost && onReadPost(post)}
              onMouseEnter={e => { e.currentTarget.querySelector(".rt").style.color = T.green; e.currentTarget.style.background = T.greenPale; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".rt").style.color = T.navy; e.currentTarget.style.background = "transparent"; }}
            >
              <div style={s.recentImgWrap}>
                <img src={post.image} alt={post.title} style={s.recentImg} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="rt" style={{ fontSize: 13, fontWeight: 600, color: T.navy, lineHeight: 1.45, marginBottom: 4, transition: "color .2s" }}>{post.title}</p>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, background: T.greenLight, color: T.green, fontWeight: 700, padding: "2px 7px", borderRadius: 40 }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: T.textLight }}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tags ── */}
      <div style={s.widget}>
        <h4 style={s.wTitle}>🏷️ Popular Tags</h4>
        <div style={s.tagCloud}>
          {TAGS.map((tag, i) => (
            <button key={i} style={s.tag}
              onClick={() => onTag && onTag(tag)}
              onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = T.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.border; }}
            >#{tag}</button>
          ))}
        </div>
      </div>

      {/* ── Promo banner ── */}
      <div style={s.promo}>
        <div style={s.promoLeaf}>🌱</div>
        <h5 style={s.promoTitle}>Get 20% Off Your First Order</h5>
        <p style={s.promoText}>Fresh organic groceries, delivered same day to your door.</p>
        <button
        onClick={()=>navigate("/home")}
         style={s.promoBtn}
          onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.greenDeep; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.15)"; e.currentTarget.style.color = "#fff"; }}
        >Shop Now →</button>
      </div>

    </aside>
  );
};

const s = {
  sidebar: { display: "flex", flexDirection: "column", gap: 20, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" },
  widget: { background: "#fff", borderRadius: 20, padding: "24px", boxShadow: "0 2px 16px rgba(29,53,87,.06)", border: `1.5px solid ${T.border}` },
  wTitle: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 700, color: T.navy, marginBottom: 18 },
  searchRow: { display: "flex", borderRadius: 10, overflow: "hidden", border: `1.5px solid ${T.border}` },
  searchInput: { flex: 1, padding: "11px 14px", border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", color: T.navy, background: "transparent" },
  searchBtn: { background: T.green, color: "#fff", border: "none", padding: "11px 18px", fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "background .2s" },
  catRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 10, cursor: "pointer", color: T.text, transition: "all .2s" },
  catRowActive: { background: T.green, color: "#fff" },
  catBadge: { background: T.offWhite, color: T.textLight, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 },
  catBadgeActive: { background: "rgba(255,255,255,.25)", color: "#fff" },
  recentItem: { display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", padding: "8px", borderRadius: 12, transition: "background .2s", margin: "-8px" },
  recentImgWrap: { width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0 },
  recentImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  tagCloud: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: { background: "transparent", color: T.text, border: `1.5px solid ${T.border}`, borderRadius: 40, padding: "5px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  promo: { background: "linear-gradient(135deg,#1A6B4A,#3BB77E)", borderRadius: 20, padding: "30px 24px", textAlign: "center", color: "#fff", position: "relative", overflow: "hidden" },
  promoLeaf: { fontSize: 44, marginBottom: 12 },
  promoTitle: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 700, marginBottom: 10 },
  promoText: { fontSize: 13, opacity: .82, lineHeight: 1.65, marginBottom: 20 },
  promoBtn: { background: "rgba(255,255,255,.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,.45)", borderRadius: 10, padding: "11px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all .22s" },
};

// expose tokens used in JSX
const { greenPale: _gp, greenDeep: _gd, offWhite: _ow } = T;

export default BlogSidebar;