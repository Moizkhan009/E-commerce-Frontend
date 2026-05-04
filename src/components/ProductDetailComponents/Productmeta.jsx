import React from "react";
import { T, FONT, fadeUp } from "./Producttokens";

// Stars component
const Stars = ({ rating = 4.5 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
    <span style={{ fontSize:14, letterSpacing:1, color:T.yellow }}>
      {"★".repeat(Math.round(rating))}
      <span style={{ color:"#D1D9E0" }}>{"★".repeat(5 - Math.round(rating))}</span>
    </span>
    <span style={{ fontSize:13, fontWeight:700, color:T.navy }}>{rating}</span>
    <span style={{ fontSize:12, color:T.textLight }}>(124 reviews)</span>
  </div>
);

const str = (val) => {
  if (!val) return null;
  if (typeof val === "object") return val.name || val.title || String(val._id || "");
  return String(val);
};

// Product name, brand, rating, description
const ProductMeta = ({ product }) => {
  // Safely resolve all fields — category/brand can be populated objects
  const categoryName = str(product.category) || "Fresh";
  const brandName    = str(product.brand)    || "NestFarm";
  const description  = str(product.description) || "No description available";
  const weight       = str(product.weight)   || "N/A";

  return (
  <div style={{ display:"flex", flexDirection:"column", gap:14, fontFamily:FONT }}>

    {/* Category + Brand */}
    <div style={{ ...s.topRow, ...fadeUp(60) }}>
      <span style={s.brand}>{brandName}</span>
      <span style={s.catTag}>{categoryName}</span>
    </div>

    {/* Name */}
    <h1 style={{ ...s.name, ...fadeUp(100) }}>{product.name}</h1>

    {/* Rating */}
    <div style={fadeUp(140)}>
      <Stars rating={product.rating || 4.5} />
    </div>

    {/* Price */}
    <div style={{ ...s.priceRow, ...fadeUp(180) }}>
      <span style={s.price}>Rs {product.price}</span>
      {product.originalPrice && (
        <>
          <span style={s.origPrice}>Rs {product.originalPrice}</span>
          <span style={s.discPill}>
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        </>
      )}
    </div>

    {/* Description */}
    <p style={{ ...s.desc, ...fadeUp(220) }}>{description}</p>

    {/* Meta chips */}
    <div style={{ ...s.chipsRow, ...fadeUp(260) }}>
      {[
       
       { label:"Stock",    val: product.countInStock > 0 ? `${product.countInStock} left` : "Out of stock", green: product.countInStock > 0 },
    // { label:"Stock",    val: (product.stock ?? 10) > 0 ? `${product.stock ?? 10} left` : "Out of stock", green: (product.stock ?? 10) > 0 },
// Line 97 ko isse replace karein:
// Line 96 se 100 ko replace karein:
// { 
//   label: "Stock", 
//   val: (product.stock ?? 1) > 0 ? "Available" : "Out of stock", 
//   green: (product.stock ?? 1) > 0 
// },
       { label:"Weight",   val: weight },
        { label:"Category", val: categoryName },
      ].map(({ label, val, green }, i) => (
        <div key={i} style={s.chip}>
          <span style={s.chipLabel}>{label}</span>
          <span style={{ ...s.chipVal, color: green === false ? T.pink : green ? T.green : T.navy }}>{val}</span>
        </div>
      ))}
    </div>
  </div>
  );
};

const s = {
  topRow:    { display:"flex", alignItems:"center", gap:10 },
  brand:     { fontSize:12, fontWeight:700, color:T.green, letterSpacing:1, textTransform:"uppercase" },
  catTag:    { fontSize:11, color:T.textLight, background:T.offWhite, padding:"3px 10px", borderRadius:40, border:`1px solid ${T.border}` },
  name:      { fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, color:T.navy, lineHeight:1.2, letterSpacing:"-.5px", margin:0 },
  priceRow:  { display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" },
  price:     { fontSize:36, fontWeight:800, color:T.green, letterSpacing:"-.5px", lineHeight:1 },
  origPrice: { fontSize:18, color:T.textLight, textDecoration:"line-through", fontWeight:500 },
  discPill:  { background:T.pinkLight, color:T.pink, fontSize:12, fontWeight:700, padding:"4px 12px", borderRadius:40, border:`1px solid #FFD6E8` },
  desc:      { fontSize:14, color:T.text, lineHeight:1.85, margin:0 },
  chipsRow:  { display:"flex", gap:10, flexWrap:"wrap" },
  chip:      { display:"flex", flexDirection:"column", gap:3, background:"#fff", border:`1.5px solid ${T.border}`, borderRadius:12, padding:"10px 16px", minWidth:90 },
  chipLabel: { fontSize:10, fontWeight:700, color:T.textLight, textTransform:"uppercase", letterSpacing:.8 },
  chipVal:   { fontSize:13, fontWeight:700, color:T.navy },
};

const { pinkLight:_a, yellow:_b } = T;
export default ProductMeta;