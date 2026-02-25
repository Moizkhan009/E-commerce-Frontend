// import React, { useRef, useEffect } from "react";
// // import { POSTS, T } from "./blogData.js";
// import { POSTS,T } from "./BlogData/blogdata";

// const useReveal = (delay = 0) => {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     el.style.opacity = "0"; el.style.transform = "translateY(32px)";
//     el.style.transition = `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
//     }, { threshold: 0.1 });
//     obs.observe(el); return () => obs.disconnect();
//   }, [delay]);
//   return ref;
// };

// const FeaturedPost = ({ onReadPost }) => {
//   const post = POSTS.find(p => p.featured);
//   const ref  = useReveal(0);

//   if (!post) return null;

//   return (
//     <section style={s.section}>
//       <div style={s.inner}>
//         <div ref={ref} style={s.label}>
//           <span style={s.labelDot} /> Featured Article
//         </div>

//         <div
//           style={s.card}
//           onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform="scale(1.04)"; }}
//           onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform="scale(1)"; }}
//         >
//           {/* Image */}
//           <div style={s.imgWrap}>
//             <img src={post.image} alt={post.title} style={s.img} />
//             <div style={s.imgOverlay} />
//             <span style={s.categoryChip}>{post.category}</span>
//           </div>

//           {/* Content */}
//           <div style={s.content}>
//             <div style={s.meta}>
//               <img src={post.author.avatar} alt={post.author.name} style={s.avatar} />
//               <span style={s.authorName}>{post.author.name}</span>
//               <span style={s.dot}>·</span>
//               <span style={s.metaText}>{post.date}</span>
//               <span style={s.dot}>·</span>
//               <span style={s.metaText}>⏱ {post.readTime}</span>
//             </div>

//             <h2 style={s.title}>{post.title}</h2>
//             <p style={s.excerpt}>{post.excerpt}</p>

//             <div style={s.tags}>
//               {post.tags.slice(0,3).map((t,i) => (
//                 <span key={i} style={s.tag}>#{t}</span>
//               ))}
//             </div>

