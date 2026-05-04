import React from "react";
import { T } from "./Carttokken.js";

const shimmerStyle = {
  background: "linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
};

const CartSkeleton = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>
    {[1,2,3].map(i => (
      <div key={i} style={{ display:"flex", background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden" }}>
        <div style={{ width:130, minHeight:148, flexShrink:0, ...shimmerStyle }} />
        <div style={{ flex:1, padding:"18px 20px", display:"flex", flexDirection:"column", gap:14, justifyContent:"center" }}>
          {[["65%",18],["40%",13],["50%",13],["100%",38]].map(([w,h],j) => (
            <div key={j} style={{ width:w, height:h, borderRadius:8, ...shimmerStyle }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default CartSkeleton;