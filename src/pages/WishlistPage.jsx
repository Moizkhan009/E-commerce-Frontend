import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { T, FONT } from "../components/WishlistComponents/wishlistTokens.js";

// ── Tera EXACT same imports jaise Textwishlist mein the ──────
import {
  toggleWishlist,
  fetchWishlist,
  clearWishlistMessage,
} from "../redux/Wishlist/wishlistSlice.js";
// import Header from "../components/header.jsx";
import WishlistCard     from "../components/WishlistComponents/WishlistCard.jsx";
import WishlistEmpty    from "../components/WishlistComponents/WishlistEmpty.jsx";
import WishlistSkeleton from "../components/WishlistComponents/WishlistSkeleton.jsx";
import WishlistToast    from "../components/WishlistComponents/WishlistToast.jsx";

// ─────────────────────────────────────────────────────────────
//  WishlistPage — tera Textwishlist ka full UI version
//
//  Logic bilkul same:
//    dispatch(fetchWishlist())          on mount
//    items.map((item) => ...)           grid
//    toggleWishlist(pid).then(fetch)    remove
//    clearWishlistMessage()             auto clear
//
//  Usage:
//    <Provider store={store}>
//      <WishlistPage />
//    </Provider>
// ─────────────────────────────────────────────────────────────
const WishlistPage = () => {
  const dispatch = useDispatch();
  const [toasts, setToasts] = useState([]);

  // ── Tera EXACT same selector ─────────────────────────────
  const { items, loading, error, message } = useSelector(
    (state) => state.wishlist
  );

  // ── Tera EXACT same useEffect 1 ──────────────────────────
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // ── Tera EXACT same useEffect 2 — auto clear message ─────
  useEffect(() => {
    if (message || error) {
      // Show as toast
      if (message) addToast(message, "success");
      if (error)   addToast(error,   "error");

      const t = setTimeout(() => dispatch(clearWishlistMessage()), 2500);
      return () => clearTimeout(t);
    }
  }, [message, error, dispatch]);

  // Font inject
  useEffect(() => {
    if (!document.getElementById("nest-fonts-wl")) {
      const l = document.createElement("link");
      l.id = "nest-fonts-wl"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.background = T.offWhite;
  }, []);

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
  };

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>

      {/* Toasts — message aur error ke liye */}
      {toasts.map(t => (
        <WishlistToast
          key={t.id}
          message={t.msg}
          type={t.type}
          onClose={() => setToasts(p => p.filter(x => x.id !== t.id))}
        />
      ))}

      {/* Breadcrumb */}
      {/* <div style={s.bcBar}>
        <div style={s.bcInner}>
          {["Home", "My Account", "Wishlist"].map((c, i, a) => (
            <React.Fragment key={i}>
              <span style={{
                fontSize:13,
                fontWeight: i === a.length-1 ? 700 : 400,
                color:      i === a.length-1 ? T.green : T.textLight,
                cursor:     i < a.length-1 ? "pointer" : "default",
              }}
                onMouseEnter={e => { if(i<a.length-1) e.currentTarget.style.color=T.green; }}
                onMouseLeave={e => { if(i<a.length-1) e.currentTarget.style.color=T.textLight; }}
              >{c}</span>
              {i < a.length-1 && <span style={{ color:T.border, fontSize:12 }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      </div> */}
{/* <Header/> */}
      {/* Main */}
      <div style={s.main}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.eyebrow}>My Account · Saved Items</div>
            <h1 style={s.heading}>
              💖 My Wishlist
              {items.length > 0 && (
                <span style={s.countBadge}>
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              )}
            </h1>
            <div style={s.underline} />
          </div>
        </div>

        {/* Loading — tera: loading && <p>Loading...</p> */}
        {loading && <WishlistSkeleton />}

        {/* Empty — tera: !loading && items.length === 0 */}
        {!loading && items.length === 0 && <WishlistEmpty />}

        {/* Grid — tera: items.map((item) => ...) */}
        {!loading && items.length > 0 && (
          <>
            <p style={s.meta}>
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>

            {/* One WishlistCard per item — same as tera items.map */}
            <div style={s.grid}>
              {items.map((item) => (
                <WishlistCard key={item._id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:900px) { .wl-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:560px) {
          .wl-main { padding: 24px 16px 56px !important; }
          .wl-bc   { padding: 10px 16px !important; }
          .wl-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const s = {
  bcBar:      { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:    { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
  main:       { maxWidth:1280, margin:"0 auto", padding:"44px 40px 72px" },
  header:     { marginBottom:32 },
  eyebrow:    { fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:T.textLight, marginBottom:8 },
  heading:    { fontSize:"clamp(24px,4vw,40px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", lineHeight:1.1, marginBottom:10 },
  countBadge: { background:T.pinkLight, color:T.pink, fontSize:14, fontWeight:700, padding:"4px 16px", borderRadius:40, letterSpacing:0 },
  underline:  { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99 },
  meta:       { fontSize:13, color:T.textLight, fontWeight:500, marginBottom:20 },
  grid:       { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:22 },
};

const { greenDark:_a, pinkLight:_b } = T;
export default WishlistPage;