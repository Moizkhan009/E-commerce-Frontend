import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { T, FONT } from "../components/CartComponents/Carttokken.js";

// ── Tera exact same imports ──────────────────────────────────
// ⚠️ sirf path check karo — baaki kuch nahi badla
import {
  getCart,
  selectCartItems,
  selectTotalPrice,
} from "../redux/Cart/Cartslice.js";

import CartItemCard from "../components/CartComponents/Cartitemcard.jsx";
import CartSummary  from "../components/CartComponents/CartSummary.jsx";
import CartEmpty    from "../components/CartComponents/CartEmpty.jsx";
import CartSkeleton from "../components/CartComponents/Cartskelton.jsx";
import Header from "../components/header.jsx";

const CartPage = () => {
  const dispatch = useDispatch();

  // ── Tera exact same logic ────────────────────────────────
  const items  = useSelector(selectCartItems);
  const total  = useSelector(selectTotalPrice);

  // Slice se status selector
  const status = useSelector((state) => state.cart.status);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const isLoading = status === "loading";
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>

      {/* Font inject */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.offWhite}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:1024px){
          .mc-layout { flex-direction: column !important; }
          .mc-summary { width: 100% !important; position: static !important; }
        }
        @media(max-width:600px){
          .mc-main { padding: 20px 16px 60px !important; }
          .mc-bc   { padding: 10px 16px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      {/* <div style={s.bcBar}>
        <div style={s.bcInner}>
          {["Home", "Shop", "My Cart"].map((c, i, a) => (
            <React.Fragment key={i}>
              <span style={{
                fontSize:13,
                fontWeight: i === a.length-1 ? 700 : 400,
                color:      i === a.length-1 ? T.green : T.textLight,
                cursor:     i < a.length-1 ? "pointer" : "default",
              }}>
                {c}
              </span>
              {i < a.length-1 && <span style={{ color:T.border, fontSize:12 }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      </div> */}
         <Header></Header>
      {/* Main */}
      <div style={s.main}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.heading}>
              🛒 My Cart
              {itemCount > 0 && (
                <span style={s.badge}>
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </span>
              )}
            </h1>
            <div style={s.underline} />
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && <CartSkeleton />}

        {/* ── items.length === 0 ? "Cart Empty" : items.map() ── */}
        {!isLoading && items.length === 0 && <CartEmpty />}

        {!isLoading && items.length > 0 && (
          <div style={s.layout}>

            {/* Left — one CartItemCard per item */}
            <div style={s.listCol}>
              <p style={s.listMeta}>
                {items.length} product{items.length !== 1 ? "s" : ""}
              </p>

              {/* Exactly tera: items.map((item) => ...) */}
              {items.map((item) => (
                <CartItemCard key={item.product} item={item} />
              ))}

              {/* Fresh banner */}
              <div style={s.banner}>
                <span style={{ fontSize:20 }}>🌿</span>
                <p style={s.bannerText}>
                  All items are harvested fresh and dispatched within 2 hours.
                </p>
              </div>
            </div>

            {/* Right — CartSummary uses selectTotalPrice */}
            <div style={s.summaryCol}>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const s = {
  bcBar:       { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:     { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
  main:        { maxWidth:1280, margin:"0 auto", padding:"40px 40px 72px" },
  header:      { marginBottom:32 },
  heading:     { fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", lineHeight:1.1, marginBottom:10 },
  badge:       { background:T.greenLight, color:T.greenDeep, fontSize:14, fontWeight:700, padding:"4px 16px", borderRadius:40, letterSpacing:0 },
  underline:   { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99 },
  layout:      { display:"flex", gap:28, alignItems:"flex-start" },
  listCol:     { flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:14 },
  listMeta:    { fontSize:13, color:T.textLight, fontWeight:500 },
  summaryCol:  { width:340, flexShrink:0, position:"sticky", top:24 },
  banner:      { display:"flex", gap:12, alignItems:"center", background:T.greenPale, borderRadius:14, padding:"14px 18px", border:`1.5px solid ${T.greenLight}` },
  bannerText:  { fontSize:13, color:T.text, lineHeight:1.6 },
};

const { greenDeep:_a, greenDark:_b, greenPale:_c, greenLight:_d } = T;
export default CartPage;