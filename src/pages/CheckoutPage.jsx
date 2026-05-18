// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { T, FONT, fadeUp } from "../components/CheckoutCompenents/Checkouttokens.js";

// import CartPreview      from "../components/CheckoutCompenents/Cartpreview.jsx";
// import AddressSection   from "../components/CheckoutCompenents/Addresssection.jsx";
// import PaymentSection   from "../components/CheckoutCompenents/Paymentsection.jsx";
// import OrderSummary     from "../components/CheckoutCompenents/Ordersummary.jsx";
// import CheckoutSkeleton from "../components/CheckoutCompenents/Checkoutskeleton.jsx";



// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL
//   ? `${import.meta.env.VITE_API_URL}/api`
//   : "http://localhost:5000/api"
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("userInfo");
//   if (token) config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
//   return config;
// });

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ── Tera exact same cartItems resolution ─────────────────
//   const cartItems = location.state?.Items
//     || location.state?.items
//     || location.state?.cartItems
//     || [];

//   // ── Tera exact same state ─────────────────────────────────
//   const [savedAddresses,    setSavedAddresses]    = useState([]);
//   const [savedPayments,     setSavedPayments]      = useState([]);
//   const [loading,           setLoading]            = useState(true);
//   const [placingOrder,      setPlacingOrder]        = useState(false);
//   const [error,             setError]              = useState("");
//   const [orderSuccess,      setOrderSuccess]        = useState(null);

//   const [selectedAddressId, setSelectedAddressId]  = useState("new");
//   const [selectedPaymentId, setSelectedPaymentId]  = useState("new");

//   const [formData, setFormData] = useState({
//     shippingAddress: {
//       fullName:"", addressLine1:"", city:"", state:"", pincode:"", phoneNumber:"",
//     },
//     paymentMethod: "COD",
//   });

//   // Font inject
//   useEffect(() => {
//     if (!document.getElementById("nest-fonts-co")) {
//       const l = document.createElement("link");
//       l.id = "nest-fonts-co"; l.rel = "stylesheet";
//       l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//       document.head.appendChild(l);
//     }
//     document.body.style.margin  = "0";
//     document.body.style.padding = "0";
//     document.body.style.background = T.offWhite;
//   }, []);

