import React from "react";
import { T, STATUS, FONT } from "./orderTokens.js";

const STEPS = ["pending", "processing", "shipped", "delivered"];

// Visual progress bar — shows order journey
const OrderProgressBar = ({ status }) => {
  if (status === "cancelled") return (
    <div style={{ display:"flex", alignItems:"center", gap:10, background:T.pinkLight, borderRadius:12, padding:"12px 16px", margin:"16px 0 0" }}>
      <span style={{ fontSize:18 }}>❌</span>
      <span style={{ fontSize:13, fontWeight:700, color:T.pink }}>This order was cancelled</span>
    </div>
  );

  const current = STATUS[status]?.step ?? 0;

  return (
    <div style={s.wrap}>
      {STEPS.map((step, i) => {
        const cfg   = STATUS[step];
        const done  = i < current;
        const active= i === current;
        return (
          <React.Fragment key={step}>
            {/* Step */}
            <div style={s.step}>
              <div style={{
                ...s.circle,
                background:  done || active ? cfg.color : "#fff",
                borderColor: done || active ? cfg.color : T.border,
                boxShadow:   active ? `0 0 0 4px ${cfg.color}22` : "none",
              }}>
                {done
                  ? <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>✓</span>
                  : <span style={{ fontSize:14 }}>{cfg.icon}</span>
                }
              </div>
              <span style={{ ...s.stepLabel, color: done || active ? T.navy : T.textLight, fontWeight: active ? 700 : 500 }}>
                {cfg.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div style={{ ...s.line, background: i < current ? T.green : T.border }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const s = {
  wrap:       { display:"flex", alignItems:"flex-start", gap:0, padding:"20px 0 4px", fontFamily:FONT },
  step:       { display:"flex", flexDirection:"column", alignItems:"center", gap:8, minWidth:60 },
  circle:     { width:38, height:38, borderRadius:"50%", border:`2px solid`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s cubic-bezier(.4,0,.2,1)", flexShrink:0 },
  stepLabel:  { fontSize:11, textAlign:"center", lineHeight:1.3, maxWidth:64, transition:"color .2s" },
  line:       { flex:1, height:2, marginTop:18, borderRadius:99, transition:"background .4s", minWidth:20 },
};

export default OrderProgressBar;