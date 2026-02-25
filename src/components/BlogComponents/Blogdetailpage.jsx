// import React, { useState, useEffect, useRef } from "react";
// // import { POSTS, T } from "./blogData.js";
// import { POSTS,T } from "./BlogData/blogdata.js";
// import BlogNewsletter from "./BlogNewsletter.jsx";

// const useReveal = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     el.style.opacity = "0"; el.style.transform = "translateY(28px)";
//     el.style.transition = `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
//     }, { threshold: 0.08 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// // ── Table of Contents ──────────────────────────────────────────────────────
// const TOC = ({ items }) => (
//   <div style={s.toc}>
//     <h4 style={s.tocTitle}>📋 In This Article</h4>
//     <ul style={{ listStyle:"none", padding:0, margin:0 }}>
//       {items.map((item, i) => (
//         <li key={i} style={s.tocItem}>
//           <span style={s.tocNum}>{i + 1}</span>
//           <a href={`#section-${i}`} style={s.tocLink}
//             onMouseEnter={e => e.currentTarget.style.color=T.green}
//             onMouseLeave={e => e.currentTarget.style.color=T.text}
//           >{item}</a>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// // ── Related Post Card ──────────────────────────────────────────────────────
// const RelatedCard = ({ post, onReadPost }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <div style={{ ...s.relCard, transform: hov ? "translateY(-6px)":"translateY(0)", boxShadow: hov ? "0 16px 48px rgba(29,53,87,.12)":"0 2px 16px rgba(29,53,87,.06)" }}
//       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
//       onClick={() => onReadPost && onReadPost(post)}
//     >
//       <img src={post.image} alt={post.title} style={{ ...s.relImg, transform: hov ? "scale(1.06)":"scale(1)" }} />
//       <div style={s.relBody}>
//         <span style={s.relCat}>{post.category}</span>
//         <h4 style={{ ...s.relTitle, color: hov ? T.green:T.navy }}>{post.title}</h4>
//         <span style={s.relDate}>{post.date} · {post.readTime}</span>
//       </div>
//     </div>
//   );
// };

// // ── Main Detail Page ───────────────────────────────────────────────────────
// const BlogDetailPage = ({ post = POSTS[0], onBack }) => {
//   const [progress, setProgress] = useState(0);
//   const [liked, setLiked]       = useState(false);
//   const heroRef   = useReveal(0);
//   const bodyRef   = useReveal(150);

//   const related = post ? POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0,3) : [];
//   const allRelated = related.length > 0 ? related : (post ? POSTS.filter(p => p.id !== post.id).slice(0,3) : POSTS.slice(0,3));

//   // Reading progress bar
//   useEffect(() => {
//     const onScroll = () => {
//       const el  = document.documentElement;
//       const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
//       setProgress(Math.min(100, Math.max(0, pct)));
//     };
//     window.addEventListener("scroll", onScroll);
//     window.scrollTo({ top:0, behavior:"smooth" });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [post.id]);

//   // Split content into paragraphs
//   const paragraphs = (post.content || "").split("\n\n").filter(Boolean);
//   const tocItems   = paragraphs.slice(0, 4).map((p, i) => p.slice(0, 55) + (p.length > 55 ? "…":""));

//   return (
//     <div style={{ fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
//       {/* Reading progress bar */}
//       <div style={{ position:"fixed", top:0, left:0, height:3, width:`${progress}%`, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, zIndex:1000, transition:"width 0.1s" }} />

//       {/* Back button */}
//       <div style={s.backBar}>
//         <div style={s.backInner}>
//           {/* <button onClick={onBack} style={s.backBtn}
//             onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
//             onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}
//           >← Back to Blog</button> */}

