import React, { useEffect, useState } from "react";
import { T, FONT } from "./wishlistTokens.js";

const WishlistToast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 280); }, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? T.pink : T.green;

  return (
    <div style={{
      position:"fixed", bottom:28, left:"50%",
      transform:`translateX(-50%) translateY(${visible ? 0 : 14}px)`,
      opacity: visible ? 1 : 0,
      transition:"all .26s cubic-bezier(.4,0,.2,1)",
      background:bg, color:"#fff",
      fontSize:14, fontWeight:600,
      padding:"11px 22px 11px 16px",
      borderRadius:40, zIndex:9999,
      boxShadow:"0 8px 28px rgba(29,53,87,.22)",
      display:"flex", alignItems:"center", gap:10,
      whiteSpace:"nowrap", fontFamily:FONT, pointerEvents:"none",
    }}>
      <span style={{ width:22, height:22, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0 }}>
        {type === "error" ? "✕" : "✓"}
      </span>
      {message}
    </div>
  );
};

export default WishlistToast;