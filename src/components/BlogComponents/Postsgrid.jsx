// import React, { useState, useRef, useEffect } from "react";
// // import { POSTS, T } from "./blogData.js";
// import { POSTS,T } from "./BlogData/blogdata";

// const useReveal = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     el.style.opacity = "0"; el.style.transform = "translateY(28px)";
//     el.style.transition = `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
//     }, { threshold: 0.08 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// const POSTS_PER_PAGE = 4;

// // ── Single Post Card ───────────────────────────────────────────────────────
// const PostCard = ({ post, delay, onReadPost }) => {
//   const ref = useReveal(delay);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <article
//       ref={ref}
//       style={{ ...s.card, boxShadow: hovered ? "0 20px 56px rgba(29,53,87,.13)" : "0 2px 16px rgba(29,53,87,.06)", transform: hovered ? "translateY(-8px)" : "translateY(0)" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Image */}
//       <div style={s.imgWrap}>
//         <img src={post.image} alt={post.title} style={{ ...s.img, transform: hovered ? "scale(1.06)" : "scale(1)" }} />
//         <span style={s.chip}>{post.category}</span>
//         <span style={s.readTime}>⏱ {post.readTime}</span>
//       </div>

//       {/* Body */}
//       <div style={s.body}>
//         {/* Author + date */}
//         <div style={s.meta}>
//           <img src={post.author.avatar} alt={post.author.name} style={s.avatar} />
//           <div>
//             <div style={s.authorName}>{post.author.name}</div>
//             <div style={s.date}>{post.date}</div>
//           </div>
//         </div>

//         <h3 style={{ ...s.title, color: hovered ? T.green : T.navy }}>{post.title}</h3>
//         <p style={s.excerpt}>{post.excerpt}</p>

//         {/* Tags */}
//         <div style={s.tags}>
//           {post.tags.slice(0,2).map((t,i) => <span key={i} style={s.tag}>#{t}</span>)}
//         </div>

//         {/* Read more */}
//         <button
//           onClick={() => onReadPost && onReadPost(post)}
//           style={{ ...s.readBtn, color: hovered ? T.greenDark : T.green }}
//         >
//           Read Article <span style={{ transition:"margin 0.2s", marginLeft: hovered ? 8:4 }}>→</span>
//         </button>
//       </div>
//     </article>
//   );
// };

// // ── Pagination ─────────────────────────────────────────────────────────────
// const Pagination = ({ current, total, onChange }) => {
//   const pages = Array.from({ length: total }, (_, i) => i + 1);
//   return (
//     <div style={s.pagination}>
//       <button
//         style={{ ...s.pageBtn, opacity: current === 1 ? 0.4 : 1 }}
//         disabled={current === 1}
//         onClick={() => onChange(current - 1)}
//       >← Prev</button>

//       {pages.map(p => (
//         <button
//           key={p}
//           style={{ ...s.pageBtn, ...(p === current ? s.pageBtnActive : {}) }}
//           onClick={() => onChange(p)}
//           onMouseEnter={e => { if (p !== current) { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}}
//           onMouseLeave={e => { if (p !== current) { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.text; }}}
//         >{p}</button>
//       ))}

//       <button
//         style={{ ...s.pageBtn, opacity: current === total ? 0.4 : 1 }}
//         disabled={current === total}
//         onClick={() => onChange(current + 1)}
//       >Next →</button>
//     </div>
//   );
// };

// // ── Main Component ─────────────────────────────────────────────────────────
// const PostsGrid = ({ searchQuery, activeCategory, onReadPost }) => {
//   const [page, setPage] = useState(1);

//   // Filter posts
//   const nonFeatured = POSTS.filter(p => !p.featured);
//   const filtered = nonFeatured.filter(p => {
//     const matchCat = !activeCategory || p.category === activeCategory;
//     const matchQ   = !searchQuery   || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCat && matchQ;
//   });

//   const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
//   const paginated  = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

//   // Reset page on filter change
//   useEffect(() => setPage(1), [searchQuery, activeCategory]);

//   return (
//     <div style={s.section}>
//       {/* Header row */}
//       <div style={s.header}>
//         <div>
//           <h2 style={s.heading}>Latest <em style={{ color:T.green, fontStyle:"italic" }}>Articles</em></h2>
//           <div style={s.divider} />
//         </div>
//         <span style={s.count}>{filtered.length} articles</span>
//       </div>

//       {/* Grid */}
//       {paginated.length > 0 ? (
//         <div style={s.grid}>
//           {paginated.map((post, i) => (
//             <PostCard key={post.id} post={post} delay={i * 80} onReadPost={onReadPost} />
//           ))}
//         </div>
//       ) : (
//         <div style={s.empty}>
//           <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
//           <h3 style={{ color:T.navy, fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24 }}>No articles found</h3>
//           <p style={{ color:T.textLight, fontSize:14 }}>Try a different search term or category.</p>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Pagination current={page} total={totalPages} onChange={p => { setPage(p); window.scrollTo({ top: 400, behavior:"smooth" }); }} />
//       )}