//           {/* Breadcrumb */}
//           {/* <div style={s.breadcrumb}>
//             <span style={{ color:T.textLight }}>🏠 Home</span>
//             <span style={{ color:T.textLight, margin:"0 8px" }}>/</span>
//             <span style={{ color:T.textLight }}>Blog</span>
//             <span style={{ color:T.textLight, margin:"0 8px" }}>/</span>
//             <span style={{ color:T.green, fontWeight:600 }}>{post.category}</span>
//           </div> */}
//         </div>
//       </div>

//       {/* ── Hero ── */}
//       <div ref={heroRef} style={s.heroWrap}>
//         <img src={post.image} alt={post.title} style={s.heroImg} />
//         <div style={s.heroOverlay} />
//         <div style={s.heroContent}>
//           <span style={s.heroCat}>{post.category}</span>
//           <h1 style={s.heroTitle}>{post.title}</h1>
//           <div style={s.heroMeta}>
//             <img src={post.author.avatar} alt={post.author.name} style={s.heroAvatar} />
//             <div>
//               <div style={{ color:"#fff", fontWeight:600, fontSize:14 }}>{post.author.name}</div>
//               <div style={{ color:"rgba(255,255,255,.7)", fontSize:12 }}>{post.author.role}</div>
//             </div>
//             <span style={s.heroDivider} />
//             <span style={s.heroMetaText}>📅 {post.date}</span>
//             <span style={s.heroMetaText}>⏱ {post.readTime}</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Main layout ── */}
//       <div style={s.main}>
//         <div style={s.layout}>

//           {/* Article body */}
//           <article ref={bodyRef} style={s.article}>
//             {/* Excerpt / intro */}
//             <div style={s.intro}>
//               <p style={s.introText}>{post.excerpt}</p>
//             </div>

//             {/* TOC */}
//             <TOC items={tocItems} />

//             {/* Content paragraphs */}
//             {paragraphs.map((para, i) => (
//               <div key={i} id={`section-${i}`}>
//                 {i > 0 && i < 4 && (
//                   <h3 style={s.sectionHeading}>
//                     {["Why Organic Matters", "What to Look For", "Storage & Freshness", "Final Thoughts"][i] || `Section ${i+1}`}
//                   </h3>
//                 )}
//                 <p style={s.para}>{para}</p>
//               </div>
//             ))}

//             {/* Highlight box */}
//             <div style={s.highlight}>
//               <span style={s.highlightIcon}>💡</span>
//               <div>
//                 <strong style={{ color:T.greenDeep, fontSize:14 }}>Pro Tip:</strong>
//                 <p style={{ color:T.text, fontSize:14, lineHeight:1.7, marginTop:4 }}>
//                   Visit your local farmers' market early in the morning for the freshest picks. Most vendors restock overnight and offer the best quality items in the first hour of opening.
//                 </p>
//               </div>
//             </div>

//             {/* Tags */}
//             <div style={s.tagsRow}>
//               <span style={s.tagsLabel}>Tags:</span>
//               {post.tags.map((t,i) => (
//                 <span key={i} style={s.tag}>#{t}</span>
//               ))}
//             </div>

//             {/* Author bio card */}
//             <div style={s.authorCard}>
//               <img src={post.author.avatar} alt={post.author.name} style={s.authorAvatar} />
//               <div style={{ flex:1 }}>
//                 <div style={s.authorName}>{post.author.name}</div>
//                 <div style={s.authorRole}>{post.author.role}</div>
//                 <p style={s.authorBio}>Passionate about making healthy, delicious food accessible to everyone. Writing about nutrition, seasonal eating, and the joy of cooking since 2018.</p>
//               </div>
//             </div>

