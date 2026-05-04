// // import React, { useState } from "react";
// // import { T } from "./cartData.js";

// // const CartItem = ({ item, onQtyChange, onRemove }) => {
// //   const [removing, setRemoving] = useState(false);
// //   const [hov, setHov] = useState(false);

// //   const handleRemove = () => {
// //     setRemoving(true);
// //     setTimeout(() => onRemove(item.id), 320);
// //   };

// //   const savings = ((item.originalPrice - item.price) * item.qty).toFixed(2);

// //   return (
// //     <div style={{
// //       ...s.wrap,
// //       opacity:    removing ? 0 : 1,
// //       transform:  removing ? "translateX(-30px)" : "translateX(0)",
// //       boxShadow:  hov ? "0 8px 32px rgba(29,53,87,.10)" : "0 2px 12px rgba(29,53,87,.05)",
// //     }}
// //       onMouseEnter={() => setHov(true)}
// //       onMouseLeave={() => setHov(false)}
// //     >
// //       {/* Image */}
// //       <div style={s.imgWrap}>
// //         <img src={item.image} alt={item.name} style={{ ...s.img, transform: hov ? "scale(1.06)" : "scale(1)" }} />
// //         {item.badge && <span style={s.badge}>{item.badge}</span>}
// //       </div>

// //       {/* Details */}
// //       <div style={s.details}>
// //         <div style={s.topRow}>
// //           <div>
// //             <span style={s.brand}>{item.brand} · {item.category}</span>
// //             <h3 style={s.name}>{item.name}</h3>
// //             <span style={s.weight}>{item.weight}</span>
// //           </div>
// //           <button onClick={handleRemove} style={s.removeBtn}
// //             onMouseEnter={e => { e.currentTarget.style.background="#FFF0F5"; e.currentTarget.style.color="#E05C8A"; e.currentTarget.style.borderColor="#FFD6E8"; }}
// //             onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.textLight; e.currentTarget.style.borderColor=T.border; }}
// //             title="Remove item">✕</button>
// //         </div>

// //         <div style={s.bottomRow}>
// //           {/* Price */}
// //           <div style={s.priceCol}>
// //             <span style={s.price}>${item.price.toFixed(2)}</span>
// //             <span style={s.origPrice}>${item.originalPrice.toFixed(2)}</span>
// //             <span style={s.discBadge}>-{item.discount}%</span>
// //           </div>

// //           {/* Qty */}
// //           <div style={s.qtyWrap}>
// //             <button onClick={() => onQtyChange(item.id, item.qty - 1)} style={s.qtyBtn}
// //               onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
// //               onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}>−</button>
// //             <span style={s.qtyNum}>{item.qty}</span>
// //             <button onClick={() => onQtyChange(item.id, item.qty + 1)} style={s.qtyBtn}
// //               onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
// //               onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}>+</button>
// //           </div>

