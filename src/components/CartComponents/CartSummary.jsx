// // import React, { useState } from "react";
// // import { T, PROMO_CODES } from "./cartData.js";

// // const CartSummary = ({ subtotal, itemCount, onCheckout }) => {
// //   const [promo,     setPromo]     = useState("");
// //   const [applied,   setApplied]   = useState(null);
// //   const [promoErr,  setPromoErr]  = useState("");
// //   const [loading,   setLoading]   = useState(false);
// //   const [success,   setSuccess]   = useState(false);

// //   const DELIVERY = subtotal >= 49 ? 0 : 4.99;
// //   const discount = applied
// //     ? applied.type === "percent"
// //       ? (subtotal * applied.value) / 100
// //       : Math.min(applied.value, subtotal)
// //     : 0;
// //   const tax   = ((subtotal - discount) * 0.08).toFixed(2);
// //   const total = Math.max(0, subtotal - discount + DELIVERY + parseFloat(tax));

// //   const applyPromo = () => {
// //     setPromoErr("");
// //     const code = promo.trim().toUpperCase();
// //     if (PROMO_CODES[code]) {
// //       setApplied({ ...PROMO_CODES[code], code });
// //       setPromo("");
// //     } else {
// //       setPromoErr("Invalid promo code. Try NEST10, FRESH5, or ORGANIC.");
// //     }
// //   };

// //   const handleCheckout = () => {
// //     setLoading(true);
// //     setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
// //   };

// //   const rows = [
// //     { label:`Subtotal (${itemCount} item${itemCount!==1?"s":""})`, val:`$${subtotal.toFixed(2)}` },
// //     ...(applied ? [{ label:`Promo: ${applied.code}`, val:`-$${discount.toFixed(2)}`, green:true }] : []),
// //     { label:"Delivery", val: DELIVERY === 0 ? "FREE 🎉" : `$${DELIVERY.toFixed(2)}`, green: DELIVERY===0 },
// //     { label:"Tax (8%)", val:`$${tax}` },
// //   ];

// //   if (success) {
// //     return (
// //       <div style={{ ...s.wrap, textAlign:"center", padding:"48px 32px" }}>
// //         <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
// //         <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:28, fontWeight:700, color:T.navy, marginBottom:8 }}>Order Placed!</h3>
// //         <p style={{ color:T.text, fontSize:14, lineHeight:1.7, marginBottom:24 }}>
// //           Thank you for shopping with NestFarm. Your fresh produce is being prepared and will arrive today!
// //         </p>
// //         <div style={{ background:T.greenLight, borderRadius:14, padding:"16px 20px" }}>
// //           <div style={{ fontSize:13, fontWeight:700, color:T.greenDeep }}>Estimated Delivery: Today, 2–4 PM</div>
// //           <div style={{ fontSize:12, color:T.text, marginTop:4 }}>Order #{Math.floor(Math.random()*900000+100000)}</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={s.wrap}>
// //       <h3 style={s.title}>Order Summary</h3>

