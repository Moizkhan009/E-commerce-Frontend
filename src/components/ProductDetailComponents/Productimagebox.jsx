import React, { useState } from "react";
import { T, FONT, fadeUp } from "./Producttokens";

// ── Product image with zoom on hover ────────────────────────
const ProductImageBox = ({ image, name }) => {
  const [zoomed, setZoomed] = useState(false);
  const [pos,    setPos]    = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  return (
    <div style={{ ...s.wrap, ...fadeUp(0) }}>
      {/* Main image */}
      <div
        style={{ ...s.imgBox, cursor: zoomed ? "zoom-out" : "zoom-in" }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={onMove}
      >
        <img
          src={image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80"}
          alt={name}
          style={{
            ...s.img,
            transformOrigin: `${pos.x}% ${pos.y}%`,
            transform: zoomed ? "scale(1.85)" : "scale(1)",
          }}
          onError={e => {
            e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80";
          }}
        />
        {!zoomed && (
          <div style={s.zoomHint}>🔍 Hover to zoom</div>
        )}
      </div>

      {/* Floating badge */}
      <div style={s.freshBadge}>🌿 Farm Fresh</div>
    </div>
  );
};

const s = {
  wrap:      { position:"relative", fontFamily:FONT },
  imgBox:    { background:"#fff", borderRadius:22, border:`1.5px solid ${T.border}`, overflow:"hidden", aspectRatio:"1/1", boxShadow:"0 8px 32px rgba(29,53,87,.08)" },
  img:       { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .35s cubic-bezier(.4,0,.2,1)" },
  zoomHint:  { position:"absolute", bottom:16, right:16, background:"rgba(29,53,87,.55)", color:"#fff", fontSize:11, fontWeight:600, padding:"5px 13px", borderRadius:40, backdropFilter:"blur(4px)", pointerEvents:"none" },
  freshBadge:{ position:"absolute", top:16, left:16, background:T.green, color:"#fff", fontSize:11, fontWeight:700, letterSpacing:.8, textTransform:"uppercase", padding:"5px 13px", borderRadius:40, boxShadow:"0 4px 12px rgba(59,183,126,.35)" },
};

export default ProductImageBox;