//   // ── Tera exact same fetchUserData useEffect ───────────────
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const [addrRes, payRes] = await Promise.all([
//           api.get("/addresses"),
//           api.get("/payments"),
//         ]);
//         const addresses = addrRes.data?.data || addrRes.data || [];
//         const payments  = payRes.data?.data  || payRes.data  || [];

//         setSavedAddresses(addresses);
//         setSavedPayments(payments);

//         const defaultAddr = addresses.find(a => a.isDefault);
//         if (defaultAddr) {
//           setSelectedAddressId(defaultAddr._id);
//           setFormData(prev => ({
//             ...prev,
//             shippingAddress: {
//               fullName:     defaultAddr.fullName     || "",
//               addressLine1: defaultAddr.addressLine1 || defaultAddr.address || "",
//               city:         defaultAddr.city         || "",
//               state:        defaultAddr.state        || "",
//               pincode:      defaultAddr.pincode      || defaultAddr.postalCode || "",
//               phoneNumber:  defaultAddr.phoneNumber  || "",
//             },
//           }));
//         }

//         const defaultPay = payments.find(p => p.isDefault);
//         if (defaultPay) {
//           setSelectedPaymentId(defaultPay._id);
//           setFormData(prev => ({ ...prev, paymentMethod: defaultPay.type || "Card" }));
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // ── Tera exact same handlers ──────────────────────────────
//   const handleAddressSelect = (addressId) => {
//     setSelectedAddressId(addressId);
//     if (addressId === "new") {
//       setFormData(prev => ({ ...prev, shippingAddress: { fullName:"", addressLine1:"", city:"", state:"", pincode:"", phoneNumber:"" } }));
//     } else {
//       const addr = savedAddresses.find(a => a._id === addressId);
//       if (addr) {
//         setFormData(prev => ({
//           ...prev,
//           shippingAddress: {
//             fullName:     addr.fullName     || "",
//             addressLine1: addr.addressLine1 || addr.address || "",
//             city:         addr.city         || "",
//             state:        addr.state        || "",
//             pincode:      addr.pincode      || addr.postalCode || "",
//             phoneNumber:  addr.phoneNumber  || "",
//           },
//         }));
//       }
//     }
//   };

//   const handlePaymentSelect = (paymentId) => {
//     setSelectedPaymentId(paymentId);
//     if (paymentId === "new") {
//       setFormData(prev => ({ ...prev, paymentMethod: "COD" }));
//     } else {
//       const pay = savedPayments.find(p => p._id === paymentId);
//       if (pay) setFormData(prev => ({ ...prev, paymentMethod: pay.type || "Card" }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("ship.")) {
//       const field = name.split(".")[1];
//       setFormData(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [field]: value } }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // ── Price calculations — tera exact same ─────────────────
//   const itemsPrice    = cartItems.reduce((s, i) => s + i.price * (i.qty || 1), 0);
//   const shippingPrice = itemsPrice > 5000 ? 0 : 200;
//   const taxPrice      = Math.round(itemsPrice * 0.18);
//   const totalPrice    = itemsPrice + shippingPrice + taxPrice;

//   // ── Tera exact same handlePlaceOrder ─────────────────────
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (cartItems.length === 0) {
//       setError("Your cart is empty! Please go back to cart.");
//       return;
//     }

//     const sa = formData.shippingAddress;
//     if (!sa.fullName || !sa.addressLine1 || !sa.city || !sa.state || !sa.pincode || !sa.phoneNumber) {
//       setError("Please fill all shipping address fields");
//       return;
//     }

//     const orderPayload = {
//       items: cartItems.map(item => ({
//         productId:  item.product || item.productId || item._id,
//         name:       item.name,
//         quantity:   item.qty || item.quantity || 1,
//         price:      item.price,
//         totalPrice: item.price * (item.qty || 1),
//       })),
//       shippingAddress: { ...sa },
//       paymentMethod: formData.paymentMethod,
//       itemsPrice, shippingPrice, taxPrice, totalPrice,
//       totalAmount: totalPrice,
//     };

//     try {
//       setPlacingOrder(true);
//       const res = await api.post("/orders", orderPayload);
//       const orderId = res.data.data?.orderId || res.data._id || "N/A";
//       setOrderSuccess(orderId);
//     } catch (err) {
//       console.error("Order error:", err.response?.data);
//       setError(err.response?.data?.message || JSON.stringify(err.response?.data) || "Failed to place order");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   // ── Loading state ─────────────────────────────────────────
//   if (loading) return <CheckoutSkeleton />;

//   // ── Success state ─────────────────────────────────────────
//   if (orderSuccess) {
//     return (
//       <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
//         <div style={{ ...s.successBox, ...fadeUp(0) }}>
//           <div style={s.successIcon}>🎉</div>
//           <h2 style={s.successTitle}>Order Placed!</h2>
//           <p style={s.successSub}>Your fresh produce is being prepared and will arrive soon.</p>
//           <div style={s.successBadge}>
//             <span style={s.orderIdLabel}>Order ID</span>
//             <span style={s.orderId}>{orderSuccess}</span>
//           </div>
//           <div style={s.successBtns}>
//             <button onClick={() => navigate("/orders")} style={s.viewOrderBtn}
//               onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; }}
//               onMouseLeave={e => { e.currentTarget.style.background=T.green; }}>
//               View My Orders →
//             </button>
//             <button onClick={() => navigate("/")} style={s.shopMoreBtn}
//               onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; }}
//               onMouseLeave={e => { e.currentTarget.style.background="#fff"; }}>
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//         <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>
//       </div>
//     );
//   }

//   return (
//     <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>
//       <style>{`
//         * { box-sizing: border-box; }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
//         input::placeholder { color: rgba(100,120,140,.45); }
//         @media(max-width:1024px){
//           .co-grid { grid-template-columns: 1fr !important; }
//           .co-summary { position: static !important; }
//         }
//         @media(max-width:600px){
//           .co-main { padding: 20px 16px 60px !important; }
//           .co-bc   { padding: 10px 16px !important; }
//           .pay-grid { grid-template-columns: repeat(2,1fr) !important; }
//         }
//       `}</style>

//       {/* Breadcrumb */}
//       {/* <div style={s.bcBar}>
//         <div style={s.bcInner}>
//           {["Home", "Cart", "Checkout"].map((c, i, a) => (
//             <React.Fragment key={i}>
//               <span style={{ fontSize:13, fontWeight:i===a.length-1?700:400, color:i===a.length-1?T.green:T.textLight, cursor:i<a.length-1?"pointer":"default" }}
//                 onMouseEnter={e => { if(i<a.length-1) e.currentTarget.style.color=T.green; }}
//                 onMouseLeave={e => { if(i<a.length-1) e.currentTarget.style.color=T.textLight; }}>
//                 {c}
//               </span>
//               {i<a.length-1 && <span style={{ color:T.border, fontSize:12 }}>›</span>}
//             </React.Fragment>
//           ))}
//         </div>
//       </div> */}

//       <div style={s.main}>
//         {/* Page heading */}
//         <div style={{ ...s.pageHeader, ...fadeUp(0) }}>
//           <h1 style={s.heading}>Checkout</h1>
//           <div style={s.underline} />
//         </div>

//         {/* Error */}
//         {error && (
//           <div style={{ ...s.errorBox, ...fadeUp(0) }}>
//             ⚠️ {error}
//             <button onClick={() => setError("")} style={s.errorClose}>✕</button>
//           </div>
//         )}

//         {/* Cart preview */}
//         <div style={{ marginBottom:24 }}>
//           <CartPreview cartItems={cartItems} />
//         </div>

//         {/* Main form */}
//         <form onSubmit={handlePlaceOrder}>
//           <div style={s.grid}>
//             {/* Left column */}
//             <div style={s.leftCol}>
//               <AddressSection
//                 savedAddresses={savedAddresses}
//                 selectedAddressId={selectedAddressId}
//                 formData={formData}
//                 onAddressSelect={handleAddressSelect}
//                 onChange={handleChange}
//               />
//               <PaymentSection
//                 savedPayments={savedPayments}
//                 selectedPaymentId={selectedPaymentId}
//                 formData={formData}
//                 onPaymentSelect={handlePaymentSelect}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Right — sticky summary */}
//             <div style={s.rightCol}>
//               <OrderSummary
//                 cartItems={cartItems}
//                 itemsPrice={itemsPrice}
//                 shippingPrice={shippingPrice}
//                 taxPrice={taxPrice}
//                 totalPrice={totalPrice}
//                 placingOrder={placingOrder}
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const s = {
//   bcBar:         { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
//   bcInner:       { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
//   main:          { maxWidth:1280, margin:"0 auto", padding:"40px 40px 72px" },
//   pageHeader:    { marginBottom:28 },
//   heading:       { fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
//   underline:     { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99 },
//   errorBox:      { display:"flex", justifyContent:"space-between", alignItems:"center", background:T.pinkLight, border:`1.5px solid #FFD6E8`, color:T.pink, fontSize:14, fontWeight:600, padding:"14px 20px", borderRadius:14, marginBottom:20 },
//   errorClose:    { background:"none", border:"none", color:T.pink, cursor:"pointer", fontSize:16, fontWeight:700, fontFamily:FONT },
//   grid:          { display:"grid", gridTemplateColumns:"1fr 380px", gap:28, alignItems:"start" },
//   leftCol:       { display:"flex", flexDirection:"column", gap:20 },
//   rightCol:      { position:"sticky", top:24 },
//   successBox:    { background:"#fff", borderRadius:24, padding:"52px 40px", textAlign:"center", maxWidth:480, width:"90%", boxShadow:"0 20px 60px rgba(29,53,87,.12)", border:`1.5px solid ${T.border}` },
//   successIcon:   { fontSize:60, marginBottom:20, display:"block" },
//   successTitle:  { fontSize:28, fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
//   successSub:    { color:T.textLight, fontSize:14, lineHeight:1.75, marginBottom:28 },
//   successBadge:  { background:T.greenLight, borderRadius:14, padding:"16px 24px", marginBottom:28, display:"flex", flexDirection:"column", gap:4 },
//   orderIdLabel:  { fontSize:11, fontWeight:700, color:T.greenDeep, textTransform:"uppercase", letterSpacing:1 },
//   orderId:       { fontSize:18, fontWeight:800, color:T.navy, letterSpacing:.5 },
//   successBtns:   { display:"flex", flexDirection:"column", gap:12 },
//   viewOrderBtn:  { background:T.green, color:"#fff", border:"none", borderRadius:12, padding:"14px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s" },
//   shopMoreBtn:   { background:"#fff", color:T.navy, border:`1.5px solid ${T.border}`, borderRadius:12, padding:"14px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s" },
// };

// const { greenDark:_a, pinkLight:_b, greenDeep:_c } = T;
// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ Add this
import axios from "axios";
import { T, FONT, fadeUp } from "../components/CheckoutCompenents/Checkouttokens.js";
import { decreaseStock } from "../redux/products/products_slice.jsx"; // ✅ Import this

import CartPreview      from "../components/CheckoutCompenents/Cartpreview.jsx";
import AddressSection   from "../components/CheckoutCompenents/Addresssection.jsx";
import PaymentSection   from "../components/CheckoutCompenents/Paymentsection.jsx";
import OrderSummary     from "../components/CheckoutCompenents/Ordersummary.jsx";
import CheckoutSkeleton from "../components/CheckoutCompenents/Checkoutskeleton.jsx";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userInfo");
  if (token) config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
  return config;
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // ✅ Add dispatch

  // ── Tera exact same cartItems resolution ─────────────────
  const cartItems = location.state?.Items
    || location.state?.items
    || location.state?.cartItems
    || [];

  // ── Tera exact same state ─────────────────────────────────
  const [savedAddresses,    setSavedAddresses]    = useState([]);
  const [savedPayments,     setSavedPayments]      = useState([]);
  const [loading,           setLoading]            = useState(true);
  const [placingOrder,      setPlacingOrder]        = useState(false);
  const [error,             setError]              = useState("");
  const [orderSuccess,      setOrderSuccess]        = useState(null);

  const [selectedAddressId, setSelectedAddressId]  = useState("new");
  const [selectedPaymentId, setSelectedPaymentId]  = useState("new");

  const [formData, setFormData] = useState({
    shippingAddress: {
      fullName:"", addressLine1:"", city:"", state:"", pincode:"", phoneNumber:"",
    },
    paymentMethod: "COD",
  });

  // Font inject
  useEffect(() => {
    if (!document.getElementById("nest-fonts-co")) {
      const l = document.createElement("link");
      l.id = "nest-fonts-co"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.background = T.offWhite;
  }, []);

  // ── Tera exact same fetchUserData useEffect ───────────────
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [addrRes, payRes] = await Promise.all([
          api.get("/addresses"),
          api.get("/payments"),
        ]);
        const addresses = addrRes.data?.data || addrRes.data || [];
        const payments  = payRes.data?.data  || payRes.data  || [];

        setSavedAddresses(addresses);
        setSavedPayments(payments);

        const defaultAddr = addresses.find(a => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setFormData(prev => ({
            ...prev,
            shippingAddress: {
              fullName:     defaultAddr.fullName     || "",
              addressLine1: defaultAddr.addressLine1 || defaultAddr.address || "",
              city:         defaultAddr.city         || "",
              state:        defaultAddr.state        || "",
              pincode:      defaultAddr.pincode      || defaultAddr.postalCode || "",
              phoneNumber:  defaultAddr.phoneNumber  || "",
            },
          }));
        }

        const defaultPay = payments.find(p => p.isDefault);
        if (defaultPay) {
          setSelectedPaymentId(defaultPay._id);
          setFormData(prev => ({ ...prev, paymentMethod: defaultPay.type || "Card" }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // ── Tera exact same handlers ──────────────────────────────
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    if (addressId === "new") {
      setFormData(prev => ({ ...prev, shippingAddress: { fullName:"", addressLine1:"", city:"", state:"", pincode:"", phoneNumber:"" } }));
    } else {
      const addr = savedAddresses.find(a => a._id === addressId);
      if (addr) {
        setFormData(prev => ({
          ...prev,
          shippingAddress: {
            fullName:     addr.fullName     || "",
            addressLine1: addr.addressLine1 || addr.address || "",
            city:         addr.city         || "",
            state:        addr.state        || "",
            pincode:      addr.pincode      || addr.postalCode || "",
            phoneNumber:  addr.phoneNumber  || "",
          },
        }));
      }
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPaymentId(paymentId);
    if (paymentId === "new") {
      setFormData(prev => ({ ...prev, paymentMethod: "COD" }));
    } else {
      const pay = savedPayments.find(p => p._id === paymentId);
      if (pay) setFormData(prev => ({ ...prev, paymentMethod: pay.type || "Card" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ship.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [field]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ── Price calculations — tera exact same ─────────────────
  const itemsPrice    = cartItems.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 200;
  const taxPrice      = Math.round(itemsPrice * 0.18);
  const totalPrice    = itemsPrice + shippingPrice + taxPrice;

  // ── UPDATED handlePlaceOrder with stock decrement ─────────
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty! Please go back to cart.");
      return;
    }

    const sa = formData.shippingAddress;
    if (!sa.fullName || !sa.addressLine1 || !sa.city || !sa.state || !sa.pincode || !sa.phoneNumber) {
      setError("Please fill all shipping address fields");
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({
        productId:  item.product || item.productId || item._id,
        name:       item.name,
        quantity:   item.qty || item.quantity || 1,
        price:      item.price,
        totalPrice: item.price * (item.qty || 1),
      })),
      shippingAddress: { ...sa },
      paymentMethod: formData.paymentMethod,
      itemsPrice, shippingPrice, taxPrice, totalPrice,
      totalAmount: totalPrice,
    };

    try {
      setPlacingOrder(true);
      const res = await api.post("/orders", orderPayload);
      const orderId = res.data.data?.orderId || res.data._id || "N/A";
      
      // ✅ STOCK DECREMENT - Update frontend Redux state
      cartItems.forEach(item => {
        const productId = item.product || item.productId || item._id;
        const quantity = item.qty || item.quantity || 1;
        
        dispatch(decreaseStock({
          productId: productId,
          quantity: quantity
        }));
      });
      
      setOrderSuccess(orderId);
      
    } catch (err) {
      console.error("Order error:", err.response?.data);
      setError(err.response?.data?.message || JSON.stringify(err.response?.data) || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) return <CheckoutSkeleton />;

  // ── Success state ─────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ ...s.successBox, ...fadeUp(0) }}>
          <div style={s.successIcon}>🎉</div>
          <h2 style={s.successTitle}>Order Placed!</h2>
          <p style={s.successSub}>Your fresh produce is being prepared and will arrive soon.</p>
          <div style={s.successBadge}>
            <span style={s.orderIdLabel}>Order ID</span>
            <span style={s.orderId}>{orderSuccess}</span>
          </div>
          <div style={s.successBtns}>
            <button onClick={() => navigate("/orders")} style={s.viewOrderBtn}
              onMouseEnter={e => { e.currentTarget.style.background=T.greenDark; }}
              onMouseLeave={e => { e.currentTarget.style.background=T.green; }}>
              View My Orders →
            </button>
            <button onClick={() => navigate("/")} style={s.shopMoreBtn}
              onMouseEnter={e => { e.currentTarget.style.background=T.greenLight; }}
              onMouseLeave={e => { e.currentTarget.style.background="#fff"; }}>
              Continue Shopping
            </button>
          </div>
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: rgba(100,120,140,.45); }
        @media(max-width:1024px){
          .co-grid { grid-template-columns: 1fr !important; }
          .co-summary { position: static !important; }
        }
        @media(max-width:600px){
          .co-main { padding: 20px 16px 60px !important; }
          .co-bc   { padding: 10px 16px !important; }
          .pay-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <div style={s.main}>
        <div style={{ ...s.pageHeader, ...fadeUp(0) }}>
          <h1 style={s.heading}>Checkout</h1>
          <div style={s.underline} />
        </div>

        {error && (
          <div style={{ ...s.errorBox, ...fadeUp(0) }}>
            ⚠️ {error}
            <button onClick={() => setError("")} style={s.errorClose}>✕</button>
          </div>
        )}

        <div style={{ marginBottom:24 }}>
          <CartPreview cartItems={cartItems} />
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div style={s.grid}>
            <div style={s.leftCol}>
              <AddressSection
                savedAddresses={savedAddresses}
                selectedAddressId={selectedAddressId}
                formData={formData}
                onAddressSelect={handleAddressSelect}
                onChange={handleChange}
              />
              <PaymentSection
                savedPayments={savedPayments}
                selectedPaymentId={selectedPaymentId}
                formData={formData}
                onPaymentSelect={handlePaymentSelect}
                onChange={handleChange}
              />
            </div>

            <div style={s.rightCol}>
              <OrderSummary
                cartItems={cartItems}
                itemsPrice={itemsPrice}
                shippingPrice={shippingPrice}
                taxPrice={taxPrice}
                totalPrice={totalPrice}
                placingOrder={placingOrder}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const s = {
  bcBar:         { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:       { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
  main:          { maxWidth:1280, margin:"0 auto", padding:"40px 40px 72px" },
  pageHeader:    { marginBottom:28 },
  heading:       { fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
  underline:     { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99 },
  errorBox:      { display:"flex", justifyContent:"space-between", alignItems:"center", background:T.pinkLight, border:`1.5px solid #FFD6E8`, color:T.pink, fontSize:14, fontWeight:600, padding:"14px 20px", borderRadius:14, marginBottom:20 },
  errorClose:    { background:"none", border:"none", color:T.pink, cursor:"pointer", fontSize:16, fontWeight:700, fontFamily:FONT },
  grid:          { display:"grid", gridTemplateColumns:"1fr 380px", gap:28, alignItems:"start" },
  leftCol:       { display:"flex", flexDirection:"column", gap:20 },
  rightCol:      { position:"sticky", top:24 },
  successBox:    { background:"#fff", borderRadius:24, padding:"52px 40px", textAlign:"center", maxWidth:480, width:"90%", boxShadow:"0 20px 60px rgba(29,53,87,.12)", border:`1.5px solid ${T.border}` },
  successIcon:   { fontSize:60, marginBottom:20, display:"block" },
  successTitle:  { fontSize:28, fontWeight:800, color:T.navy, letterSpacing:"-.5px", marginBottom:10 },
  successSub:    { color:T.textLight, fontSize:14, lineHeight:1.75, marginBottom:28 },
  successBadge:  { background:T.greenLight, borderRadius:14, padding:"16px 24px", marginBottom:28, display:"flex", flexDirection:"column", gap:4 },
  orderIdLabel:  { fontSize:11, fontWeight:700, color:T.greenDeep, textTransform:"uppercase", letterSpacing:1 },
  orderId:       { fontSize:18, fontWeight:800, color:T.navy, letterSpacing:.5 },
  successBtns:   { display:"flex", flexDirection:"column", gap:12 },
  viewOrderBtn:  { background:T.green, color:"#fff", border:"none", borderRadius:12, padding:"14px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s" },
  shopMoreBtn:   { background:"#fff", color:T.navy, border:`1.5px solid ${T.border}`, borderRadius:12, padding:"14px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:FONT, transition:"background .22s" },
};

export default CheckoutPage;