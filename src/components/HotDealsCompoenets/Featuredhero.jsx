import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { T, FONT, fadeUp } from "./hotdealsTokens.js";
import CountdownTimer from "./CountdownTimer.jsx";

// ── Import tera cart + wishlist slice ────────────────────────
import { addToCart }      from "../../redux/cart/Cartslice.js";
import { toggleWishlist } from "../../redux/Wishlist/wishlistSlice.js";

// ─────────────────────────────────────────────────────────────
//  FeaturedHero — first product large hero card
//  product shape: { _id, name, image, price, description,
//                   brand, category, countInStock }
// ─────────────────────────────────────────────────────────────
const FeaturedHero = ({ product }) => {
  const dispatch = useDispatch();
  const [added,    setAdded]    = useState(false);
  const [wishlisted, setWish]   = useState(false);
  const [hov,      setHov]      = useState(false);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 30;

  const handleCart = () => {
    dispatch(addToCart({ productId: product._id, qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWish = () => {
    dispatch(toggleWishlist(product._id));
    setWish(w => !w);
  };

  return (
    <div style={{ ...s.wrap, ...fadeUp(0) }}>
      {/* Image */}
      <div
        style={s.imgSide}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ ...s.img, transform: hov ? "scale(1.06)" : "scale(1)" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80"; }}
        />
        <div style={s.imgOverlay} />

        {/* Badges */}
        <div style={s.badges}>
          <span style={s.hotBadge}>🔥 Hot Deal</span>
          <span style={s.discBadge}>-{discount}% OFF</span>
        </div>

        {/* Countdown on image */}
        <div style={s.timerWrap}>
          <CountdownTimer />
        </div>

        {/* Wishlist heart */}
        <button
          onClick={handleWish}
          style={{ ...s.heartBtn, background: wishlisted ? T.pink : "rgba(255,255,255,.92)", color: wishlisted ? "#fff" : T.pink }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info side */}
      <div style={s.infoSide}>
        <div style={s.topRow}>
          <span style={s.brand}>{product.brand || "NestFarm"}</span>
          {product.category && (
            <span style={s.catTag}>
              {typeof product.category === "object" ? product.category.name : product.category}
            </span>
          )}
        </div>

        <h2 style={s.name}>{product.name}</h2>

        <p style={s.desc}>
          {product.description?.slice(0, 160) || "Fresh, handpicked produce delivered to your door."}
          {product.description?.length > 160 ? "…" : ""}
        </p>

        {/* Price */}
        <div style={s.priceRow}>
          <span style={s.price}>Rs {product.price?.toLocaleString()}</span>
          {product.originalPrice && (
            <span style={s.origPrice}>Rs {product.originalPrice?.toLocaleString()}</span>
          )}
        </div>

        {/* Savings pill */}
        <div style={s.savingsPill}>
          🎉 You save $ {((product.originalPrice || product.price * 1.3) - product.price).toFixed(0)} on this deal!
        </div>

        {/* Stock */}
        <div style={s.stockRow}>
          <span style={{ ...s.stockDot, background: product.countInStock > 0 ? T.green : T.pink }} />
          <span style={{ fontSize:13, fontWeight:600, color: product.countInStock > 0 ? T.green : T.pink }}>
            {product.countInStock > 0 ? `Only ${product.countInStock} left in stock!` : "Out of Stock"}
          </span>
        </div>

        {/* CTA buttons */}
        <div style={s.ctaRow}>
          <button
            onClick={handleCart}
            disabled={!product.countInStock}
            style={{
              ...s.cartBtn,
              background: added ? T.greenDark : T.green,
              opacity: product.countInStock ? 1 : .6,
              cursor: product.countInStock ? "pointer" : "not-allowed",
            }}
            onMouseEnter={e => { if (product.countInStock && !added) { e.currentTarget.style.background = T.greenDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(59,183,126,.38)"; }}}
            onMouseLeave={e => { if (!added) { e.currentTarget.style.background = T.green; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,183,126,.28)"; }}}
          >
            {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
          </button>

          <button
            onClick={handleWish}
            style={{
              ...s.wishBtn,
              background: wishlisted ? T.pinkLight : "#fff",
              borderColor: wishlisted ? T.pink : T.border,
              color: wishlisted ? T.pink : T.text,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.pinkLight; e.currentTarget.style.borderColor = T.pink; e.currentTarget.style.color = T.pink; }}
            onMouseLeave={e => { if (!wishlisted) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}}
          >
            {wishlisted ? "❤️ Saved" : "🤍 Wishlist"}
          </button>
        </div>

        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    </div>
  );
};

const s = {
  wrap:       { display:"grid", gridTemplateColumns:"1fr 1fr", borderRadius:24, overflow:"hidden", border:`1.5px solid ${T.border}`, boxShadow:"0 8px 40px rgba(29,53,87,.10)", background:"#fff", fontFamily:FONT, minHeight:420 },
  imgSide:    { position:"relative", overflow:"hidden", cursor:"pointer", minHeight:380 },
  img:        { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .5s cubic-bezier(.4,0,.2,1)" },
  imgOverlay: { position:"absolute", inset:0, background:"linear-gradient(to right,rgba(29,53,87,.08) 0%,transparent 60%)" },
  badges:     { position:"absolute", top:20, left:20, display:"flex", flexDirection:"column", gap:8 },
  hotBadge:   { background:`linear-gradient(135deg,${T.yellow},#FF6B35)`, color:"#fff", fontSize:12, fontWeight:700, padding:"6px 14px", borderRadius:40, letterSpacing:.3, display:"inline-block" },
  discBadge:  { background:T.pink, color:"#fff", fontSize:12, fontWeight:700, padding:"6px 14px", borderRadius:40, display:"inline-block" },
  timerWrap:  { position:"absolute", bottom:20, left:20, right:20 },
  heartBtn:   { position:"absolute", top:20, right:20, width:40, height:40, borderRadius:"50%", border:"none", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .22s", backdropFilter:"blur(4px)", fontFamily:FONT },
  infoSide:   { padding:"36px 32px", display:"flex", flexDirection:"column", gap:16, justifyContent:"center" },
  topRow:     { display:"flex", alignItems:"center", gap:10 },
  brand:      { fontSize:12, fontWeight:700, color:T.green, letterSpacing:1, textTransform:"uppercase" },
  catTag:     { fontSize:11, color:T.textLight, background:T.offWhite, padding:"3px 10px", borderRadius:40, border:`1px solid ${T.border}` },
  name:       { fontSize:"clamp(20px,2.5vw,30px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", lineHeight:1.2, margin:0 },
  desc:       { fontSize:14, color:T.text, lineHeight:1.75, margin:0 },
  priceRow:   { display:"flex", alignItems:"center", gap:12 },
  price:      { fontSize:36, fontWeight:800, color:T.green, letterSpacing:"-.5px", lineHeight:1 },
  origPrice:  { fontSize:18, color:T.textLight, textDecoration:"line-through" },
  savingsPill:{ background:T.greenLight, color:T.greenDeep, fontSize:13, fontWeight:600, padding:"8px 16px", borderRadius:10 },
  stockRow:   { display:"flex", alignItems:"center", gap:8 },
  stockDot:   { width:8, height:8, borderRadius:"50%", flexShrink:0 },
  ctaRow:     { display:"flex", gap:12 },
  cartBtn:    { flex:1, color:"#fff", border:"none", borderRadius:14, padding:"14px 20px", fontWeight:700, fontSize:15, fontFamily:FONT, transition:"all .22s", boxShadow:"0 6px 20px rgba(59,183,126,.28)", letterSpacing:.2 },
  wishBtn:    { padding:"14px 18px", border:`1.5px solid`, borderRadius:14, fontWeight:700, fontSize:14, fontFamily:FONT, transition:"all .22s", cursor:"pointer", whiteSpace:"nowrap" },
};

const { greenDeep:_a, greenDark:_b, pinkLight:_c } = T;
export default FeaturedHero;