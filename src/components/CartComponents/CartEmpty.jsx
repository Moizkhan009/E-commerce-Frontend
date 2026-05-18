import React from "react";
import { T, FONT } from "./Carttokken";

const CartEmpty = () => (
  <div style={s.wrap}>
    <div style={s.iconWrap}>
      <div style={s.bg} />
      <span style={s.icon}>🛒</span>
    </div>
    <h2 style={s.heading}>Cart Empty</h2>
    <p style={s.sub}>Add some fresh organic produce to get started!</p>
    <button style={s.btn}
      onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background=T.green; e.currentTarget.style.transform="translateY(0)"; }}>
      🌿 Browse Products
    </button>
    <div style={s.hints}>
      {["Free delivery over $49","100% organic","Same-day delivery"].map((t,i) => (
        <div key={i} style={s.hint}><span style={s.dot}/>{t}</div>
      ))}
    </div>
  </div>
);

const s = {
  wrap:    { textAlign:"center", padding:"80px 32px", fontFamily:FONT },
  iconWrap:{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:28 },
  bg:      { position:"absolute", width:110, height:110, borderRadius:"50%", background:`linear-gradient(135deg,${T.greenLight},${T.greenPale})` },
  icon:    { fontSize:50, position:"relative", zIndex:1 },
  heading: { fontSize:28, fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
  sub:     { color:T.textLight, fontSize:15, lineHeight:1.7, maxWidth:340, margin:"0 auto 28px" },
  btn:     { background:T.green, color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"all .22s" },
  hints:   { display:"flex", justifyContent:"center", gap:28, marginTop:36, flexWrap:"wrap" },
  hint:    { display:"flex", alignItems:"center", gap:7, fontSize:13, color:T.textLight, fontWeight:500 },
  dot:     { width:6, height:6, borderRadius:"50%", background:T.green, flexShrink:0 },
};

const { greenPale:_a } = T;
export default CartEmpty;