// //       {/* Promo input */}
// //       <div style={s.promoWrap}>
// //         <div style={s.promoRow}>
// //           <input
// //             value={promo}
// //             onChange={e => { setPromo(e.target.value); setPromoErr(""); }}
// //             onKeyDown={e => e.key==="Enter" && applyPromo()}
// //             placeholder="Promo code (e.g. NEST10)"
// //             style={s.promoInput}
// //             onFocus={e => e.target.style.borderColor=T.green}
// //             onBlur={e => e.target.style.borderColor=T.border}
// //           />
// //           <button onClick={applyPromo} style={s.promoBtn}
// //             onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; }}
// //             onMouseLeave={e => { e.currentTarget.style.background=T.green; }}>Apply</button>
// //         </div>
// //         {promoErr && <p style={{ color:"#E05C8A", fontSize:12, margin:"6px 0 0" }}>{promoErr}</p>}
// //         {applied  && (
// //           <div style={s.appliedTag}>
// //             <span>✓ {applied.label}</span>
// //             <button onClick={() => setApplied(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.greenDeep, fontSize:14, lineHeight:1 }}>✕</button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Free delivery progress */}
// //       {DELIVERY > 0 && (
// //         <div style={s.freeDelWrap}>
// //           <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
// //             <span style={{ fontSize:12, fontWeight:600, color:T.text }}>Add ${(49 - subtotal).toFixed(2)} more for FREE delivery</span>
// //             <span style={{ fontSize:12, fontWeight:700, color:T.green }}>{Math.min(100, Math.round((subtotal/49)*100))}%</span>
// //           </div>
// //           <div style={{ height:6, background:T.border, borderRadius:99, overflow:"hidden" }}>
// //             <div style={{ height:"100%", width:`${Math.min(100,(subtotal/49)*100)}%`, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, transition:"width .5s" }} />
// //           </div>
// //         </div>
// //       )}
// //       {DELIVERY === 0 && (
// //         <div style={{ background:T.greenLight, borderRadius:12, padding:"10px 14px", fontSize:12, fontWeight:600, color:T.greenDeep, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
// //           🚚 You qualify for free same-day delivery!
// //         </div>
// //       )}

// //       {/* Price rows */}
// //       <div style={s.rows}>
// //         {rows.map(({ label, val, green }, i) => (
// //           <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${T.border}` }}>
// //             <span style={{ fontSize:14, color:T.text }}>{label}</span>
// //             <span style={{ fontSize:14, fontWeight:700, color: green ? T.green : T.navy }}>{val}</span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Total */}
// //       <div style={s.totalRow}>
// //         <span style={s.totalLabel}>Total</span>
// //         <span style={s.totalVal}>${total.toFixed(2)}</span>
// //       </div>

// //       {/* Checkout */}
// //       <button onClick={handleCheckout} disabled={loading} style={{ ...s.checkoutBtn, opacity: loading ? .85 : 1 }}
// //         onMouseEnter={e => { if (!loading) e.currentTarget.style.background=T.greenDark; }}
// //         onMouseLeave={e => { if (!loading) e.currentTarget.style.background=T.green; }}>
// //         {loading ? (
// //           <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
// //             <span style={{ width:16, height:16, border:"2.5px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
// //             Processing…
// //           </span>
// //         ) : "Proceed to Checkout →"}
// //       </button>

// //       {/* Trust row */}
// //       <div style={s.trustRow}>
// //         {["🔒 Secure","↩️ Easy Returns","🚚 Fast Delivery"].map((t,i) => (
// //           <span key={i} style={{ fontSize:11, color:T.textLight, fontWeight:600 }}>{t}</span>
// //         ))}
// //       </div>

// //       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //     </div>
// //   );
// // };

// // const s = {
// //   wrap:         { background:"#fff", borderRadius:22, border:`1.5px solid ${T.border}`, padding:"28px", boxShadow:"0 4px 24px rgba(29,53,87,.07)", position:"sticky", top:24, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" },
// //   title:        { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, fontWeight:700, color:T.navy, marginBottom:20 },
// //   promoWrap:    { marginBottom:18 },
// //   promoRow:     { display:"flex", gap:10 },
// //   promoInput:   { flex:1, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"10px 14px", fontSize:13, fontFamily:"inherit", outline:"none", transition:"border-color .2s", color:T.navy, background:T.offWhite },
// //   promoBtn:     { background:T.green, color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"background .2s", whiteSpace:"nowrap" },
// //   appliedTag:   { display:"flex", justifyContent:"space-between", alignItems:"center", background:T.greenLight, borderRadius:8, padding:"8px 12px", marginTop:8, fontSize:12, fontWeight:600, color:T.greenDeep },
// //   freeDelWrap:  { background:T.offWhite, borderRadius:12, padding:"12px 14px", marginBottom:16 },
// //   rows:         { marginBottom:16 },
// //   totalRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:`2px solid ${T.border}`, marginBottom:20 },
// //   totalLabel:   { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:700, color:T.navy },
// //   totalVal:     { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:700, color:T.green },
// //   checkoutBtn:  { width:"100%", background:T.green, color:"#fff", border:"none", borderRadius:14, padding:"16px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit", transition:"background .22s", marginBottom:16, letterSpacing:.3 },
// //   trustRow:     { display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6 },
// // };