// //           {/* Subtotal */}
// //           <div style={s.subtotalCol}>
// //             <span style={s.subtotalLabel}>Subtotal</span>
// //             <span style={s.subtotal}>${(item.price * item.qty).toFixed(2)}</span>
// //             <span style={s.saved}>saved ${savings}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const s = {
// //   wrap:         { display:"flex", gap:20, background:"#fff", borderRadius:20, padding:"20px", border:`1.5px solid ${T.border}`, transition:"all .32s cubic-bezier(.4,0,.2,1)", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" },
// //   imgWrap:      { position:"relative", width:110, height:110, borderRadius:14, overflow:"hidden", flexShrink:0, background:T.offWhite },
// //   img:          { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .4s cubic-bezier(.4,0,.2,1)" },
// //   badge:        { position:"absolute", top:7, left:7, background:T.green, color:"#fff", fontSize:9, fontWeight:700, letterSpacing:.8, textTransform:"uppercase", padding:"2px 7px", borderRadius:40 },
// //   details:      { flex:1, minWidth:0, display:"flex", flexDirection:"column", justifyContent:"space-between", gap:12 },
// //   topRow:       { display:"flex", justifyContent:"space-between", alignItems:"flex-start" },
// //   brand:        { fontSize:11, fontWeight:700, color:T.textLight, letterSpacing:.8, textTransform:"uppercase", display:"block", marginBottom:4 },
// //   name:         { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:18, fontWeight:700, color:T.navy, lineHeight:1.25, marginBottom:4 },
// //   weight:       { fontSize:12, color:T.textLight },
// //   removeBtn:    { background:"#fff", color:T.textLight, border:`1px solid ${T.border}`, borderRadius:8, width:30, height:30, cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", fontFamily:"inherit" },
// //   bottomRow:    { display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" },
// //   priceCol:     { display:"flex", alignItems:"center", gap:8 },
// //   price:        { fontSize:20, fontWeight:700, color:T.green },
// //   origPrice:    { fontSize:13, color:T.textLight, textDecoration:"line-through" },
// //   discBadge:    { background:"#FFF0F5", color:"#E05C8A", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:40 },
// //   qtyWrap:      { display:"flex", alignItems:"center", border:`1.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" },
// //   qtyBtn:       { width:34, height:34, background:"#fff", color:T.navy, border:"none", fontSize:18, cursor:"pointer", fontFamily:"inherit", transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center" },
// //   qtyNum:       { width:40, textAlign:"center", fontSize:15, fontWeight:700, color:T.navy, borderLeft:`1.5px solid ${T.border}`, borderRight:`1.5px solid ${T.border}`, lineHeight:"34px" },
// //   subtotalCol:  { marginLeft:"auto", textAlign:"right" },
// //   subtotalLabel:{ fontSize:11, color:T.textLight, fontWeight:600, textTransform:"uppercase", letterSpacing:.8, display:"block" },
// //   subtotal:     { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22, fontWeight:700, color:T.navy, display:"block" },
// //   saved:        { fontSize:11, color:T.green, fontWeight:600, display:"block" },
// // };

// // export default CartItem;



// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { updateCartItem, removeFromCart, selectCartStatus } from "../../redux/cart/Cartslice.js";
// // import { T, FONT } from "./Carttokken.jsx";

// // // item shape from cartItems[]: { product, name, image, price, qty }
// // const CartItem = ({ item, userId }) => {
// //   const dispatch = useDispatch();
// //   const status   = useSelector(selectCartStatus);
// //   const loading  = status === "loading";

// //   const [removing, setRemoving] = useState(false);
// //   const [hov,      setHov]      = useState(false);

// //   // dispatch updateCartItem → PUT /api/cart { user, productId, qty }
// //   const handleQty = (newQty) => {
// //     if (newQty < 1) return handleRemove();
// //     dispatch(updateCartItem({ user: userId, productId: item.product, qty: newQty }));
// //   };

// //   // dispatch removeFromCart → DELETE /api/cart { user, productId }
// //   const handleRemove = () => {
// //     setRemoving(true);
// //     setTimeout(() => {
// //       dispatch(removeFromCart({ user: userId, productId: item.product }));
// //     }, 300);
// //   };

// //   const subtotal = (item.price * item.qty).toFixed(2);

// //   return (
// //     <div
// //       style={{
// //         ...s.wrap,
// //         opacity:   removing ? 0 : 1,
// //         transform: removing ? "translateX(-20px)" : hov ? "translateY(-2px)" : "translateY(0)",
// //         boxShadow: hov ? "0 10px 32px rgba(29,53,87,.10)" : "0 2px 12px rgba(29,53,87,.05)",
// //       }}
// //       onMouseEnter={() => setHov(true)}
// //       onMouseLeave={() => setHov(false)}
// //     >
// //       {/* Image */}
// //       <div style={s.imgWrap}>
// //         <img
// //           src={item.image}
// //           alt={item.name}
// //           style={{ ...s.img, transform: hov ? "scale(1.06)" : "scale(1)" }}
// //           onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=60"; }}
// //         />
// //       </div>

// //       {/* Details */}
// //       <div style={s.details}>
// //         <div style={s.topRow}>
// //           <div>
// //             <h3 style={s.name}>{item.name}</h3>
// //             <span style={s.productId}>product_id: {item.product}</span>
// //           </div>
// //           <button
// //             onClick={handleRemove}
// //             style={s.removeBtn}
// //             disabled={loading}
// //             title="Remove"
// //             onMouseEnter={e => { e.currentTarget.style.background="#FFF0F5"; e.currentTarget.style.color=T.pink; e.currentTarget.style.borderColor="#FFD6E8"; }}
// //             onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.textLight; e.currentTarget.style.borderColor=T.border; }}
// //           >✕</button>
// //         </div>

