import React from "react";
import { T, FONT } from "./orderTokens.js";

const sh = {
  background:"linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize:"600px 100%",
  animation:"shimmer 1.4s infinite linear",
};

const Bone = ({ w="100%", h=16, r=8, mb=0 }) => (
  <div style={{ width:w, height:h, borderRadius:r, marginBottom:mb, ...sh }} />
);

const OrderSkeleton = () => (
  <div style={{ fontFamily:FONT }}>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>
    {[1,2,3].map(i => (
      <div key={i} style={{ background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"24px", marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <Bone w="30%" h={18} />
          <Bone w="18%" h={28} r={40} />
        </div>
        <div style={{ display:"flex", gap:12, marginBottom:20 }}>
          {[1,2].map(j => (
            <div key={j} style={{ display:"flex", gap:12, flex:1 }}>
              <Bone w={56} h={56} r={10} />
              <div style={{ flex:1 }}>
                <Bone w="70%" h={14} mb={8} />
                <Bone w="40%" h={12} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Bone w="35%" h={36} r={10} />
          <Bone w="35%" h={36} r={10} />
        </div>
      </div>
    ))}
  </div>
);

export default OrderSkeleton;