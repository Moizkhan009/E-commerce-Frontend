import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { T, FONT, fadeUp } from "./Producttokens.js";

import { addToCart }       from "../../redux/Cart/Cartslice.js";
import { toggleWishlist }  from "../../redux/Wishlist/wishlistSlice.js";

// ─────────────────────────────────────────────────────────────
//  ProductActions
//  — Qty stepper
//  — Add to Cart button  → dispatch(addToCart)
//  — Wishlist button     → dispatch(toggleWishlist)
// ─────────────────────────────────────────────────────────────
const ProductActions = ({ product, isWishlisted = false }) => {
  const dispatch = useDispatch();
  const [qty,         setQty]         = useState(1);
  const [cartAdded,   setCartAdded]   = useState(false);
  const [wishlisted,  setWishlisted]  = useState(isWishlisted);
  const [wishAnim,    setWishAnim]    = useState(false);

  // ── Add to Cart — dispatch(addToCart({ productId, qty })) ──
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, qty }));
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2200);
  };

  // ── Wishlist — dispatch(toggleWishlist(productId)) ─────────
  const handleWishlist = () => {
    dispatch(toggleWishlist(product._id));
    setWishlisted(w => !w);
    setWishAnim(true);
    setTimeout(() => setWishAnim(false), 600);
  };

  const maxQty = product.countInStock || 10;
  const inStock = product.countInStock > 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, fontFamily:FONT, ...fadeUp(300) }}>

      {/* Divider */}
      <div style={{ height:1, background:T.border }} />

      {/* Qty selector */}
      <div style={s.qtyRow}>
        <span style={s.qtyLabel}>Quantity</span>
        <div style={s.stepper}>
          <button
            style={s.stepBtn}
            onClick={() => setQty(q => Math.max(1, q - 1))}
            disabled={qty <= 1}
            onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
            onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}
          >−</button>
          <span style={s.qtyNum}>{qty}</span>
          <button
            style={s.stepBtn}
            onClick={() => setQty(q => Math.min(maxQty, q + 1))}
            disabled={qty >= maxQty}
            onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
            onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}
          >+</button>
        </div>
        <span style={s.stockNote}>
          {inStock
            ? <><span style={{ color:T.green }}>●</span> {product.countInStock} in stock</>
            : <><span style={{ color:T.pink }}>●</span> Out of stock</>}
        </span>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        style={{
          ...s.cartBtn,
          background: cartAdded ? T.greenDark : inStock ? T.green : "#D1D9E0",
          cursor:     inStock ? "pointer" : "not-allowed",
          transform:  cartAdded ? "scale(.98)" : "scale(1)",
          boxShadow:  cartAdded
            ? "none"
            : inStock ? "0 6px 20px rgba(59,183,126,.30)" : "none",
        }}
        onMouseEnter={e => { if (inStock && !cartAdded) { e.currentTarget.style.background=T.greenDark; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(59,183,126,.38)"; }}}
        onMouseLeave={e => { if (inStock && !cartAdded) { e.currentTarget.style.background=T.green; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(59,183,126,.30)"; }}}
      >
        {cartAdded ? "✓ Added to Cart!" : `🛒 Add to Cart · $ ${(product.price * qty).toLocaleString()}`}
      </button>

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        style={{
          ...s.wishBtn,
          background:   wishlisted ? T.pinkLight : "#fff",
          borderColor:  wishlisted ? T.pink      : T.border,
          color:        wishlisted ? T.pink       : T.text,
          transform:    wishAnim ? "scale(1.04)" : "scale(1)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background=T.pinkLight; e.currentTarget.style.borderColor=T.pink; e.currentTarget.style.color=T.pink; }}
        onMouseLeave={e => {
          if (!wishlisted) {
            e.currentTarget.style.background="#fff";
            e.currentTarget.style.borderColor=T.border;
            e.currentTarget.style.color=T.text;
          }
        }}
      >
        {wishlisted ? "❤️ Saved to Wishlist" : "🤍 Add to Wishlist"}
      </button>

      {/* Trust row */}
      <div style={s.trustRow}>
        {["🚚 Free delivery over $ 999","↩️ Easy 7-day returns","🌿 100% organic"].map((t,i)=>(
          <div key={i} style={s.trustItem}>
            <span style={s.trustDot} />{t}
          </div>
        ))}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
};

const s = {
  qtyRow:    { display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" },
  qtyLabel:  { fontSize:13, fontWeight:700, color:T.navy },
  stepper:   { display:"flex", alignItems:"center", border:`1.5px solid ${T.border}`, borderRadius:11, overflow:"hidden" },
  stepBtn:   { width:38, height:38, background:"#fff", color:T.navy, border:"none", fontSize:20, cursor:"pointer", fontFamily:FONT, transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600 },
  qtyNum:    { width:46, textAlign:"center", fontSize:16, fontWeight:700, color:T.navy, borderLeft:`1.5px solid ${T.border}`, borderRight:`1.5px solid ${T.border}`, lineHeight:"38px" },
  stockNote: { fontSize:12, fontWeight:600, color:T.textLight, display:"flex", alignItems:"center", gap:5 },
  cartBtn:   { width:"100%", color:"#fff", border:"none", borderRadius:14, padding:"16px", fontWeight:700, fontSize:15, fontFamily:FONT, transition:"all .22s", letterSpacing:.2 },
  wishBtn:   { width:"100%", border:`1.5px solid`, borderRadius:14, padding:"14px", fontWeight:700, fontSize:15, fontFamily:FONT, transition:"all .22s", cursor:"pointer", letterSpacing:.2 },
  trustRow:  { display:"flex", flexDirection:"column", gap:8, paddingTop:4 },
  trustItem: { display:"flex", alignItems:"center", gap:8, fontSize:12, color:T.textLight, fontWeight:500 },
  trustDot:  { width:5, height:5, borderRadius:"50%", background:T.green, flexShrink:0 },
};

const { pinkLight:_a } = T;
export default ProductActions;