// //         <div style={s.bottomRow}>
// //           {/* Unit price */}
// //           <div style={s.priceCol}>
// //             <span style={s.label}>Unit Price</span>
// //             <span style={s.price}>${item.price.toFixed(2)}</span>
// //           </div>

// //           {/* Qty stepper — dispatches updateCartItem */}
// //           <div style={s.qtyWrap}>
// //             <button onClick={() => handleQty(item.qty - 1)} disabled={loading} style={s.qtyBtn}
// //               onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
// //               onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}>−</button>
// //             <span style={s.qtyNum}>
// //               {loading
// //                 ? <span style={s.spinner} />
// //                 : item.qty}
// //             </span>
// //             <button onClick={() => handleQty(item.qty + 1)} disabled={loading} style={s.qtyBtn}
// //               onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; e.currentTarget.style.color=T.green; }}
// //               onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color=T.navy; }}>+</button>
// //           </div>

// //           {/* Subtotal */}
// //           <div style={s.subtotalCol}>
// //             <span style={s.label}>Subtotal</span>
// //             <span style={s.subtotal}>${subtotal}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
// //     </div>
// //   );
// // };

// // const s = {
// //   wrap:        { display:"flex", gap:18, background:"#fff", borderRadius:18, padding:"18px", border:`1.5px solid ${T.border}`, transition:"all .3s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
// //   imgWrap:     { width:100, height:100, borderRadius:12, overflow:"hidden", flexShrink:0, background:T.offWhite },
// //   img:         { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .4s cubic-bezier(.4,0,.2,1)" },
// //   details:     { flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:8, justifyContent:"space-between" },
// //   topRow:      { display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 },
// //   name:        { fontSize:15, fontWeight:700, color:T.navy, lineHeight:1.35, margin:0 },
// //   productId:   { fontSize:10, color:T.textLight, fontFamily:"monospace", background:T.offWhite, padding:"2px 6px", borderRadius:4, display:"inline-block", marginTop:4 },
// //   removeBtn:   { background:"#fff", color:T.textLight, border:`1px solid ${T.border}`, borderRadius:8, width:28, height:28, cursor:"pointer", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", fontFamily:FONT },
// //   bottomRow:   { display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" },
// //   priceCol:    { display:"flex", flexDirection:"column", gap:2 },
// //   label:       { fontSize:10, fontWeight:600, color:T.textLight, textTransform:"uppercase", letterSpacing:.8 },
// //   price:       { fontSize:18, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
// //   qtyWrap:     { display:"flex", alignItems:"center", border:`1.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" },
// //   qtyBtn:      { width:34, height:34, background:"#fff", color:T.navy, border:"none", fontSize:18, cursor:"pointer", fontFamily:FONT, transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center" },
// //   qtyNum:      { width:42, textAlign:"center", fontSize:15, fontWeight:700, color:T.navy, borderLeft:`1.5px solid ${T.border}`, borderRight:`1.5px solid ${T.border}`, lineHeight:"34px", display:"flex", alignItems:"center", justifyContent:"center" },
// //   spinner:     { width:13, height:13, border:`2px solid ${T.border}`, borderTopColor:T.green, borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" },
// //   subtotalCol: { marginLeft:"auto", textAlign:"right" },
// //   subtotal:    { fontSize:20, fontWeight:800, color:T.navy, letterSpacing:"-.3px", display:"block" },
// // };

// // export default CartItem;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart, selectCartItems } from "../../redux/cart/Cartslice.js";
// import CartItem from "./CartItem.jsx";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);

//   // 🔥 IMPORTANT — fetch cart on load
//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   return (
//     <div>
//       {cartItems.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         cartItems.map((item) => (
//           <CartItem key={item.product} item={item} />
//         ))
//       )}
//     </div>
//   );
// };

// export default CartPage;





import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { T, FONT } from "./Carttokken.js";

import { updateCartItem, removeFromCart } from "../../redux/Cart/Cartslice.js";

