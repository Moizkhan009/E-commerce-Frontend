import React from "react";
import { T, FONT } from "./orderTokens.js";

const OrderEmpty = ({ filtered = false }) => (
  <div style={s.wrap}>
    <div style={s.iconWrap}>
      <div style={s.bg} />
      <span style={s.icon}>{filtered ? "🔍" : "📦"}</span>
    </div>
    <h2 style={s.heading}>
      {filtered ? "No orders found" : "No orders yet"}
    </h2>
    <p style={s.sub}>
      {filtered
        ? "No orders match this filter. Try selecting a different status."
        : "You haven't placed any orders yet. Start shopping and your orders will appear here!"}
    </p>
    {!filtered && (
      <button
        onClick={() => window.location.href = "/"}
        style={s.btn}
        onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; e.currentTarget.style.transform="translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background=T.green; e.currentTarget.style.transform="translateY(0)"; }}
      >
        🌿 Start Shopping
      </button>
    )}
  </div>
);

const s = {
  wrap:    { textAlign:"center", padding:"72px 32px", fontFamily:FONT },
  iconWrap:{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:28 },
  bg:      { position:"absolute", width:110, height:110, borderRadius:"50%", background:`linear-gradient(135deg,${T.greenLight},${T.greenPale})` },
  icon:    { fontSize:52, position:"relative", zIndex:1 },
  heading: { fontSize:26, fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
  sub:     { color:T.textLight, fontSize:14, lineHeight:1.75, maxWidth:380, margin:"0 auto 28px" },
  btn:     { background:T.green, color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"all .22s", letterSpacing:.2 },
};

const { greenPale:_a, greenDark:_b } = T;
export default OrderEmpty;