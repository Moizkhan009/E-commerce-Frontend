import React, { useState } from "react";
import { T, FONT, fadeUp } from "./orderTokens.js";
import OrderStatusBadge  from "./OrderStatusBadge.jsx";
import OrderProgressBar  from "./OrderProgressBar.jsx";

// ─────────────────────────────────────────────────────────────
//  OrderCard — one card per order
//
//  order shape (tera exact model):
//  {
//    _id, createdAt, orderStatus,
//    orderItems: [{ productId, name, quantity, price }],
//    shippingAddress: { addressLine1, city, state },
//    paymentMethod,
//    itemsPrice, shippingPrice, taxPrice, totalPrice,
//    deliveredAt
//  }
// ─────────────────────────────────────────────────────────────
const OrderCard = ({ order, delay = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const [hov,      setHov]      = useState(false);

  const date = new Date(order.createdAt).toLocaleDateString("en-PK", {
    day:"numeric", month:"short", year:"numeric",
  });

  const shortId = order._id?.slice(-8).toUpperCase();

  return (
    <div
      style={{
        ...s.card,
        ...fadeUp(delay),
        boxShadow: hov ? "0 12px 36px rgba(29,53,87,.10)" : "0 2px 14px rgba(29,53,87,.05)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* ── Header row ── */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <div>
            <div style={s.orderId}>Order #{shortId}</div>
            <div style={s.orderDate}>{date}</div>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>
        <div style={s.headerRight}>
          <span style={s.totalLabel}>Total</span>
          <span style={s.totalVal}>Rs {order.totalPrice?.toLocaleString()}</span>
        </div>
      </div>

      {/* ── Items preview (first 2) ── */}
      <div style={s.itemsRow}>
        {order.orderItems?.slice(0, 3).map((item, i) => (
          <div key={i} style={s.itemChip}>
            <div style={s.itemImgBox}>
              <span style={{ fontSize:18 }}>🥬</span>
            </div>
            <div style={s.itemInfo}>
              <span style={s.itemName}>{item.name}</span>
              <span style={s.itemQtyPrice}>×{item.quantity} · $ {item.price?.toLocaleString()}</span>
            </div>
          </div>
        ))}
        {order.orderItems?.length > 3 && (
          <div style={s.moreItems}>+{order.orderItems.length - 3} more</div>
        )}
      </div>

      {/* ── Quick info row ── */}
      <div style={s.infoRow}>
        <div style={s.infoChip}>
          <span style={s.infoIcon}>📍</span>
          <span style={s.infoText}>
            {order.shippingAddress?.city}, {order.shippingAddress?.state}
          </span>
        </div>
        <div style={s.infoChip}>
          <span style={s.infoIcon}>💳</span>
          <span style={s.infoText}>{order.paymentMethod}</span>
        </div>
        {order.deliveredAt && (
          <div style={s.infoChip}>
            <span style={s.infoIcon}>✅</span>
            <span style={s.infoText}>
              Delivered {new Date(order.deliveredAt).toLocaleDateString("en-PK", { day:"numeric", month:"short" })}
            </span>
          </div>
        )}
      </div>

      {/* ── Expand / Collapse ── */}
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        style={s.expandBtn}
        onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; e.currentTarget.style.borderColor=T.green; }}
        onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.text; e.currentTarget.style.borderColor=T.border; }}
      >
        {expanded ? "▲ Hide Details" : "▼ View Details"}
      </button>

      {/* ── Expanded section ── */}
      {expanded && (
        <div style={s.expanded}>

          {/* Progress bar */}
          <OrderProgressBar status={order.orderStatus} />

          <div style={s.expandGrid}>
            {/* All items */}
            <div style={s.expandSection}>
              <h4 style={s.expandTitle}>Order Items</h4>
              <div style={s.fullItemsList}>
                {order.orderItems?.map((item, i) => (
                  <div key={i} style={s.fullItem}>
                    <div style={s.fullItemLeft}>
                      <div style={s.fullItemImg}><span style={{ fontSize:22 }}>🥬</span></div>
                      <div>
                        <p style={s.fullItemName}>{item.name}</p>
                        <p style={s.fullItemSub}>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div style={s.fullItemRight}>
                      <p style={s.fullItemPrice}>Rs {item.price?.toLocaleString()}</p>
                      <p style={s.fullItemTotal}>Rs {(item.price * item.quantity)?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={s.expandRightCol}>
              {/* Shipping address */}
              <div style={s.expandSection}>
                <h4 style={s.expandTitle}>Shipping Address</h4>
                <div style={s.addrBox}>
                  <span style={s.addrIcon}>📍</span>
                  <div>
                    <p style={s.addrLine}>{order.shippingAddress?.addressLine1}</p>
                    <p style={s.addrCity}>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div style={s.expandSection}>
                <h4 style={s.expandTitle}>Price Breakdown</h4>
                <div style={s.priceTable}>
                  {[
                    { label:"Items",    val:`Rs ${order.itemsPrice?.toLocaleString()}` },
                    { label:"Shipping", val: order.shippingPrice === 0 ? "FREE" : `Rs ${order.shippingPrice}`, green: order.shippingPrice === 0 },
                    { label:"Tax",      val:`Rs ${order.taxPrice?.toLocaleString()}` },
                  ].map(({ label, val, green }, i) => (
                    <div key={i} style={s.priceLine}>
                      <span style={s.priceLabel}>{label}</span>
                      <span style={{ ...s.priceVal, color: green ? T.green : T.text }}>{val}</span>
                    </div>
                  ))}
                  <div style={s.priceTotal}>
                    <span style={s.priceTotalLabel}>Total</span>
                    <span style={s.priceTotalVal}>Rs {order.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const s = {
  card:           { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"22px 24px", transition:"all .28s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
  header:         { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, flexWrap:"wrap", gap:12 },
  headerLeft:     { display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" },
  orderId:        { fontSize:15, fontWeight:800, color:T.navy, letterSpacing:".3px" },
  orderDate:      { fontSize:12, color:T.textLight, fontWeight:500, marginTop:3 },
  headerRight:    { textAlign:"right" },
  totalLabel:     { fontSize:11, fontWeight:600, color:T.textLight, textTransform:"uppercase", letterSpacing:.8, display:"block" },
  totalVal:       { fontSize:22, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
  itemsRow:       { display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 },
  itemChip:       { display:"flex", alignItems:"center", gap:10, background:T.offWhite, borderRadius:12, padding:"8px 12px", border:`1px solid ${T.border}`, flex:"0 0 auto", maxWidth:220 },
  itemImgBox:     { width:36, height:36, borderRadius:8, background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  itemInfo:       { minWidth:0 },
  itemName:       { fontSize:12, fontWeight:700, color:T.navy, display:"block", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:130 },
  itemQtyPrice:   { fontSize:11, color:T.textLight, display:"block", marginTop:2 },
  moreItems:      { display:"flex", alignItems:"center", background:T.greenLight, color:T.greenDeep, fontSize:12, fontWeight:700, padding:"8px 14px", borderRadius:12 },
  infoRow:        { display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 },
  infoChip:       { display:"flex", alignItems:"center", gap:6, background:T.offWhite, borderRadius:40, padding:"5px 12px", border:`1px solid ${T.border}` },
  infoIcon:       { fontSize:13 },
  infoText:       { fontSize:12, fontWeight:600, color:T.text },
  expandBtn:      { background:"#fff", color:T.text, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"8px 18px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT, transition:"all .2s" },
  expanded:       { marginTop:20, paddingTop:20, borderTop:`1.5px dashed ${T.border}` },
  expandGrid:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginTop:8 },
  expandSection:  { marginBottom:18 },
  expandTitle:    { fontSize:13, fontWeight:800, color:T.navy, letterSpacing:"-.2px", marginBottom:12 },
  expandRightCol: { display:"flex", flexDirection:"column", gap:0 },
  fullItemsList:  { display:"flex", flexDirection:"column", gap:10 },
  fullItem:       { display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, padding:"10px 14px", background:T.offWhite, borderRadius:12, border:`1px solid ${T.border}` },
  fullItemLeft:   { display:"flex", alignItems:"center", gap:12, flex:1, minWidth:0 },
  fullItemImg:    { width:44, height:44, borderRadius:10, background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  fullItemName:   { fontSize:13, fontWeight:700, color:T.navy, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
  fullItemSub:    { fontSize:11, color:T.textLight, margin:"2px 0 0" },
  fullItemRight:  { textAlign:"right" },
  fullItemPrice:  { fontSize:12, color:T.textLight, margin:0 },
  fullItemTotal:  { fontSize:14, fontWeight:700, color:T.navy, margin:"2px 0 0" },
  addrBox:        { display:"flex", gap:10, alignItems:"flex-start", background:T.offWhite, borderRadius:12, padding:"12px 14px", border:`1px solid ${T.border}` },
  addrIcon:       { fontSize:18, flexShrink:0 },
  addrLine:       { fontSize:13, fontWeight:600, color:T.navy, margin:0 },
  addrCity:       { fontSize:12, color:T.textLight, margin:"3px 0 0" },
  priceTable:     { background:T.offWhite, borderRadius:12, padding:"12px 14px", border:`1px solid ${T.border}` },
  priceLine:      { display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}` },
  priceLabel:     { fontSize:13, color:T.text, fontWeight:500 },
  priceVal:       { fontSize:13, fontWeight:700, color:T.text },
  priceTotal:     { display:"flex", justifyContent:"space-between", padding:"10px 0 4px" },
  priceTotalLabel:{ fontSize:14, fontWeight:700, color:T.navy },
  priceTotalVal:  { fontSize:18, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
};

const { greenDeep:_a } = T;
export default OrderCard;