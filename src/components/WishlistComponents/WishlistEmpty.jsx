import React from "react";
import { T, FONT } from "./wishlistTokens.js";

// Tera: !loading && items.length === 0 → <h2>😔 Your wishlist is empty</h2>
const WishlistEmpty = () => (
  <div style={s.wrap}>
    <div style={s.iconWrap}>
      <div style={s.bg} />
      <span style={s.icon}>🤍</span>
    </div>
    <h2 style={s.heading}>Your wishlist is empty</h2>
    <p style={s.sub}>Save your favourite items here so you never lose track of what you love!</p>
    <div style={s.hints}>
      {[
        { icon:"💚", text:"Save items for later"         },
        { icon:"🛒", text:"Add to cart in one click"     },
        { icon:"🔔", text:"Get notified on price drops"  },
      ].map((h, i) => (
        <div key={i} style={s.hint}>
          <div style={s.hintIcon}>{h.icon}</div>
          <span style={s.hintText}>{h.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const s = {
  wrap:     { textAlign:"center", padding:"72px 32px", fontFamily:FONT },
  iconWrap: { position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:28 },
  bg:       { position:"absolute", width:110, height:110, borderRadius:"50%", background:`linear-gradient(135deg,${T.greenLight},${T.pinkLight})` },
  icon:     { fontSize:52, position:"relative", zIndex:1 },
  heading:  { fontSize:26, fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
  sub:      { color:T.textLight, fontSize:14, lineHeight:1.75, maxWidth:380, margin:"0 auto 36px" },
  hints:    { display:"flex", justifyContent:"center", gap:32, flexWrap:"wrap" },
  hint:     { display:"flex", flexDirection:"column", alignItems:"center", gap:8 },
  hintIcon: { width:44, height:44, borderRadius:"50%", background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 },
  hintText: { fontSize:12, color:T.textLight, fontWeight:600, maxWidth:100, textAlign:"center", lineHeight:1.4 },
};

const { pinkLight:_a } = T;
export default WishlistEmpty;