//             {/* Like / Share row */}
//             <div style={s.actions}>
//               <button
//                 onClick={() => setLiked(l => !l)}
//                 style={{ ...s.actionBtn, ...(liked ? { background:T.green, color:"#fff", borderColor:T.green } : {}) }}
//                 onMouseEnter={e => { if (!liked) { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.borderColor=T.green; e.currentTarget.style.color=T.green; }}}
//                 onMouseLeave={e => { if (!liked) { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}}
//               >
//                 {liked ? "❤️" : "🤍"} {liked ? "Liked!" : "Like this article"}
//               </button>
//               <button style={s.actionBtn}
//                 onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.borderColor=T.green; e.currentTarget.style.color=T.green; }}
//                 onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}
//               >🔗 Share</button>
//               <button style={s.actionBtn}
//                 onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.borderColor=T.green; e.currentTarget.style.color=T.green; }}
//                 onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}
//               >🐦 Tweet</button>
//             </div>
//           </article>

//           {/* Sticky sidebar */}
//           <aside style={s.sidebar}>
//             {/* Progress */}
//             <div style={s.sideWidget}>
//               <h5 style={s.sideWidgetTitle}>Reading Progress</h5>
//               <div style={s.progressTrack}>
//                 <div style={{ ...s.progressFill, width:`${progress}%` }} />
//               </div>
//               <span style={{ fontSize:12, color:T.textLight }}>{Math.round(progress)}% complete</span>
//             </div>

//             {/* Share */}
//             <div style={s.sideWidget}>
//               <h5 style={s.sideWidgetTitle}>Share This Post</h5>
//               <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                 {[{ icon:"🐦", label:"Share on Twitter", bg:"#1DA1F2" }, { icon:"💼", label:"Share on LinkedIn", bg:"#0077B5" }, { icon:"📘", label:"Share on Facebook", bg:"#4267B2" }].map(({icon,label,bg},i) => (
//                   <button key={i} style={s.shareBtn}
//                     onMouseEnter={e => { e.currentTarget.style.background=bg; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor=bg; }}
//                     onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; e.currentTarget.style.borderColor=T.border; }}
//                   >{icon} {label}</button>
//                 ))}
//               </div>
//             </div>

//             {/* Category pill */}
//             <div style={s.sideWidget}>
//               <h5 style={s.sideWidgetTitle}>Category</h5>
//               <span style={s.catPill}>{post.category}</span>
//             </div>
//           </aside>
//         </div>

//         {/* Related posts */}
//         {allRelated.length > 0 && (
//           <div style={s.related}>
//             <h2 style={s.relatedHeading}>
//               You Might Also <em style={{ color:T.green, fontStyle:"italic" }}>Enjoy</em>
//             </h2>
//             <div style={s.relatedDivider} />
//             <div style={s.relatedGrid}>
//               {allRelated.map((p, i) => <RelatedCard key={p.id} post={p} onReadPost={onBack} />)}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Newsletter */}
//       <BlogNewsletter />

