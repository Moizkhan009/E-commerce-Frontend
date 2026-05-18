import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { T, FONT } from "./Carttokken.js";

import { updateCartItem, removeFromCart } from "../../redux/Cart/Cartslice.js";

const CartItemCard = ({ item }) => {
  const dispatch   = useDispatch();
  const [hov,      setHov]      = useState(false);
  const [removing, setRemoving] = useState(false);

  // item shape from your backend: { product, name, image, price, qty }
  const subtotal = (item.price * item.qty).toFixed(2);

  const handleQty = (newQty) => {
    if (newQty < 1) {
      handleRemove();
      return;
    }
    dispatch(updateCartItem({ productId: item.product, qty: newQty }));
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart({ productId: item.product }));
    }, 320);
  };

  return (
    <div
      style={{
        ...s.card,
        opacity:   removing ? 0   : 1,
        transform: removing
          ? "translateX(-18px)"
          : hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov
          ? "0 14px 40px rgba(29,53,87,.11)"
          : "0 2px 12px rgba(29,53,87,.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={s.imgBox}>
        <img
          src={item.image}
          alt={item.name}
          style={{ ...s.img, transform: hov ? "scale(1.07)" : "scale(1)" }}
          onError={(e) => {
            e.target.src =
              "https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg";
          }}
        />
        {/* Remove — visible on hover */}
        <button
          onClick={handleRemove}
          style={{ ...s.removeBtn, opacity: hov ? 1 : 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = T.pink; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.9)"; e.currentTarget.style.color = T.navy; }}
        >
          ✕
        </button>
      </div>

      {/* Details */}
      <div style={s.details}>
        {/* Name */}
        <h3 style={{ ...s.name, color: hov ? T.green : T.navy }}>
          {item.name}
        </h3>

        {/* Unit price */}
        <div style={s.row}>
          <span style={s.label}>Unit Price</span>
          <span style={s.price}>${item.price.toFixed(2)}</span>
        </div>

        {/* Qty stepper */}
        <div style={s.row}>
          <span style={s.label}>Quantity</span>
          <div style={s.stepper}>
            <button
              style={s.stepBtn}
              onClick={() => handleQty(item.qty - 1)}
              onMouseEnter={e => { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.color = T.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.navy; }}
            >−</button>
            <span style={s.qtyNum}>{item.qty}</span>
            <button
              style={s.stepBtn}
              onClick={() => handleQty(item.qty + 1)}
              onMouseEnter={e => { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.color = T.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.navy; }}
            >+</button>
          </div>
        </div>

        {/* Subtotal — price * qty (same as ur MyCart) */}
        <div style={s.subtotalBox}>
          <span style={s.subtotalLabel}>Subtotal</span>
          <span style={s.subtotalVal}>${subtotal}</span>
        </div>
      </div>
    </div>
  );
};

const s = {
  card:         { display:"flex", background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden", transition:"all .3s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
  imgBox:       { position:"relative", width:130, flexShrink:0 },
  img:          { width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:148, transition:"transform .4s cubic-bezier(.4,0,.2,1)" },
  removeBtn:    { position:"absolute", top:10, right:10, width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,.9)", color:T.navy, border:"none", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", backdropFilter:"blur(4px)", fontFamily:FONT },
  details:      { flex:1, padding:"18px 20px", display:"flex", flexDirection:"column", gap:13, justifyContent:"center" },
  name:         { fontSize:16, fontWeight:700, lineHeight:1.35, margin:0, transition:"color .2s" },
  row:          { display:"flex", alignItems:"center", justifyContent:"space-between" },
  label:        { fontSize:11, fontWeight:600, color:T.textLight, textTransform:"uppercase", letterSpacing:.8 },
  price:        { fontSize:18, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
  stepper:      { display:"flex", alignItems:"center", border:`1.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" },
  stepBtn:      { width:34, height:34, background:"#fff", color:T.navy, border:"none", fontSize:18, cursor:"pointer", fontFamily:FONT, transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600 },
  qtyNum:       { width:44, textAlign:"center", fontSize:15, fontWeight:700, color:T.navy, borderLeft:`1.5px solid ${T.border}`, borderRight:`1.5px solid ${T.border}`, lineHeight:"34px" },
  subtotalBox:  { display:"flex", alignItems:"center", justifyContent:"space-between", background:T.greenPale, borderRadius:10, padding:"10px 14px" },
  subtotalLabel:{ fontSize:11, fontWeight:700, color:T.greenDeep, textTransform:"uppercase", letterSpacing:.8 },
  subtotalVal:  { fontSize:20, fontWeight:800, color:T.navy, letterSpacing:"-.3px" },
};

const { greenDeep:_a, greenPale:_b } = T;
export default CartItemCard;