// // const { greenDeep: _gd, greenDark: _gdk } = T;

// // export default CartSummary;
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectTotalPrice, selectItemCount } from "../../redux/Cart/Cartslice.js";
// import { T, FONT } from "./Carttokken.jsx";

// const CartSummary = () => {
//   // totalPrice comes from Redux state — which mirrors backend pre-save hook
//   const totalPrice = useSelector(selectTotalPrice);
//   const itemCount  = useSelector(selectItemCount);

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const DELIVERY   = totalPrice >= 49 ? 0 : 4.99;
//   const tax        = (totalPrice * 0.08).toFixed(2);
//   const grandTotal = (totalPrice + DELIVERY + parseFloat(tax)).toFixed(2);
//   const toFree     = Math.max(0, 49 - totalPrice).toFixed(2);
//   const shipPct    = Math.min(100, Math.round((totalPrice / 49) * 100));

//   const handleCheckout = async () => {
//     setLoading(true);
//     // TODO: dispatch your order creation thunk here
//     await new Promise((r) => setTimeout(r, 1600));
//     setLoading(false);
//     setSuccess(true);
//   };

//   if (success) {
//     return (
//       <div style={{ ...s.wrap, textAlign:"center", padding:"44px 28px" }}>
//         <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
//         <h3 style={s.successTitle}>Order Placed!</h3>
//         <p style={s.successSub}>Your fresh produce will arrive today.</p>
//         <div style={s.successBadge}>Estimated: Today, 2–4 PM</div>
//       </div>
//     );
//   }

//   return (
//     <div style={s.wrap}>
//       <h3 style={s.title}>Order Summary</h3>

//       {/* Delivery progress */}
//       {DELIVERY > 0 ? (
//         <div style={s.freeBox}>
//           <div style={s.freeRow}>
//             <span style={s.freeText}>Add <strong style={{ color:T.green }}>${toFree}</strong> for FREE delivery</span>
//             <span style={{ fontSize:12, fontWeight:700, color:T.green }}>{shipPct}%</span>
//           </div>
//           <div style={s.track}><div style={{ ...s.fill, width:`${shipPct}%` }} /></div>
//         </div>
//       ) : (
//         <div style={s.freeUnlocked}>🚚 Free same-day delivery unlocked!</div>
//       )}

//       {/* Rows — totalPrice directly from Redux (= backend) */}
//       <div style={s.rows}>
//         {[
//           { label: `Items (${itemCount})`, val: `$${totalPrice.toFixed(2)}` },
//           { label: "Delivery",             val: DELIVERY === 0 ? "FREE 🎉" : `$${DELIVERY.toFixed(2)}`, green: DELIVERY === 0 },
//           { label: "Tax (8%)",             val: `$${tax}` },
//         ].map(({ label, val, green }, i) => (
//           <div key={i} style={s.row}>
//             <span style={s.rowLabel}>{label}</span>
//             <span style={{ ...s.rowVal, color: green ? T.green : T.navy }}>{val}</span>
//           </div>
//         ))}
//       </div>

//       {/* Grand total */}
//       <div style={s.totalRow}>
//         <span style={s.totalLabel}>Total</span>
//         <span style={s.totalVal}>${grandTotal}</span>
//       </div>

//       <button
//         onClick={handleCheckout}
//         disabled={loading || itemCount === 0}
//         style={{ ...s.btn, opacity: (loading || itemCount === 0) ? .75 : 1 }}
//         onMouseEnter={e => { if (!loading) e.currentTarget.style.background = T.greenDark; }}
//         onMouseLeave={e => { if (!loading) e.currentTarget.style.background = T.green; }}
//       >
//         {loading ? (
//           <span style={{ display:"flex", alignItems:"center", gap:9, justifyContent:"center" }}>
//             <span style={s.spinner} /> Processing…
//           </span>
//         ) : "Proceed to Checkout →"}
//       </button>