//       <style>{`
//         @media (max-width: 1024px) {
//           .detail-layout { flex-direction: column !important; }
//           .detail-sidebar { width: 100% !important; position: static !important; }
//           .detail-related-grid { grid-template-columns: repeat(2,1fr) !important; }
//         }
//         @media (max-width: 600px) {
//           .detail-main { padding: 24px 16px !important; }
//           .detail-hero-title { font-size: 26px !important; }
//           .detail-related-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// const s = {
//   backBar: { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px", position:"sticky", top:0, zIndex:90 },
//   backInner: { display:"flex", alignItems:"center", gap:24, maxWidth:1120, margin:"0 auto" },
//   backBtn: { background:"#fff", color:T.navy, border:`1.5px solid ${T.border}`, borderRadius:8, padding:"8px 18px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" },
//   breadcrumb: { fontSize:13, color:T.textLight },
//   heroWrap: { position:"relative", height:"clamp(320px,45vw,520px)", overflow:"hidden" },
//   heroImg: { width:"100%", height:"100%", objectFit:"cover", display:"block" },
//   heroOverlay: { position:"absolute", inset:0, background:"linear-gradient(to top,rgba(29,53,87,.85) 0%,rgba(29,53,87,.3) 60%,transparent 100%)" },
//   heroContent: { position:"absolute", bottom:0, left:0, right:0, padding:"40px 80px", maxWidth:1200 },
//   heroCat: { background:T.green, color:"#fff", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", padding:"5px 12px", borderRadius:40, display:"inline-block", marginBottom:16 },
//   heroTitle: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(24px,4vw,48px)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:20, maxWidth:760 },
//   heroMeta: { display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" },
//   heroAvatar: { width:40, height:40, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(255,255,255,.5)" },
//   heroDivider: { width:1, height:24, background:"rgba(255,255,255,.3)", display:"inline-block" },
//   heroMetaText: { color:"rgba(255,255,255,.8)", fontSize:13 },
//   main: { maxWidth:1280, margin:"0 auto", padding:"48px 40px 0" },
//   layout: { display:"flex", gap:32, alignItems:"flex-start", maxWidth:1120, margin:"0 auto" },
//   article: { flex:1, minWidth:0 },
//   intro: { background:`linear-gradient(135deg,${T.greenPale},#E8F8F1)`, borderRadius:16, padding:"24px 28px", borderLeft:`4px solid ${T.green}`, marginBottom:32 },
//   introText: { color:T.greenDeep, fontSize:16, lineHeight:1.8, fontStyle:"italic", fontWeight:500, margin:0 },
//   toc: { background:"#F8FAFC", border:`1.5px solid ${T.border}`, borderRadius:16, padding:"22px 24px", marginBottom:32 },
//   tocTitle: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:18, fontWeight:700, color:T.navy, marginBottom:14 },
//   tocItem: { display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 },
//   tocNum: { width:22, height:22, background:T.green, color:"#fff", borderRadius:"50%", fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 },
//   tocLink: { color:T.text, fontSize:14, textDecoration:"none", lineHeight:1.5, transition:"color 0.2s" },
//   sectionHeading: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:26, fontWeight:700, color:T.navy, margin:"36px 0 14px", paddingTop:8, borderTop:`2px solid ${T.border}` },
//   para: { color:T.text, fontSize:15, lineHeight:1.9, marginBottom:22 },
//   highlight: { background:`linear-gradient(135deg,${T.greenPale},#DFFAED)`, border:`1.5px solid ${T.greenLight}`, borderRadius:14, padding:"20px 22px", display:"flex", gap:14, alignItems:"flex-start", margin:"28px 0" },
//   highlightIcon: { fontSize:24, flexShrink:0 },
//   tagsRow: { display:"flex", flexWrap:"wrap", gap:8, alignItems:"center", margin:"28px 0" },
//   tagsLabel: { fontSize:13, fontWeight:700, color:T.navy, marginRight:4 },
//   tag: { background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:40 },
//   authorCard: { display:"flex", gap:20, background:"#fff", borderRadius:18, padding:"24px", boxShadow:`0 2px 16px rgba(29,53,87,.06)`, border:`1.5px solid ${T.border}`, margin:"32px 0", alignItems:"flex-start" },
//   authorAvatar: { width:70, height:70, borderRadius:"50%", objectFit:"cover", border:`3px solid ${T.greenLight}`, flexShrink:0 },
//   authorName: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:700, color:T.navy, marginBottom:2 },
//   authorRole: { color:T.green, fontSize:13, fontWeight:600, marginBottom:8 },
//   authorBio: { color:T.text, fontSize:13, lineHeight:1.7, margin:0 },
//   actions: { display:"flex", gap:10, flexWrap:"wrap", marginTop:32 },
//   actionBtn: { background:"#fff", color:T.text, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" },
//   sidebar: { width:280, flexShrink:0, position:"sticky", top:80, display:"flex", flexDirection:"column", gap:20 },
//   sideWidget: { background:"#fff", borderRadius:16, padding:"20px", boxShadow:"0 2px 16px rgba(29,53,87,.06)", border:`1.5px solid ${T.border}` },
//   sideWidgetTitle: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:17, fontWeight:700, color:T.navy, marginBottom:14 },
//   progressTrack: { height:8, background:T.border, borderRadius:99, overflow:"hidden", marginBottom:8 },
//   progressFill: { height:"100%", background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, transition:"width 0.2s" },
//   shareBtn: { width:"100%", background:"#fff", color:T.navy, border:`1.5px solid ${T.border}`, borderRadius:8, padding:"10px 14px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.22s", textAlign:"left" },
//   catPill: { background:T.greenLight, color:T.greenDeep, fontSize:13, fontWeight:700, padding:"6px 16px", borderRadius:40, display:"inline-block" },
//   related: { maxWidth:1120, margin:"60px auto 0", paddingBottom:8 },
//   relatedHeading: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(26px,3vw,36px)", fontWeight:700, color:T.navy },
//   relatedDivider: { width:40, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, margin:"12px 0 32px" },
//   relatedGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 },
//   relCard: { background:"#fff", borderRadius:18, overflow:"hidden", border:`1.5px solid ${T.border}`, cursor:"pointer", transition:"transform 0.3s, box-shadow 0.3s" },
//   relImg: { width:"100%", height:180, objectFit:"cover", display:"block", transition:"transform 0.5s" },
//   relBody: { padding:"16px 18px 20px" },
//   relCat: { background:T.greenLight, color:T.green, fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", padding:"3px 8px", borderRadius:40, display:"inline-block", marginBottom:8 },
//   relTitle: { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:17, fontWeight:700, lineHeight:1.35, marginBottom:6, transition:"color 0.2s" },
//   relDate: { fontSize:11, color:T.textLight },
// };

