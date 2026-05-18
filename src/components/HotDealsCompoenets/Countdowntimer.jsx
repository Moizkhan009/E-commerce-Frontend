import React, { useState, useEffect } from "react";
import { T, FONT } from "./hotdealsTokens.js";

// Countdown timer — deals end at midnight
const CountdownTimer = () => {
  const getTimeLeft = () => {
    const now      = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = n => String(n).padStart(2, "0");

  return (
    <div style={s.wrap}>
      <span style={s.label}>⏰ Ends in</span>
      {[
        { val: pad(time.h), unit: "hrs"  },
        { val: pad(time.m), unit: "min"  },
        { val: pad(time.s), unit: "sec"  },
      ].map(({ val, unit }, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={s.colon}>:</span>}
          <div style={s.block}>
            <span style={s.num}>{val}</span>
            <span style={s.unit}>{unit}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const s = {
  wrap:  { display:"flex", alignItems:"center", gap:8, fontFamily:FONT },
  label: { fontSize:12, fontWeight:700, color:T.yellow, marginRight:4 },
  block: { background:"rgba(0,0,0,.55)", backdropFilter:"blur(8px)", borderRadius:10, padding:"6px 12px", display:"flex", flexDirection:"column", alignItems:"center", minWidth:48 },
  num:   { fontSize:20, fontWeight:800, color:"#fff", lineHeight:1, letterSpacing:"-.5px" },
  unit:  { fontSize:9, color:"rgba(255,255,255,.6)", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginTop:2 },
  colon: { fontSize:18, fontWeight:800, color:"rgba(255,255,255,.5)", marginBottom:8 },
};

export default CountdownTimer;