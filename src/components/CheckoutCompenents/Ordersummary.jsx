import React from "react";
import { T, FONT, fadeUp } from "./checkoutTokens.js";

const OrderSummary = ({ cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice, placingOrder }) => (
  <div style={{ ...s.wrap, ...fadeUp(60) }}>
    <div style={s.header}>
      <div style={s.iconCircle}>📋</div>
      <h2 style={s.title}>Order Summary</h2>
    </div>

    {/* Items list */}
    <div style={s.itemsList}>
      {cartItems.map((item, i) => (
        <div key={i} style={s.item}>
          <div style={s.itemLeft}>
            <div style={s.qtyBadge}>{item.qty}</div>
            <span style={s.itemName}>{item.name}</span>
          </div>
          <span style={s.itemPrice}>Rs {(item.price * item.qty).toLocaleString()}</span>
        </div>
      ))}
    </div>

    {/* Price breakdown */}
    <div style={s.breakdown}>
      {[
        { label:"Items",     val:`Rs ${itemsPrice.toLocaleString()}` },
        { label:"Shipping",  val: shippingPrice === 0 ? "FREE 🎉" : `Rs ${shippingPrice}`, green: shippingPrice === 0 },
        { label:"Tax (18%)", val:`Rs ${taxPrice.toLocaleString()}` },
      ].map(({ label, val, green }, i) => (
        <div key={i} style={s.priceLine}>
          <span style={s.priceLabel}>{label}</span>
          <span style={{ ...s.priceVal, color: green ? T.green : T.text }}>{val}</span>
        </div>
      ))}
    </div>

    {/* Total */}
    <div style={s.totalRow}>
      <span style={s.totalLabel}>Total</span>
      <span style={s.totalVal}>Rs {totalPrice.toLocaleString()}</span>
    </div>

    {/* Free shipping note */}
    {shippingPrice > 0 && (
      <div style={s.freeShipNote}>
        Add $ {(5000 - itemsPrice).toLocaleString()} more for free shipping!
        <div style={s.track}>
          <div style={{ ...s.fill, width:`${Math.min(100,Math.round((itemsPrice/5000)*100))}%` }} />
        </div>
      </div>
    )}

    {/* Place order button */}
    <button
      type="submit"
      disabled={placingOrder || cartItems.length === 0}
      style={{
        ...s.placeBtn,
        opacity: (placingOrder || cartItems.length === 0) ? .75 : 1,
        cursor: (placingOrder || cartItems.length === 0) ? "not-allowed" : "pointer",
      }}
      onMouseEnter={e => { if (!placingOrder) { e.currentTarget.style.background=T.greenDark; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(59,183,126,.38)"; }}}
      onMouseLeave={e => { if (!placingOrder) { e.currentTarget.style.background=T.green; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(59,183,126,.28)"; }}}
    >
      {placingOrder ? (
        <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
          <span style={s.spinner} /> Placing Order…
        </span>
      ) : (
        `Place Order — $ ${totalPrice.toLocaleString()}`
      )}
    </button>

    {/* Trust badges */}
    <div style={s.trustRow}>
      {["🔒 Secure Checkout", "↩️ Easy Returns", "🚚 Fast Delivery"].map((t, i) => (
        <span key={i} style={s.trustItem}>{t}</span>
      ))}
    </div>

    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const s = {
  wrap:        { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"26px", boxShadow:"0 4px 24px rgba(29,53,87,.07)", position:"sticky", top:24, fontFamily:FONT },
  header:      { display:"flex", alignItems:"center", gap:12, marginBottom:22 },
  iconCircle:  { width:40, height:40, borderRadius:"50%", background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
  title:       { fontSize:18, fontWeight:800, color:T.navy, letterSpacing:"-.3px", margin:0 },
  itemsList:   { display:"flex", flexDirection:"column", gap:10, marginBottom:20 },
  item:        { display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 },
  itemLeft:    { display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 },
  qtyBadge:    { width:22, height:22, borderRadius:"50%", background:T.greenLight, color:T.greenDeep, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  itemName:    { fontSize:13, fontWeight:600, color:T.navy, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
  itemPrice:   { fontSize:13, fontWeight:700, color:T.text, flexShrink:0 },
  breakdown:   { borderTop:`1px solid ${T.border}`, marginBottom:0 },
  priceLine:   { display:"flex", justifyContent:"space-between", padding:"11px 0", borderBottom:`1px solid ${T.border}` },
  priceLabel:  { fontSize:14, color:T.text, fontWeight:500 },
  priceVal:    { fontSize:14, fontWeight:700, color:T.navy },
  totalRow:    { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:`2px solid ${T.border}`, margin:"0 0 16px" },
  totalLabel:  { fontSize:16, fontWeight:700, color:T.navy },
  totalVal:    { fontSize:28, fontWeight:800, color:T.green, letterSpacing:"-.5px" },
  freeShipNote:{ background:T.offWhite, borderRadius:10, padding:"10px 14px", fontSize:12, color:T.text, fontWeight:500, marginBottom:16 },
  track:       { height:5, background:T.border, borderRadius:99, overflow:"hidden", marginTop:8 },
  fill:        { height:"100%", background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99, transition:"width .6s cubic-bezier(.4,0,.2,1)" },
  placeBtn:    { width:"100%", background:T.green, color:"#fff", border:"none", borderRadius:14, padding:"15px", fontWeight:700, fontSize:15, fontFamily:FONT, transition:"all .22s", boxShadow:"0 6px 20px rgba(59,183,126,.28)", letterSpacing:.2, marginBottom:16 },
  trustRow:    { display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6 },
  trustItem:   { fontSize:10, color:T.textLight, fontWeight:600 },
  spinner:     { width:15, height:15, border:"2.5px solid rgba(255,255,255,.35)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" },
};

const { greenDeep:_a, greenDark:_b } = T;
export default OrderSummary;