const CartItemCard = ({ item }) => {
  const dispatch   = useDispatch();
  const [hov,      setHov]      = useState(false);
  const [removing, setRemoving] = useState(false);

  // item shape from your backend: { product, name, image, price, qty }
  const subtotal = (item.price * item.qty).toFixed(2);

  const handleQty = (newQty) => {
    if (newQty < 1) {
      handleRemove();
      return;
    }
    dispatch(updateCartItem({ productId: item.product, qty: newQty }));
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart({ productId: item.product }));
    }, 320);
  };

  return (
    <div
      style={{
        ...s.card,
        opacity:   removing ? 0   : 1,
        transform: removing
          ? "translateX(-18px)"
          : hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov
          ? "0 14px 40px rgba(29,53,87,.11)"
          : "0 2px 12px rgba(29,53,87,.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <div style={s.imgBox}>
        <img
          src={item.image}
          alt={item.name}
          style={{ ...s.img, transform: hov ? "scale(1.07)" : "scale(1)" }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=60";
          }}
        />
        {/* Remove — visible on hover */}
        <button
          onClick={handleRemove}
          style={{ ...s.removeBtn, opacity: hov ? 1 : 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = T.pink; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.9)"; e.currentTarget.style.color = T.navy; }}
        >
          ✕
        </button>
      </div>

      {/* Details */}
      <div style={s.details}>
        {/* Name */}
        <h3 style={{ ...s.name, color: hov ? T.green : T.navy }}>
          {item.name}
        </h3>

        {/* Unit price */}
        <div style={s.row}>
          <span style={s.label}>Unit Price</span>
          <span style={s.price}>${item.price.toFixed(2)}</span>
        </div>

        {/* Qty stepper */}
        <div style={s.row}>
          <span style={s.label}>Quantity</span>
          <div style={s.stepper}>
            <button
              style={s.stepBtn}
              onClick={() => handleQty(item.qty - 1)}
              onMouseEnter={e => { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.color = T.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.navy; }}
            >−</button>
            <span style={s.qtyNum}>{item.qty}</span>
            <button
              style={s.stepBtn}
              onClick={() => handleQty(item.qty + 1)}
              onMouseEnter={e => { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.color = T.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = T.navy; }}
            >+</button>
          </div>
        </div>

        {/* Subtotal — price * qty (same as ur MyCart) */}
        <div style={s.subtotalBox}>
          <span style={s.subtotalLabel}>Subtotal</span>
          <span style={s.subtotalVal}>${subtotal}</span>
        </div>
      </div>
    </div>
  );
};

const s = {
  card:         { display:"flex", background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden", transition:"all .3s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
  imgBox:       { position:"relative", width:130, flexShrink:0 },
  img:          { width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:148, transition:"transform .4s cubic-bezier(.4,0,.2,1)" },
  removeBtn:    { position:"absolute", top:10, right:10, width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,.9)", color:T.navy, border:"none", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", backdropFilter:"blur(4px)", fontFamily:FONT },
  details:      { flex:1, padding:"18px 20px", display:"flex", flexDirection:"column", gap:13, justifyContent:"center" },
  name:         { fontSize:16, fontWeight:700, lineHeight:1.35, margin:0, transition:"color .2s" },
  row:          { display:"flex", alignItems:"center", justifyContent:"space-between" },
  label:        { fontSize:11, fontWeight:600, color:T.textLight, textTransform:"uppercase", letterSpacing:.8 },
  price:        { fontSize:18, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
  stepper:      { display:"flex", alignItems:"center", border:`1.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" },
  stepBtn:      { width:34, height:34, background:"#fff", color:T.navy, border:"none", fontSize:18, cursor:"pointer", fontFamily:FONT, transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600 },
  qtyNum:       { width:44, textAlign:"center", fontSize:15, fontWeight:700, color:T.navy, borderLeft:`1.5px solid ${T.border}`, borderRight:`1.5px solid ${T.border}`, lineHeight:"34px" },
  subtotalBox:  { display:"flex", alignItems:"center", justifyContent:"space-between", background:T.greenPale, borderRadius:10, padding:"10px 14px" },
  subtotalLabel:{ fontSize:11, fontWeight:700, color:T.greenDeep, textTransform:"uppercase", letterSpacing:.8 },
  subtotalVal:  { fontSize:20, fontWeight:800, color:T.navy, letterSpacing:"-.3px" },
};

const { greenDeep:_a, greenPale:_b } = T;
export default CartItemCard;