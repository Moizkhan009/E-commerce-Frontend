  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { T, FONT } from "./Carttokken.js";
  import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();

    // const handleCheckout = async () => {
    //   setLoading(true);
    //   await new Promise(r => setTimeout(r, 1600));
    //   setLoading(false);
    //   setSuccess(true);
    // };
    const goToCheckout = () => {
    navigate("/checkout", { state: { Items: items } });
    console.log(items);
    
    
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
          onClick={goToCheckout}
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