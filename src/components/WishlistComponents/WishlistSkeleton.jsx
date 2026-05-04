import React from "react";
import { T } from "./wishlistTokens.js";

const shimmer = {
  background: "linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
};

const WishlistSkeleton = () => (
  <div>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:20 }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden" }}>
          <div style={{ height:200, ...shimmer }} />
          <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ height:16, width:"75%", borderRadius:8, ...shimmer }} />
            <div style={{ height:13, width:"45%", borderRadius:8, ...shimmer }} />
            <div style={{ height:40, width:"100%", borderRadius:11, ...shimmer }} />
            <div style={{ height:12, width:"55%", borderRadius:8, margin:"0 auto", ...shimmer }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WishlistSkeleton;