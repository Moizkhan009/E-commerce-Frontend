import React from "react";
import { T, FONT, fadeUp } from "./hotdealsTokens.js";

const DealsHeader = ({ count = 0 }) => (
  <div style={{ ...s.wrap, ...fadeUp(0) }}>
    <div style={s.left}>
      <div style={s.eyebrow}>
        <span style={s.fireDot}>🔥</span> Limited Time Offers
      </div>
      <h1 style={s.heading}>
        Hot <span style={s.highlight}>Deals</span>
      </h1>
      <div style={s.underline} />
      {count > 0 && (
        <p style={s.sub}>
          <span style={s.countBadge}>{count} deals</span> available today — don't miss out!
        </p>
      )}
    </div>

    {/* Right — promo pills */}
    <div style={s.right}>
      {[
        { icon:"🚚", text:"Free delivery on orders above $ 999" },
        { icon:"↩️", text:"7-day easy returns"                   },
        { icon:"🌿", text:"100% fresh & organic"                 },
      ].map((item, i) => (
        <div key={i} style={s.promoPill}>
          <span style={{ fontSize:16 }}>{item.icon}</span>
          <span style={s.promoText}>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const s = {
  wrap:        { display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:24, marginBottom:36, fontFamily:FONT },
  left:        {},
  eyebrow:     { display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:T.yellow, marginBottom:10 },
  fireDot:     { fontSize:16, animation:"pulse 1.5s ease-in-out infinite" },
  heading:     { fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:T.navy, letterSpacing:"-.8px", lineHeight:1.1, marginBottom:10 },
  highlight:   { background:`linear-gradient(135deg,${T.green},${T.greenDark})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
  underline:   { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, marginBottom:12 },
  sub:         { fontSize:14, color:T.textLight, fontWeight:500, display:"flex", alignItems:"center", gap:8 },
  countBadge:  { background:T.greenLight, color:T.greenDeep, fontSize:13, fontWeight:700, padding:"3px 12px", borderRadius:40 },
  right:       { display:"flex", flexDirection:"column", gap:10, alignSelf:"center" },
  promoPill:   { display:"flex", alignItems:"center", gap:10, background:"#fff", borderRadius:12, padding:"10px 16px", border:`1.5px solid ${T.border}`, boxShadow:"0 2px 10px rgba(29,53,87,.04)" },
  promoText:   { fontSize:13, fontWeight:600, color:T.text },
};

const { greenDeep:_a, greenDark:_b } = T;
export default DealsHeader;