//       <div style={s.trust}>
//         {["🔒 Secure", "↩️ Easy Returns", "🌿 100% Fresh"].map((t, i) => (
//           <span key={i} style={s.trustItem}>{t}</span>
//         ))}
//       </div>

//       <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
//     </div>
//   );
// };

// const s = {
//   wrap:         { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"26px", boxShadow:"0 4px 24px rgba(29,53,87,.07)", position:"sticky", top:24, fontFamily:FONT },
//   title:        { fontSize:20, fontWeight:800, color:T.navy, letterSpacing:"-.3px", marginBottom:20 },
//   freeBox:      { background:T.offWhite, borderRadius:12, padding:"12px 14px", marginBottom:18 },
//   freeRow:      { display:"flex", justifyContent:"space-between", marginBottom:7 },
//   freeText:     { fontSize:12, fontWeight:600, color:T.text },
//   track:        { height:6, background:T.border, borderRadius:99, overflow:"hidden" },
//   fill:         { height:"100%", background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, transition:"width .5s" },
//   freeUnlocked: { background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:700, padding:"10px 14px", borderRadius:12, marginBottom:18 },
//   rows:         { borderTop:`1px solid ${T.border}` },
//   row:          { display:"flex", justifyContent:"space-between", padding:"11px 0", borderBottom:`1px solid ${T.border}` },
//   rowLabel:     { fontSize:14, color:T.text, fontWeight:500 },
//   rowVal:       { fontSize:14, fontWeight:700, color:T.navy },
//   totalRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:`2px solid ${T.border}`, margin:"0 0 20px" },
//   totalLabel:   { fontSize:16, fontWeight:700, color:T.navy },
//   totalVal:     { fontSize:30, fontWeight:800, color:T.green, letterSpacing:"-.5px" },
//   btn:          { width:"100%", background:T.green, color:"#fff", border:"none", borderRadius:13, padding:"15px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s", letterSpacing:.2, marginBottom:16 },
//   trust:        { display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6 },
//   trustItem:    { fontSize:11, color:T.textLight, fontWeight:600 },
//   spinner:      { width:14, height:14, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" },
//   successTitle: { fontSize:24, fontWeight:800, color:T.navy, marginBottom:8, letterSpacing:"-.3px" },
//   successSub:   { color:T.textLight, fontSize:14, lineHeight:1.7, marginBottom:20 },
//   successBadge: { background:T.greenLight, color:T.greenDeep, borderRadius:12, padding:"14px 18px", fontSize:13, fontWeight:700 },
// };

// const { greenDeep:_a, greenDark:_b } = T;
// export default CartSummary;


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { T, FONT } from "./Carttokken.js";

import { selectTotalPrice, selectCartItems } from "../../redux/Cart/Cartslice.js";

