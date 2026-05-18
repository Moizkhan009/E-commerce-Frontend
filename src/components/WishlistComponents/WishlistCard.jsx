import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { T, FONT } from "./wishlistTokens.js";

// ── Tera exact slice imports ─────────────────────────────────
import { toggleWishlist, fetchWishlist } from "../../redux/Wishlist/wishlistSlice.js";

// ── Cart slice — apna actual path set karo ──────────────────
import { addToCart } from "../../redux/cart/Cartslice.js";

// ─────────────────────────────────────────────────────────────
//  WishlistCard
//  item shape (from tera slice):
//  { _id, product: { _id, name, image, price } | string,
//    name?, image?, price? }
// ─────────────────────────────────────────────────────────────
const WishlistCard = ({ item }) => {
  const dispatch = useDispatch();
  const [removing, setRemoving]   = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const [hov, setHov]             = useState(false);
  const [heartHov, setHeartHov]   = useState(false);

  //  exact same field resolution from Textwishlist
  const prod  = item.product || {};
  const pid   = prod._id || item.product;
  // const name  = item.name  || prod.name  || "No Name";
  // const image = item.image || prod.image;
  // const price = item.price || prod.price || 0;
  const name  = item.name  || prod.name  || "No Name";
const image = item.image || prod.image;
const price = item.price || prod.price || 0;

  // Heart button → toggleWishlist(pid) then fetchWishlist()
  // Tera exact same handleRemove logic
  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(toggleWishlist(pid)).then(() => {
        dispatch(fetchWishlist());
      });
    }, 320);
  };

  // Add to cart — productId, qty:1
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: pid, qty: 1 }));
    setAddedCart(true);
    setTimeout(() => setAddedCart(false), 2000);
  };

  return (
    <div
      style={{
        ...s.card,
        opacity:   removing ? 0 : 1,
        transform: removing ? "scale(.95)" : hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov
          ? "0 20px 48px rgba(29,53,87,.13)"
          : "0 2px 16px rgba(29,53,87,.06)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* ── Image ── */}
      <div style={s.imgWrap}>
        <img
          src={image || "https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg"}
          alt={name}
          style={{ ...s.img, transform: hov ? "scale(1.07)" : "scale(1)" }}
          onError={e => {
            e.target.src = "https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg";
          }}
        />
        <div style={s.imgGrad} />

        {/* ── Heart remove button ── */}
        <button
          onClick={handleRemove}
          style={{
            ...s.heartBtn,
            background:   heartHov ? T.pink      : "rgba(255,255,255,.92)",
            color:        heartHov ? "#fff"       : T.pink,
            transform:    heartHov ? "scale(1.15)" : "scale(1)",
            boxShadow:    heartHov
              ? "0 4px 16px rgba(224,92,138,.4)"
              : "0 2px 8px rgba(29,53,87,.1)",
          }}
          onMouseEnter={() => setHeartHov(true)}
          onMouseLeave={() => setHeartHov(false)}
          title="Remove from wishlist"
        >
          ❤️
        </button>
      </div>

      {/* ── Body ── */}
      <div style={s.body}>
        <h3 style={{ ...s.name, color: hov ? T.green : T.navy }}>{name}</h3>

        <div style={s.priceRow}>
          <span style={s.priceLabel}>Price</span>
          <span style={s.price}>₹{price}</span>
        </div>

        {/* ── Add to Cart button ── */}
        <button
          onClick={handleAddToCart}
          style={{
            ...s.cartBtn,
            background: addedCart ? T.greenDark : T.green,
            transform:  addedCart ? "scale(.98)" : "scale(1)",
          }}
          onMouseEnter={e => { if (!addedCart) e.currentTarget.style.background = T.greenDark; }}
          onMouseLeave={e => { if (!addedCart) e.currentTarget.style.background = T.green; }}
        >
          {addedCart ? "✓ Added to Cart!" : "🛒 Add to Cart"}
        </button>

        {/* ── Text remove link ── */}
        <button
          onClick={handleRemove}
          style={s.removeLink}
          onMouseEnter={e => { e.currentTarget.style.color = T.pink; }}
          onMouseLeave={e => { e.currentTarget.style.color = T.textLight; }}
        >
          ✕ Remove from wishlist
        </button>
      </div>
    </div>
  );
};

const s = {
  card:       { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden", transition:"all .3s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
  imgWrap:    { position:"relative", height:200, overflow:"hidden" },
  img:        { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .45s cubic-bezier(.4,0,.2,1)" },
  imgGrad:    { position:"absolute", inset:0, background:"linear-gradient(to top,rgba(29,53,87,.15) 0%,transparent 55%)" },
  heartBtn:   { position:"absolute", top:12, right:12, width:38, height:38, borderRadius:"50%", border:"none", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .22s cubic-bezier(.4,0,.2,1)", backdropFilter:"blur(4px)", fontFamily:FONT },
  body:       { padding:"16px 18px 18px", display:"flex", flexDirection:"column", gap:10 },
  name:       { fontSize:15, fontWeight:700, lineHeight:1.35, margin:0, transition:"color .2s" },
  priceRow:   { display:"flex", alignItems:"center", justifyContent:"space-between" },
  priceLabel: { fontSize:11, fontWeight:600, color:T.textLight, textTransform:"uppercase", letterSpacing:.8 },
  price:      { fontSize:20, fontWeight:800, color:T.pink, letterSpacing:"-.3px" },
  cartBtn:    { width:"100%", color:"#fff", border:"none", borderRadius:11, padding:"11px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:FONT, transition:"all .2s", letterSpacing:.2 },
  removeLink: { background:"none", border:"none", cursor:"pointer", fontSize:12, color:T.textLight, fontWeight:600, fontFamily:FONT, transition:"color .2s", textAlign:"center", padding:"2px 0" },
};

const { greenDark:_a } = T;
export default WishlistCard;