import React from "react";
import { T, FONT, fadeUp } from "./Checkouttokens";

// Input component
const Field = ({ label, name, value, onChange, placeholder, type="text", required, half }) => (
  <div style={{ ...s.fieldWrap, flex: half ? 1 : "unset" }}>
    <label style={s.label}>{label} {required && <span style={{ color:T.pink }}>*</span>}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={s.input}
      onFocus={e => { e.target.style.borderColor=T.green; e.target.style.boxShadow=`0 0 0 3px ${T.greenLight}`; }}
      onBlur={e => { e.target.style.borderColor=T.border; e.target.style.boxShadow="none"; }}
    />
  </div>
);

const AddressSection = ({ savedAddresses, selectedAddressId, formData, onAddressSelect, onChange }) => (
  <div style={{ ...s.section, ...fadeUp(80) }}>
    {/* Header */}
    <div style={s.sectionHeader}>
      <div style={s.iconCircle}>📍</div>
      <h2 style={s.sectionTitle}>Shipping Address</h2>
    </div>

    {/* Saved addresses */}
    {savedAddresses.length > 0 && (
      <div style={s.savedWrap}>
        <p style={s.savedLabel}>Saved Addresses</p>
        <div style={s.savedGrid}>
          {savedAddresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => onAddressSelect(addr._id)}
              style={{
                ...s.savedCard,
                borderColor:  selectedAddressId === addr._id ? T.green : T.border,
                background:   selectedAddressId === addr._id ? T.greenPale : "#fff",
                boxShadow:    selectedAddressId === addr._id ? `0 0 0 3px ${T.greenLight}` : "none",
              }}
            >
              {addr.isDefault && <span style={s.defaultBadge}>Default</span>}
              <div style={s.radioRow}>
                <div style={{
                  ...s.radioOuter,
                  borderColor: selectedAddressId === addr._id ? T.green : T.border,
                }}>
                  {selectedAddressId === addr._id && <div style={s.radioInner} />}
                </div>
                <p style={s.addrName}>{addr.fullName || addr.addressLine1}</p>
              </div>
              <p style={s.addrCity}>{addr.city}, {addr.state} {addr.pincode || addr.postalCode}</p>
            </div>
          ))}

          {/* New address option */}
          <div
            onClick={() => onAddressSelect("new")}
            style={{
              ...s.savedCard,
              ...s.newCard,
              borderColor: selectedAddressId === "new" ? T.green : T.border,
              background:  selectedAddressId === "new" ? T.greenPale : "#fff",
              boxShadow:   selectedAddressId === "new" ? `0 0 0 3px ${T.greenLight}` : "none",
            }}
          >
            <div style={s.radioRow}>
              <div style={{ ...s.radioOuter, borderColor: selectedAddressId === "new" ? T.green : T.border }}>
                {selectedAddressId === "new" && <div style={s.radioInner} />}
              </div>
              <span style={s.newLabel}>+ New Address</span>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Form fields */}
    <div style={s.formGrid}>
      <Field label="Full Name"      name="ship.fullName"     value={formData.shippingAddress.fullName}     onChange={onChange} placeholder="John Doe"          required />
      <Field label="Address Line 1" name="ship.addressLine1" value={formData.shippingAddress.addressLine1} onChange={onChange} placeholder="House #, Street, Area" required />

      <div style={s.halfRow}>
        <Field label="City"  name="ship.city"  value={formData.shippingAddress.city}  onChange={onChange} placeholder="City"  required half />
        <Field label="State" name="ship.state" value={formData.shippingAddress.state} onChange={onChange} placeholder="State" required half />
      </div>

      <div style={s.halfRow}>
        <Field label="Pincode"      name="ship.pincode"      value={formData.shippingAddress.pincode}      onChange={onChange} placeholder="54000"           required half />
        <Field label="Phone Number" name="ship.phoneNumber"  value={formData.shippingAddress.phoneNumber}  onChange={onChange} placeholder="+92 300 1234567" required type="tel" half />
      </div>
    </div>
  </div>
);

const s = {
  section:       { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, padding:"28px", boxShadow:"0 2px 16px rgba(29,53,87,.05)", fontFamily:FONT },
  sectionHeader: { display:"flex", alignItems:"center", gap:12, marginBottom:24 },
  iconCircle:    { width:40, height:40, borderRadius:"50%", background:T.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
  sectionTitle:  { fontSize:18, fontWeight:800, color:T.navy, letterSpacing:"-.3px", margin:0 },
  savedWrap:     { marginBottom:24 },
  savedLabel:    { fontSize:11, fontWeight:700, color:T.textLight, textTransform:"uppercase", letterSpacing:1, marginBottom:12 },
  savedGrid:     { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10 },
  savedCard:     { borderRadius:14, border:`1.5px solid`, padding:"12px 14px", cursor:"pointer", transition:"all .22s cubic-bezier(.4,0,.2,1)", position:"relative" },
  newCard:       { display:"flex", alignItems:"center" },
  defaultBadge:  { position:"absolute", top:8, right:8, background:T.green, color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:40, textTransform:"uppercase", letterSpacing:.5 },
  radioRow:      { display:"flex", alignItems:"center", gap:8, marginBottom:4 },
  radioOuter:    { width:16, height:16, borderRadius:"50%", border:`2px solid`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"border-color .2s" },
  radioInner:    { width:8, height:8, borderRadius:"50%", background:T.green },
  addrName:      { fontSize:13, fontWeight:600, color:T.navy, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
  addrCity:      { fontSize:11, color:T.textLight, margin:"2px 0 0" },
  newLabel:      { fontSize:13, fontWeight:600, color:T.green },
  formGrid:      { display:"flex", flexDirection:"column", gap:14 },
  halfRow:       { display:"flex", gap:14 },
  fieldWrap:     { display:"flex", flexDirection:"column", gap:6 },
  label:         { fontSize:12, fontWeight:700, color:T.navy, letterSpacing:.2 },
  input:         { border:`1.5px solid ${T.border}`, borderRadius:11, padding:"11px 14px", fontSize:14, fontFamily:FONT, outline:"none", color:T.navy, background:T.offWhite, transition:"all .2s", width:"100%" },
};

const { greenPale:_a } = T;
export default AddressSection;