//       <style>{`
//         @media (max-width: 700px) {
//           .posts-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// const s = {
//   section: { fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" },
//   header: { display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28 },
//   heading: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(26px,3vw,36px)", fontWeight:700, color:T.navy },
//   divider: { width:40, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, marginTop:10 },
//   count: { fontSize:13, color:T.textLight, fontWeight:500 },
//   grid: {
//     display:"grid", gridTemplateColumns:"repeat(2,1fr)",
//     gap:24, marginBottom:40,
//   },
//   card: {
//     background:"#fff", borderRadius:20,
//     border:"1.5px solid #EEF4F0", overflow:"hidden",
//     transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s",
//     cursor:"pointer", display:"flex", flexDirection:"column",
//   },
//   imgWrap: { position:"relative", overflow:"hidden", height:210 },
//   img: { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)" },
//   chip: {
//     position:"absolute", top:14, left:14,
//     background:T.green, color:"#fff", fontSize:10, fontWeight:700,
//     letterSpacing:0.8, textTransform:"uppercase", padding:"4px 10px", borderRadius:40,
//   },
//   readTime: {
//     position:"absolute", bottom:14, right:14,
//     background:"rgba(0,0,0,.55)", color:"#fff", fontSize:11, fontWeight:600,
//     padding:"4px 10px", borderRadius:40, backdropFilter:"blur(4px)",
//   },
//   body: { padding:"22px 22px 20px", display:"flex", flexDirection:"column", flex:1 },
//   meta: { display:"flex", alignItems:"center", gap:10, marginBottom:14 },
//   avatar: { width:34, height:34, borderRadius:"50%", objectFit:"cover", border:`2px solid ${T.greenLight}` },
//   authorName: { fontSize:13, fontWeight:700, color:T.navy, lineHeight:1.2 },
//   date: { fontSize:11, color:T.textLight, marginTop:1 },
//   title: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:700, lineHeight:1.3, marginBottom:10, transition:"color 0.2s" },
//   excerpt: { color:T.text, fontSize:13, lineHeight:1.75, marginBottom:14, flex:1 },
//   tags: { display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 },
//   tag: { background:T.greenLight, color:T.greenDeep, fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:40 },
//   readBtn: {
//     background:"none", border:"none", fontFamily:"inherit",
//     fontSize:13, fontWeight:700, cursor:"pointer", display:"flex",
//     alignItems:"center", gap:4, padding:0, transition:"color 0.2s",
//   },
//   pagination: { display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" },
//   pageBtn: {
//     background:"#fff", color:T.text, border:`1.5px solid ${T.border}`,
//     borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600,
//     cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
//   },
//   pageBtnActive: { background:T.green, color:"#fff", border:`1.5px solid ${T.green}` },
//   empty: { textAlign:"center", padding:"60px 20px", color:T.text },
// };

// const { greenDeep: _gd, greenLight: _gl, greenDark: _gdk } = T;

// export default PostsGrid;
import React, { useState, useEffect } from "react";
import { POSTS,T } from "./BlogData/blogdata.js";
import PostCard from "./PostCard.jsx";

const PER_PAGE = 6;

const Pagination = ({ current, total, onChange }) => (
  <div style={s.pagination}>
    <button disabled={current === 1}
      style={{ ...s.pgBtn, opacity: current === 1 ? .4 : 1 }}
      onClick={() => onChange(current - 1)}
    >← Prev</button>

    {Array.from({ length: total }, (_, i) => i + 1).map(p => (
      <button key={p}
        style={{ ...s.pgBtn, ...(p === current ? s.pgBtnActive : {}) }}
        onClick={() => onChange(p)}
        onMouseEnter={e => { if (p !== current) { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.color = T.green; }}}
        onMouseLeave={e => { if (p !== current) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.text; }}}
      >{p}</button>
    ))}

    <button disabled={current === total}
      style={{ ...s.pgBtn, opacity: current === total ? .4 : 1 }}
      onClick={() => onChange(current + 1)}
    >Next →</button>
  </div>
);

const PostsGrid = ({ searchQuery, activeCategory, onReadPost }) => {
  const [page, setPage] = useState(1);

  const filtered = POSTS.filter(p => {
    if (p.featured) return false;
    const matchCat = !activeCategory || activeCategory === "All" || p.category === activeCategory;
    const matchQ   = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return matchCat && matchQ;
  });

  const total    = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [searchQuery, activeCategory]);

  return (
    <div style={s.section}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h2 style={s.heading}>
            Latest <em style={{ color: T.green, fontStyle: "italic" }}>Articles</em>
          </h2>
          <div style={s.divider} />
        </div>
        <span style={s.count}>{filtered.length} articles found</span>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div style={s.grid}>
          {paginated.map((post, i) => (
            <PostCard key={post.id} post={post} delay={i * 70} onReadPost={onReadPost} large={i === 0} />
          ))}
        </div>
      ) : (
        <div style={s.empty}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <h3 style={{ color: T.navy, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 26, marginBottom: 8 }}>No articles found</h3>
          <p style={{ color: T.textLight, fontSize: 14 }}>Try a different search term or category.</p>
        </div>
      )}

      {/* Pagination */}
      {total > 1 && <Pagination current={page} total={total} onChange={p => { setPage(p); window.scrollTo({ top: 500, behavior: "smooth" }); }} />}

      <style>{`
        @media(max-width:700px){ .pg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

const s = {
  section: { fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 },
  heading: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: T.navy },
  divider: { width: 40, height: 3, background: `linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius: 99, marginTop: 10 },
  count: { fontSize: 13, color: T.textLight, fontWeight: 500 },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginBottom: 40 },
  empty: { textAlign: "center", padding: "64px 20px" },
  pagination: { display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" },
  pgBtn: { background: "#fff", color: T.text, border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", transition: "all .2s" },
  pgBtnActive: { background: T.green, color: "#fff", border: `1.5px solid ${T.green}` },
};

export default PostsGrid;