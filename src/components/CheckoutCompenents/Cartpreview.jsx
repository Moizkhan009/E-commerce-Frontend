import React, { useState } from "react";
import { T, FONT, fadeUp } from "./checkoutTokens.js";

// Cart items preview at top of checkout
const CartPreview = ({ cartItems }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ ...s.wrap, ...fadeUp(0) }}>
      <button
        style={s.toggleRow}
        onClick={() => setExpanded(e => !e)}
        type="button"
      >
        <div style={s.toggleLeft}>
          <span style={s.cartIcon}>🛒</span>
          <span style={s.toggleTitle}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </span>
          <span style={s.countBadge}>{cartItems.length}</span>
        </div>
        <span style={{ ...s.chevron, transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
      </button>

      {expanded && cartItems.length > 0 && (
        <div style={s.itemsList}>
          {cartItems.map((item, i) => (
            <div key={i} style={s.item}>
              <div style={s.imgWrap}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={s.img}
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&q=60"; }}
                />
              </div>
              <div style={s.itemInfo}>
                <p style={s.itemName}>{item.name}</p>
                <p style={s.itemQty}>Qty: {item.qty}</p>
              </div>
              <p style={s.itemPrice}>Rs {(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {cartItems.length === 0 && (
        <div style={s.empty}>
          <span style={{ fontSize:32, display:"block", marginBottom:8 }}>🛒</span>
          No items in cart. <a href="/cart" style={{ color:T.green, fontWeight:700 }}>Go to Cart</a>
        </div>
      )}
    </div>
  );
};

const s = {
  wrap:        { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden", fontFamily:FONT, boxShadow:"0 2px 16px rgba(29,53,87,.05)" },
  toggleRow:   { width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", background:"none", border:"none", cursor:"pointer", fontFamily:FONT },
  toggleLeft:  { display:"flex", alignItems:"center", gap:12 },
  cartIcon:    { fontSize:20 },
  toggleTitle: { fontSize:14, fontWeight:700, color:T.navy },
  countBadge:  { background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:700, padding:"2px 10px", borderRadius:40 },
  chevron:     { fontSize:11, color:T.textLight, transition:"transform .25s", display:"block" },
  itemsList:   { borderTop:`1px solid ${T.border}`, padding:"16px 24px", display:"flex", flexDirection:"column", gap:12 },
  item:        { display:"flex", alignItems:"center", gap:14 },
  imgWrap:     { width:52, height:52, borderRadius:10, overflow:"hidden", flexShrink:0, background:T.offWhite },
  img:         { width:"100%", height:"100%", objectFit:"cover", display:"block" },
  itemInfo:    { flex:1, minWidth:0 },
  itemName:    { fontSize:13, fontWeight:600, color:T.navy, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", margin:0 },
  itemQty:     { fontSize:11, color:T.textLight, margin:"2px 0 0", fontWeight:500 },
  itemPrice:   { fontSize:14, fontWeight:700, color:T.green, flexShrink:0 },
  empty:       { padding:"24px", textAlign:"center", fontSize:14, color:T.textLight, borderTop:`1px solid ${T.border}` },
};

const { greenDeep:_a } = T;
export default CartPreview;