const CartSummary = () => {
  // Tera selectTotalPrice — backend pre-save hook ka value
  const total     = useSelector(selectTotalPrice);
  const items     = useSelector(selectCartItems);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const DELIVERY   = total >= 49 ? 0 : 4.99;
  const TAX        = parseFloat((total * 0.08).toFixed(2));
  const GRAND      = (total + DELIVERY + TAX).toFixed(2);
  const toFree     = Math.max(0, 49 - total).toFixed(2);
  const shipPct    = Math.min(100, Math.round((total / 49) * 100));

  const handleCheckout = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ ...s.wrap, textAlign:"center", padding:"44px 24px" }}>
        <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
        <h3 style={s.successTitle}>Order Placed!</h3>
        <p style={s.successSub}>Your fresh produce is on its way!</p>
        <div style={s.successBadge}>Estimated: Today, 2–4 PM</div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <h3 style={s.title}>Order Summary</h3>

      {/* Free delivery progress */}
      {DELIVERY > 0 ? (
        <div style={s.freeBox}>
          <div style={s.freeTop}>
            <span style={s.freeText}>
              Add <strong style={{ color: T.green }}>${toFree}</strong> for FREE delivery
            </span>
            <span style={s.freePct}>{shipPct}%</span>
          </div>
          <div style={s.track}>
            <div style={{ ...s.fill, width: `${shipPct}%` }} />
          </div>
        </div>
      ) : (
        <div style={s.freeUnlocked}>🚚 Free same-day delivery unlocked!</div>
      )}

      {/* Price rows */}
      <div style={s.rows}>
        {[
          { label: `Items (${itemCount})`, val: `$${total.toFixed(2)}` },
          { label: "Delivery", val: DELIVERY === 0 ? "FREE 🎉" : `$${DELIVERY.toFixed(2)}`, green: DELIVERY === 0 },
          { label: "Tax (8%)", val: `$${TAX.toFixed(2)}` },
        ].map(({ label, val, green }, i) => (
          <div key={i} style={s.priceRow}>
            <span style={s.rowLabel}>{label}</span>
            <span style={{ ...s.rowVal, color: green ? T.green : T.navy }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Total — same as <h3>Total: {total}</h3> in ur MyCart */}
      <div style={s.totalRow}>
        <span style={s.totalLabel}>Total</span>
        <span style={s.totalVal}>${GRAND}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || itemCount === 0}
        style={{ ...s.btn, opacity: loading || itemCount === 0 ? .75 : 1 }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = T.greenDark; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = T.green; }}
      >
        {loading ? (
          <span style={{ display:"flex", alignItems:"center", gap:9, justifyContent:"center" }}>
            <span style={s.spinner} /> Processing…
          </span>
        ) : "Proceed to Checkout →"}
      </button>

      <div style={s.trust}>
        {["🔒 Secure", "↩️ Returns", "🌿 Fresh"].map((t, i) => (
          <span key={i} style={s.trustItem}>{t}</span>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const s = {
  wrap:         { background:"#fff", borderRadius:22, border:`1.5px solid ${T.border}`, padding:"26px", boxShadow:"0 4px 24px rgba(29,53,87,.07)", position:"sticky", top:24, fontFamily:FONT },
  title:        { fontSize:20, fontWeight:800, color:T.navy, letterSpacing:"-.3px", marginBottom:20 },
  freeBox:      { background:T.offWhite, borderRadius:12, padding:"12px 14px", marginBottom:18 },
  freeTop:      { display:"flex", justifyContent:"space-between", marginBottom:8 },
  freeText:     { fontSize:12, fontWeight:600, color:T.text },
  freePct:      { fontSize:12, fontWeight:800, color:T.green },
  track:        { height:7, background:T.border, borderRadius:99, overflow:"hidden" },
  fill:         { height:"100%", background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, transition:"width .6s cubic-bezier(.4,0,.2,1)" },
  freeUnlocked: { background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:700, padding:"10px 14px", borderRadius:12, marginBottom:18 },
  rows:         { borderTop:`1px solid ${T.border}` },
  priceRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${T.border}` },
  rowLabel:     { fontSize:14, color:T.text, fontWeight:500 },
  rowVal:       { fontSize:14, fontWeight:700, color:T.navy },
  totalRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:`2px solid ${T.border}`, margin:"0 0 22px" },
  totalLabel:   { fontSize:16, fontWeight:700, color:T.navy },
  totalVal:     { fontSize:32, fontWeight:800, color:T.green, letterSpacing:"-.5px" },
  btn:          { width:"100%", background:T.green, color:"#fff", border:"none", borderRadius:14, padding:"15px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s", letterSpacing:.2, marginBottom:16 },
  trust:        { display:"flex", justifyContent:"space-between" },
  trustItem:    { fontSize:11, color:T.textLight, fontWeight:600 },
  spinner:      { width:14, height:14, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" },
  successTitle: { fontSize:24, fontWeight:800, color:T.navy, marginBottom:8, letterSpacing:"-.3px" },
  successSub:   { color:T.textLight, fontSize:14, lineHeight:1.7, marginBottom:20 },
  successBadge: { background:T.greenLight, color:T.greenDeep, borderRadius:12, padding:"14px 18px", fontSize:13, fontWeight:700 },
};

const { greenDeep:_a, greenDark:_b } = T;
export default CartSummary;