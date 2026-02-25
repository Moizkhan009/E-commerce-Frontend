import React, { useState, useRef, useEffect } from "react";
// import { T } from "./blogData.js";
import { T } from "./BlogData/blogdata";

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .55s cubic-bezier(.4,0,.2,1) ${delay}ms,transform .55s cubic-bezier(.4,0,.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const PostCard = ({ post, delay = 0, onReadPost, large = false }) => {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .55s cubic-bezier(.4,0,.2,1) ${delay}ms,transform .55s cubic-bezier(.4,0,.2,1) ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);

  return (
    <article
      ref={ref}
      onClick={() => onReadPost && onReadPost(post)}
      style={{
        ...s.card,
        boxShadow: hov ? "0 24px 64px rgba(29,53,87,.14)" : "0 2px 16px rgba(29,53,87,.06)",
        transform: hov ? "translateY(-9px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={{ ...s.imgWrap, height: large ? 260 : 210 }}>
        <img src={post.image} alt={post.title}
          style={{ ...s.img, transform: hov ? "scale(1.07)" : "scale(1)" }} />

        {/* Gradient overlay */}
        <div style={s.imgGrad} />

        {/* Category chip */}
        <span style={s.chip}>{post.category}</span>

        {/* Read time */}
        <span style={s.rt}>⏱ {post.readTime}</span>
      </div>

      {/* Body */}
      <div style={s.body}>
        {/* Author */}
        <div style={s.meta}>
          <img src={post.author.avatar} alt={post.author.name} style={s.avatar} />
          <div>
            <div style={s.authorName}>{post.author.name}</div>
            <div style={s.date}>{post.date}</div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ ...s.title, color: hov ? T.green : T.navy, fontSize: large ? 22 : 18 }}>{post.title}</h3>

        {/* Excerpt */}
        <p style={s.excerpt}>{post.excerpt}</p>

        {/* Tags */}
        <div style={s.tags}>
          {post.tags.slice(0, 2).map((t, i) => <span key={i} style={s.tag}>#{t}</span>)}
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <span style={{ ...s.readMore, color: hov ? T.greenDark : T.green }}>
            Read Article <span style={{ marginLeft: hov ? 8 : 4, transition: "margin .2s" }}>→</span>
          </span>
          <span style={s.views}>👁 1.2k</span>
        </div>
      </div>
    </article>
  );
};

const s = {
  card: {
    background: "#fff", borderRadius: 22,
    border: `1.5px solid ${T.border}`, overflow: "hidden",
    cursor: "pointer", display: "flex", flexDirection: "column",
    transition: "transform .32s cubic-bezier(.4,0,.2,1),box-shadow .32s",
    fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif",
  },
  imgWrap: { position: "relative", overflow: "hidden" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .52s cubic-bezier(.4,0,.2,1)" },
  imgGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(29,53,87,.28) 0%,transparent 60%)" },
  chip: { position: "absolute", top: 14, left: 14, background: T.green, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: .8, textTransform: "uppercase", padding: "4px 11px", borderRadius: 40 },
  rt: { position: "absolute", bottom: 14, right: 14, background: "rgba(0,0,0,.5)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 40, backdropFilter: "blur(5px)" },
  body: { padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: 1 },
  meta: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 },
  avatar: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: `2px solid ${T.greenLight}` },
  authorName: { fontSize: 13, fontWeight: 700, color: T.navy, lineHeight: 1.2 },
  date: { fontSize: 11, color: T.textLight, marginTop: 1 },
  title: { fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 700, lineHeight: 1.3, marginBottom: 10, transition: "color .22s" },
  excerpt: { color: T.text, fontSize: 13, lineHeight: 1.8, marginBottom: 14, flex: 1 },
  tags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 },
  tag: { background: T.greenLight, color: T.greenDeep, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 40 },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${T.border}`, paddingTop: 14, marginTop: 4 },
  readMore: { background: "none", border: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", padding: 0, transition: "color .22s" },
  views: { fontSize: 12, color: T.textLight },
};

export default PostCard;