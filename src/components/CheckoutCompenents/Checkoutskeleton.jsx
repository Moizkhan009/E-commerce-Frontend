import React from "react";
import { T, FONT } from "./checkoutTokens.js";

const sh = {
  background: "linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
};
const Bone = ({ w="100%", h=16, r=8, mb=0 }) => (
  <div style={{ width:w, height:h, borderRadius:r, marginBottom:mb, ...sh }} />
);

const CheckoutSkeleton = () => (
  <div style={{ fontFamily:FONT, maxWidth:1200, margin:"0 auto", padding:"44px 40px" }}>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>
    <Bone w="30%" h={36} r={10} mb={32} />
    <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:28 }}>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {[1,2].map(i => (
          <div key={i} style={{ background:"#fff", borderRadius:20, padding:"28px", border:`1.5px solid ${T.border}` }}>
            <Bone w="40%" h={20} mb={20} />
            {[1,2,3].map(j => <Bone key={j} w="100%" h={44} r={10} mb={12} />)}
          </div>
        ))}
      </div>
      <div style={{ background:"#fff", borderRadius:20, padding:"28px", border:`1.5px solid ${T.border}`, height:"fit-content" }}>
        <Bone w="50%" h={20} mb={20} />
        {[1,2,3,4].map(i => <Bone key={i} w="100%" h={16} mb={14} />)}
        <Bone w="100%" h={52} r={14} />
      </div>
    </div>
  </div>
);

export default CheckoutSkeleton;