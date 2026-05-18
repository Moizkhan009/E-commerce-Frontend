import React from "react";
import { STATUS, FONT } from "./orderTokens.js";

// Reusable status badge — uses tera orderStatus field
const OrderStatusBadge = ({ status, large = false }) => {
  const cfg = STATUS[status] || STATUS.pending;
  return (
    <span style={{
      display:        "inline-flex",
      alignItems:     "center",
      gap:            6,
      background:     cfg.bg,
      color:          cfg.color,
      fontSize:       large ? 13 : 11,
      fontWeight:     700,
      padding:        large ? "7px 16px" : "4px 12px",
      borderRadius:   40,
      letterSpacing:  .3,
      fontFamily:     FONT,
      border:         `1.5px solid ${cfg.color}22`,
      whiteSpace:     "nowrap",
    }}>
      <span style={{ fontSize: large ? 14 : 12 }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
};

export default OrderStatusBadge;