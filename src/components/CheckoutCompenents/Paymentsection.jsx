import React from "react";
import { T, FONT, fadeUp } from "./checkoutTokens.js";

const PAYMENT_METHODS = [
  { id:"COD",       label:"Cash on Delivery", icon:"💵", desc:"Pay when delivered" },
  { id:"Card",      label:"Card",              icon:"💳", desc:"Debit / Credit card" },
  { id:"JazzCash",  label:"JazzCash",          icon:"📱", desc:"Mobile wallet"      },
  { id:"EasyPaisa", label:"EasyPaisa",         icon:"📲", desc:"Mobile wallet"      },
];

const PaymentSection = ({ savedPayments, selectedPaymentId, formData, onPaymentSelect, onChange }) => (
  <div style={{ ...s.section, ...fadeUp(140) }}>
    <div style={s.sectionHeader}>
      <div style={s.iconCircle}>💳</div>
      <h2 style={s.sectionTitle}>Payment Method</h2>
    </div>

    {/* Saved cards */}
    {savedPayments.length > 0 && (
      <div style={s.savedWrap}>
        <p style={s.savedLabel}>Saved Cards</p>
        <div style={s.savedGrid}>
          {savedPayments.map((pay) => (
            <div
              key={pay._id}
              onClick={() => onPaymentSelect(pay._id)}
              style={{
                ...s.savedCard,
                borderColor: selectedPaymentId === pay._id ? T.green : T.border,
                background:  selectedPaymentId === pay._id ? T.greenPale : "#fff",
                boxShadow:   selectedPaymentId === pay._id ? `0 0 0 3px ${T.greenLight}` : "none",
              }}
            >
              {pay.isDefault && <span style={s.defaultBadge}>Default</span>}
              <div style={s.radioRow}>
                <div style={{ ...s.radioOuter, borderColor: selectedPaymentId === pay._id ? T.green : T.border }}>
                  {selectedPaymentId === pay._id && <div style={s.radioInner} />}
                </div>
                <span style={s.payType}>{pay.type}</span>
              </div>
              <p style={s.payNum}>**** {pay.last4 || "0000"}</p>
            </div>
          ))}

          <div
            onClick={() => onPaymentSelect("new")}
            style={{
              ...s.savedCard,
              borderColor: selectedPaymentId === "new" ? T.green : T.border,
              background:  selectedPaymentId === "new" ? T.greenPale : "#fff",
              boxShadow:   selectedPaymentId === "new" ? `0 0 0 3px ${T.greenLight}` : "none",
            }}
          >
            <div style={s.radioRow}>
              <div style={{ ...s.radioOuter, borderColor: selectedPaymentId === "new" ? T.green : T.border }}>
                {selectedPaymentId === "new" && <div style={s.radioInner} />}
              </div>
              <span style={{ fontSize:13, fontWeight:600, color:T.green }}>+ Other</span>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Payment method pills */}
    <p style={s.savedLabel}>Select Method</p>
    <div style={s.methodGrid}>
      {PAYMENT_METHODS.map(({ id, label, icon, desc }) => {
        const active = formData.paymentMethod === id;
        return (
          <label
            key={id}
            style={{
              ...s.methodCard,
              borderColor: active ? T.green : T.border,
              background:  active ? T.greenPale : "#fff",
              boxShadow:   active ? `0 0 0 3px ${T.greenLight}` : "none",
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={id}
              checked={active}
              onChange={onChange}
              style={{ display:"none" }}
            />
            <div style={s.methodTop}>
              <span style={s.methodIcon}>{icon}</span>
              <div style={{ ...s.radioOuter, borderColor: active ? T.green : T.border }}>
                {active && <div style={s.radioInner} />}
              </div>
            </div>
            <p style={{ ...s.methodLabel, color: active ? T.greenDeep : T.navy }}>{label}</p>
            <p style={s.methodDesc}>{desc}</p>
          </label>
        );
      })}
    </div>
  </div>
);

const s = {
  section:       { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"28px", boxShadow:"0 2px 16px rgba(29,53,87,.05)", fontFamily:FONT },
  sectionHeader: { display:"flex", alignItems:"center", gap:12, marginBottom:24 },
  iconCircle:    { width:40, height:40, borderRadius:"50%", background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
  sectionTitle:  { fontSize:18, fontWeight:800, color:T.navy, letterSpacing:"-.3px", margin:0 },
  savedWrap:     { marginBottom:20 },
  savedLabel:    { fontSize:11, fontWeight:700, color:T.textLight, textTransform:"uppercase", letterSpacing:1, marginBottom:12 },
  savedGrid:     { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10, marginBottom:20 },
  savedCard:     { borderRadius:14, border:`1.5px solid`, padding:"12px 14px", cursor:"pointer", transition:"all .22s", position:"relative" },
  defaultBadge:  { position:"absolute", top:8, right:8, background:T.green, color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:40 },
  radioRow:      { display:"flex", alignItems:"center", gap:8, marginBottom:4 },
  radioOuter:    { width:16, height:16, borderRadius:"50%", border:`2px solid`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"border-color .2s" },
  radioInner:    { width:8, height:8, borderRadius:"50%", background:T.green },
  payType:       { fontSize:13, fontWeight:600, color:T.navy },
  payNum:        { fontSize:12, color:T.textLight, margin:0 },
  methodGrid:    { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 },
  methodCard:    { borderRadius:14, border:`1.5px solid`, padding:"16px 12px", cursor:"pointer", transition:"all .22s cubic-bezier(.4,0,.2,1)", display:"flex", flexDirection:"column", gap:6 },
  methodTop:     { display:"flex", justifyContent:"space-between", alignItems:"flex-start" },
  methodIcon:    { fontSize:22 },
  methodLabel:   { fontSize:13, fontWeight:700, margin:0, transition:"color .2s" },
  methodDesc:    { fontSize:11, color:T.textLight, margin:0, lineHeight:1.4 },
};

const { greenPale:_a, greenDeep:_b, greenLight:_c } = T;
export default PaymentSection;