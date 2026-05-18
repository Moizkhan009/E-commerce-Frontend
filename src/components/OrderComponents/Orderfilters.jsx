import React from "react";
import { T, STATUS, FONT } from "./orderTokens.js";

const ALL_FILTERS = [
  { value:"all",       label:"All Orders" },
  { value:"pending",   label:"Pending"    },
  { value:"processing",label:"Processing" },
  { value:"shipped",   label:"Shipped"    },
  { value:"delivered", label:"Delivered"  },
  { value:"cancelled", label:"Cancelled"  },
];

const OrderFilters = ({ active, onFilter, counts }) => (
  <div style={s.wrap}>
    <div style={s.pills}>
      {ALL_FILTERS.map(({ value, label }) => {
        const isActive = active === value;
        const cfg      = STATUS[value];
        const count    = counts?.[value] ?? 0;
        return (
          <button
            key={value}
            onClick={() => onFilter(value)}
            style={{
              ...s.pill,
              background:  isActive ? (cfg?.bg  ?? T.greenLight) : "#fff",
              color:       isActive ? (cfg?.color ?? T.green)    : T.text,
              borderColor: isActive ? (cfg?.color ?? T.green)    : T.border,
              fontWeight:  isActive ? 700 : 500,
            }}
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor=T.green; e.currentTarget.style.color=T.green; }}}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}}
          >
            {cfg && <span style={{ fontSize:12 }}>{cfg.icon}</span>}
            {label}
            {value !== "all" && count > 0 && (
              <span style={{ ...s.cnt, background: isActive ? (cfg?.color+"22") : T.offWhite, color: isActive ? cfg?.color : T.textLight }}>
                {count}
              </span>
            )}
            {value === "all" && (
              <span style={{ ...s.cnt, background: isActive ? T.greenLight : T.offWhite, color: isActive ? T.green : T.textLight }}>
                {counts?.total ?? 0}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

const s = {
  wrap:  { background:"#fff", borderRadius:16, border:`1.5px solid ${T.border}`, padding:"14px 18px", fontFamily:FONT, boxShadow:"0 2px 12px rgba(29,53,87,.04)" },
  pills: { display:"flex", gap:8, flexWrap:"wrap" },
  pill:  { display:"flex", alignItems:"center", gap:7, border:`1.5px solid`, borderRadius:40, padding:"7px 16px", fontSize:13, cursor:"pointer", fontFamily:FONT, transition:"all .18s cubic-bezier(.4,0,.2,1)", whiteSpace:"nowrap" },
  cnt:   { fontSize:11, fontWeight:700, padding:"1px 7px", borderRadius:40, lineHeight:"16px" },
};

export default OrderFilters;