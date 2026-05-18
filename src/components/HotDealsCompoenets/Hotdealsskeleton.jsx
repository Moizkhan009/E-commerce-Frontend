import React from "react";
import { T, FONT } from "./hotdealsTokens.js";

const sh = {
  background: "linear-gradient(90deg,#E2ECE8 25%,#f0f4f2 50%,#E2ECE8 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.4s infinite linear",
};

const Bone = ({ w = "100%", h = 16, r = 8 }) => (
  <div style={{ width: w, height: h, borderRadius: r, ...sh }} />
);

const HotDealsSkeleton = () => (
  <div style={{ fontFamily: FONT }}>
    <style>{`@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}`}</style>

    {/* Featured hero skeleton */}
    <div style={{ borderRadius: 24, overflow: "hidden", height: 420, ...sh, marginBottom: 40 }} />

    {/* Grid skeleton */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ background: "#fff", borderRadius: 18, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ height: 200, ...sh }} />
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            <Bone w="60%" h={14} />
            <Bone w="85%" h={18} />
            <Bone w="40%" h={22} />
            <Bone w="100%" h={40} r={10} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HotDealsSkeleton;