import React from "react";
import { T, FONT } from "./Producttokens";

const sh = {
  background: "linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
};

const Bone = ({ w="100%", h=16, r=8, mb=0 }) => (
  <div style={{ width:w, height:h, borderRadius:r, marginBottom:mb, ...sh }} />
);

const ProductSkeleton = () => (
  <div style={{ fontFamily:FONT }}>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>
      {/* Image skeleton */}
      <div style={{ borderRadius:22, overflow:"hidden", aspectRatio:"1/1", ...sh }} />
      {/* Info skeleton */}
      <div style={{ display:"flex", flexDirection:"column", gap:16, paddingTop:8 }}>
        <Bone w="35%" h={12} />
        <Bone w="80%" h={36} r={10} />
        <Bone w="50%" h={14} />
        <Bone w="40%" h={40} r={10} />
        <Bone w="100%" h={14} />
        <Bone w="90%"  h={14} />
        <Bone w="75%"  h={14} />
        <div style={{ display:"flex", gap:10, marginTop:8 }}>
          {[1,2,3].map(i=><Bone key={i} w="30%" h={56} r={12} />)}
        </div>
        <Bone w="100%" h={52} r={14} />
        <Bone w="100%" h={52} r={14} />
      </div>
    </div>
  </div>
);

export default ProductSkeleton;