// // expose tokens
// const { greenDeep: _gd, greenLight: _gl, greenPale: _gp, greenDark: _gdk } = T;

// export default BlogDetailPage;
import React, { useState, useEffect } from "react";
// import { POSTS, T } from "./blogData.js";
import { POSTS,T } from "./BlogData/blogdata.js";
// import BlogNewsletter from "./BlogNewsletter.jsx";
// import BlogNewsletter from "./BlogNewsletter.jsx";
// import PostCard from "./PostCard.jsx";
import PostCard from "./PostCard.jsx";

const BlogDetailPage = ({ post }) => {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked]       = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const onScroll = () => {
      const el = document.documentElement;
      setProgress(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [post.id]);

  const related      = POSTS.filter(p => p.id !== post.id && !p.featured && p.category === post.category).slice(0, 3);
  const fallback     = POSTS.filter(p => p.id !== post.id && !p.featured).slice(0, 3);
  const relatedPosts = related.length >= 2 ? related : fallback;
  const paragraphs   = (post.content || "").split("\n\n").filter(Boolean);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`, background: "linear-gradient(90deg,#3BB77E,#28976A)", zIndex: 1000, transition: "width .1s" }} />

      {/* Hero */}
      <div style={s.heroWrap}>
        <img src={post.image} alt={post.title} style={s.heroImg} />
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <span style={s.heroCat}>{post.category}</span>
          <h1 style={s.heroTitle}>{post.title}</h1>
          <div style={s.heroMeta}>
            <img src={post.author.avatar} alt={post.author.name} style={s.heroAvatar} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{post.author.name}</div>
              <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12 }}>{post.author.role}</div>
            </div>
            <div style={s.heroMetaSep} />
            <span style={s.heroMetaItem}>📅 {post.date}</span>
            <span style={s.heroMetaItem}>⏱ {post.readTime} read</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={s.main}>
        <div style={s.layout}>

          {/* Article */}
          <article style={s.article}>
            <div style={s.introBox}>
              <p style={s.introText}>{post.excerpt}</p>
            </div>

            {paragraphs.map((para, i) => (
              <div key={i}>
                {i > 0 && i < 4 && (
                  <h3 style={s.secHeading}>
                    {["Why It Matters", "What to Look For", "Pro Tips & Tricks", "The Bottom Line"][i - 1]}
                  </h3>
                )}
                <p style={s.para}>{para}</p>
              </div>
            ))}

            <div style={s.tipBox}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
              <div>
                <strong style={{ color: "#1A6B4A", fontSize: 14, display: "block", marginBottom: 6 }}>Pro Tip</strong>
                <p style={{ color: "#4A5568", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                  Visit your local farmers market early in the morning for the freshest picks. Most vendors restock overnight and offer the best quality in the first hour.
                </p>
              </div>
            </div>

            <div style={s.tagsRow}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1D3557", marginRight: 8 }}>Tags:</span>
              {post.tags.map((t, i) => (
                <span key={i} style={s.tag}>#{t}</span>
              ))}
            </div>

            <div style={s.authorCard}>
              <img src={post.author.avatar} alt={post.author.name} style={s.authorAvatar} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#1D3557", marginBottom: 2 }}>{post.author.name}</div>
                <div style={{ color: "#3BB77E", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{post.author.role}</div>
                <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                  Passionate about making healthy, delicious food accessible to everyone. Writing about nutrition, seasonal eating, and the joy of cooking since 2018.
                </p>
              </div>
            </div>

            <div style={s.actions}>
              <button
                onClick={() => setLiked(l => !l)}
                style={{ ...s.actionBtn, ...(liked ? { background: "#3BB77E", color: "#fff", borderColor: "#3BB77E" } : {}) }}
                onMouseEnter={e => { if (!liked) { e.currentTarget.style.background = "#E8F8F1"; e.currentTarget.style.borderColor = "#3BB77E"; e.currentTarget.style.color = "#3BB77E"; }}}
                onMouseLeave={e => { if (!liked) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#E2ECE8"; e.currentTarget.style.color = "#4A5568"; }}}
              >{liked ? "❤️ Liked!" : "🤍 Like this"}</button>

              {["🔗 Share", "🐦 Tweet"].map((label, i) => (
                <button key={i} style={s.actionBtn}
                  onMouseEnter={e => { e.currentTarget.style.background = "#E8F8F1"; e.currentTarget.style.borderColor = "#3BB77E"; e.currentTarget.style.color = "#3BB77E"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#E2ECE8"; e.currentTarget.style.color = "#4A5568"; }}
                >{label}</button>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside style={s.sidebar}>
            <div style={s.sideWidget}>
              <h5 style={s.sideWidgetTitle}>Reading Progress</h5>
              <div style={s.progTrack}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#3BB77E,#28976A)", borderRadius: 99, transition: "width .2s" }} />
              </div>
              <span style={{ fontSize: 12, color: "#8A9BAE" }}>{Math.round(progress)}% complete</span>
            </div>

            <div style={s.sideWidget}>
              <h5 style={s.sideWidgetTitle}>Share This Post</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[{ label: "🐦 Twitter", bg: "#1DA1F2" }, { label: "💼 LinkedIn", bg: "#0077B5" }, { label: "📘 Facebook", bg: "#4267B2" }].map(({ label, bg }, i) => (
                  <button key={i} style={s.shareBtn}
                    onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = bg; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1D3557"; e.currentTarget.style.borderColor = "#E2ECE8"; }}
                  >{label}</button>
                ))}
              </div>
            </div>

            <div style={s.sideWidget}>
              <h5 style={s.sideWidgetTitle}>Category</h5>
              <span style={{ background: "#E8F8F1", color: "#1A6B4A", fontSize: 13, fontWeight: 700, padding: "7px 18px", borderRadius: 40, display: "inline-block" }}>
                {post.category}
              </span>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div style={s.related}>
            <h2 style={s.relHeading}>You Might Also <em style={{ color: "#3BB77E", fontStyle: "italic" }}>Enjoy</em></h2>
            <div style={s.relDivider} />
            <div style={s.relGrid}>
              {relatedPosts.map((p, i) => (
                <PostCard key={p.id} post={p} delay={i * 80} onReadPost={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>

      <BlogNewsletter />

      <style>{`
        @media(max-width:1024px){
          .detail-layout { flex-direction: column !important; }
          .detail-sidebar { width: 100% !important; position: static !important; }
          .detail-rel-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px){
          .detail-main { padding: 24px 16px !important; }
          .detail-hero-content { padding: 28px 20px !important; }
          .detail-rel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const s = {
  heroWrap:        { position: "relative", height: "clamp(300px,45vw,520px)", overflow: "hidden" },
  heroImg:         { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  heroOverlay:     { position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(29,53,87,.88) 0%,rgba(29,53,87,.2) 60%,transparent 100%)" },
  heroContent:     { position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 80px" },
  heroCat:         { background: "#3BB77E", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "6px 14px", borderRadius: 40, display: "inline-block", marginBottom: 18 },
  heroTitle:       { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,4vw,50px)", fontWeight: 700, color: "#fff", lineHeight: 1.18, marginBottom: 22, maxWidth: 780 },
  heroMeta:        { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" },
  heroAvatar:      { width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2.5px solid rgba(255,255,255,.5)" },
  heroMetaSep:     { width: 1, height: 26, background: "rgba(255,255,255,.3)", display: "inline-block" },
  heroMetaItem:    { color: "rgba(255,255,255,.78)", fontSize: 13 },
  main:            { maxWidth: 1280, margin: "0 auto", padding: "52px 40px 0" },
  layout:          { display: "flex", gap: 36, alignItems: "flex-start", maxWidth: 1120, margin: "0 auto" },
  article:         { flex: 1, minWidth: 0 },
  introBox:        { background: "linear-gradient(135deg,#F2FBF6,#E0F8EE)", borderRadius: 18, padding: "24px 28px", borderLeft: "4px solid #3BB77E", marginBottom: 32 },
  introText:       { color: "#1A6B4A", fontSize: 16, lineHeight: 1.85, fontStyle: "italic", fontWeight: 500, margin: 0 },
  secHeading:      { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 26, fontWeight: 700, color: "#1D3557", margin: "36px 0 14px", paddingTop: 10, borderTop: "2px solid #E2ECE8" },
  para:            { color: "#4A5568", fontSize: 15, lineHeight: 1.95, marginBottom: 22 },
  tipBox:          { background: "#F2FBF6", border: "1.5px solid #E8F8F1", borderRadius: 16, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start", margin: "28px 0" },
  tagsRow:         { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "28px 0" },
  tag:             { background: "#E8F8F1", color: "#1A6B4A", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 40 },
  authorCard:      { display: "flex", gap: 20, background: "#fff", borderRadius: 18, padding: "26px", boxShadow: "0 2px 16px rgba(29,53,87,.06)", border: "1.5px solid #E2ECE8", margin: "32px 0", alignItems: "flex-start" },
  authorAvatar:    { width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid #E8F8F1", flexShrink: 0 },
  actions:         { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 },
  actionBtn:       { background: "#fff", color: "#4A5568", border: "1.5px solid #E2ECE8", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  sidebar:         { width: 280, flexShrink: 0, position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 20 },
  sideWidget:      { background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 16px rgba(29,53,87,.06)", border: "1.5px solid #E2ECE8" },
  sideWidgetTitle: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 700, color: "#1D3557", marginBottom: 14 },
  progTrack:       { height: 8, background: "#E2ECE8", borderRadius: 99, overflow: "hidden", marginBottom: 8 },
  shareBtn:        { width: "100%", background: "#fff", color: "#1D3557", border: "1.5px solid #E2ECE8", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .22s", textAlign: "left" },
  related:         { maxWidth: 1120, margin: "64px auto 0", paddingBottom: 8 },
  relHeading:      { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "#1D3557" },
  relDivider:      { width: 40, height: 3, background: "linear-gradient(90deg,#3BB77E,#28976A)", borderRadius: 99, margin: "12px 0 32px" },
  relGrid:         { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 },
};

export default BlogDetailPage;