//             <button
//               onClick={() => onReadPost && onReadPost(post)}
//               style={s.btn}
//               onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(59,183,126,.35)"; }}
//               onMouseLeave={e => { e.currentTarget.style.background=T.green; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
//             >
//               Read Full Article →
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 900px) {
//           .featured-card { flex-direction: column !important; }
//           .featured-img-wrap { flex: none !important; height: 280px !important; }
//         }
//         @media (max-width: 600px) {
//           .featured-content { padding: 24px 20px !important; }
//           .featured-title { font-size: 22px !important; }
//         }
//       `}</style>
//     </section>
//   );
// };

// const s = {
//   section: { padding:"48px 40px 0", maxWidth:1280, margin:"0 auto", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" },
//   inner:   { maxWidth:1120, margin:"0 auto" },
//   label:   { display:"flex", alignItems:"center", gap:8, marginBottom:20 },
//   labelDot:{ width:8, height:8, borderRadius:"50%", background:T.green, display:"inline-block", animation:"pulse 2s ease-in-out infinite" },
//   card: {
//     display:"flex", borderRadius:24, overflow:"hidden",
//     boxShadow:"0 8px 48px rgba(29,53,87,.12)", border:"1.5px solid #EEF4F0",
//     background:"#fff", cursor:"pointer", transition:"box-shadow 0.3s",
//   },
//   imgWrap: { flex:"0 0 52%", position:"relative", overflow:"hidden", minHeight:360 },
//   img: { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)" },
//   imgOverlay: { position:"absolute", inset:0, background:"linear-gradient(to right,transparent 60%,rgba(255,255,255,.08) 100%)" },
//   categoryChip: {
//     position:"absolute", top:20, left:20,
//     background:T.green, color:"#fff", fontSize:11, fontWeight:700,
//     letterSpacing:1, textTransform:"uppercase", padding:"5px 12px", borderRadius:40,
//   },
//   content: { flex:1, padding:"36px 40px", display:"flex", flexDirection:"column", justifyContent:"center" },
//   meta: { display:"flex", alignItems:"center", gap:8, marginBottom:18, flexWrap:"wrap" },
//   avatar: { width:32, height:32, borderRadius:"50%", objectFit:"cover", border:`2px solid ${T.greenLight}` },
//   authorName: { fontWeight:600, fontSize:13, color:T.navy },
//   dot: { color:T.textLight, fontSize:13 },
//   metaText: { fontSize:13, color:T.textLight },
//   title: {
//     fontFamily:"'Cormorant Garamond',Georgia,serif",
//     fontSize:"clamp(22px,2.5vw,32px)", fontWeight:700,
//     color:T.navy, lineHeight:1.25, marginBottom:16,
//   },
//   excerpt: { color:T.text, fontSize:15, lineHeight:1.8, marginBottom:20, flex:1 },
//   tags: { display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 },
//   tag: { background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:40 },
//   btn: {
//     display:"inline-flex", alignItems:"center", gap:8,
//     background:T.green, color:"#fff", border:"none", borderRadius:10,
//     padding:"13px 28px", fontWeight:700, fontSize:14,
//     cursor:"pointer", fontFamily:"inherit", transition:"all 0.26s", alignSelf:"flex-start",
//   },
// };

// // Token refs used in JSX — re-expose
// const { greenDeep: _gd } = T;

// export default FeaturedPost;
import React, { useRef, useEffect, useState } from "react";
// import { POSTS, T } from "./blogData.js";
import { POSTS,T } from "./BlogData/blogdata";

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(36px)";
    el.style.transition = `opacity .7s cubic-bezier(.4,0,.2,1) ${delay}ms,transform .7s cubic-bezier(.4,0,.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const FeaturedPost = ({ onReadPost }) => {
  const post = POSTS.find(p => p.featured);
  const ref  = useReveal(0);
  const [hov, setHov] = useState(false);
  if (!post) return null;

  return (
    <section style={s.section}>
      {/* Section label */}
      <div style={s.sectionLabel}>
        <div style={s.pulse} />
        <span style={s.labelText}>Featured Article</span>
      </div>

      {/* Card */}
      <div ref={ref}
        style={{ ...s.card, boxShadow: hov ? "0 32px 80px rgba(29,53,87,.18)" : "0 8px 48px rgba(29,53,87,.10)" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* LEFT: image */}
        <div style={s.imgSide}>
          <img src={post.image} alt={post.title}
            style={{ ...s.img, transform: hov ? "scale(1.05)" : "scale(1)" }} />
          <div style={s.imgGrad} />

          {/* Overlaid category */}
          <div style={s.catChip}>{post.category}</div>

          {/* Reading time badge */}
          <div style={s.rtBadge}>⏱ {post.readTime} read</div>
        </div>

        {/* RIGHT: content */}
        <div style={s.contentSide}>
          {/* Meta */}
          <div style={s.meta}>
            <img src={post.author.avatar} alt={post.author.name} style={s.avatar} />
            <div>
              <div style={s.authorName}>{post.author.name}</div>
              <div style={s.authorRole}>{post.author.role}</div>
            </div>
            <span style={s.metaSep}>·</span>
            <span style={s.metaDate}>📅 {post.date}</span>
          </div>

          {/* Title */}
          <h2 style={{ ...s.title, color: hov ? T.green : T.navy }}>{post.title}</h2>

          {/* Excerpt */}
          <p style={s.excerpt}>{post.excerpt}</p>

          {/* Tags */}
          <div style={s.tags}>
            {post.tags.slice(0, 3).map((t, i) => (
              <span key={i} style={s.tag}>#{t}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={s.divider} />

          {/* CTA */}
          <div style={s.cta}>
            <button onClick={() => onReadPost && onReadPost(post)}
              style={{ ...s.btn, ...(hov ? { background: T.greenDark, transform: "translateY(-2px)", boxShadow: "0 10px 28px rgba(59,183,126,.38)" } : {}) }}
              onMouseEnter={e => { e.currentTarget.style.background = T.greenDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(59,183,126,.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Read Full Article →
            </button>
            <div style={s.views}>👁 2.4k views</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const s = {
  section: { padding: "52px 40px 0", maxWidth: 1280, margin: "0 auto", fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" },
  sectionLabel: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22, maxWidth: 1120, margin: "0 auto 22px" },
  pulse: { width: 10, height: 10, borderRadius: "50%", background: T.green, boxShadow: `0 0 0 4px ${T.greenLight}` },
  labelText: { fontSize: 13, fontWeight: 700, color: T.green, letterSpacing: 0.5 },
  card: {
    maxWidth: 1120, margin: "0 auto", display: "flex",
    borderRadius: 28, overflow: "hidden",
    background: "#fff", border: `1.5px solid ${T.border}`,
    transition: "box-shadow .35s",
    cursor: "pointer",
  },
  imgSide: { flex: "0 0 52%", position: "relative", overflow: "hidden", minHeight: 400 },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .55s cubic-bezier(.4,0,.2,1)" },
  imgGrad: { position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 55%,rgba(255,255,255,.06))" },
  catChip: { position: "absolute", top: 22, left: 22, background: T.green, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "6px 14px", borderRadius: 40 },
  rtBadge: { position: "absolute", bottom: 22, right: 22, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 40, backdropFilter: "blur(6px)" },
  contentSide: { flex: 1, padding: "44px 48px", display: "flex", flexDirection: "column", justifyContent: "center" },
  meta: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22, flexWrap: "wrap" },
  avatar: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `2.5px solid ${T.greenLight}` },
  authorName: { fontSize: 13, fontWeight: 700, color: T.navy, lineHeight: 1.2 },
  authorRole: { fontSize: 11, color: T.textLight, marginTop: 1 },
  metaSep: { color: T.textLight, fontSize: 16 },
  metaDate: { fontSize: 13, color: T.textLight },
  title: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 700, color: T.navy, lineHeight: 1.22, marginBottom: 18, transition: "color .25s" },
  excerpt: { color: T.text, fontSize: 15, lineHeight: 1.85, marginBottom: 22 },
  tags: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 },
  tag: { background: T.greenLight, color: T.greenDeep, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 40 },
  divider: { height: 1, background: `linear-gradient(90deg,${T.border},transparent)`, marginBottom: 24 },
  cta: { display: "flex", alignItems: "center", gap: 20 },
  btn: { background: T.green, color: "#fff", border: "none", borderRadius: 12, padding: "13px 30px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "all .28s" },
  views: { fontSize: 13, color: T.textLight, fontWeight: 500 },
};

export default FeaturedPost;