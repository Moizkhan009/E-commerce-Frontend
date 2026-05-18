// import { useDispatch } from "react-redux";
// import { clearCart } from "../redux/Cart/Cartslice";
// import React, { useState } from "react";
// import axios from "axios";

// const PlaceOrder = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const [orderData, setOrderData] = useState({
//     orderItems: [
//       {
//         productId: "",
//         name: "",
//         quantity: 1,
//         price: 0,
//       },
//     ],

//     shippingAddress: {
//       addressLine1: "",
//       city: "",
//       state: "",
//     },

//     paymentMethod: "COD",

//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0,
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Shipping Address
//     if (
//       name === "addressLine1" ||
//       name === "city" ||
//       name === "state"
//     ) {
//       setOrderData({
//         ...orderData,
//         shippingAddress: {
//           ...orderData.shippingAddress,
//           [name]: value,
//         },
//       });
//     } else {
//       setOrderData({
//         ...orderData,
//         [name]: value,
//       });
//     }
//   };

//   // Handle Order Item Change
//   const handleItemChange = (e) => {
//     const { name, value } = e.target;

//     setOrderData({
//       ...orderData,
//       orderItems: [
//         {
//           ...orderData.orderItems[0],
//           [name]: value,
//         },
//       ],
//     });
//   };

//   // Submit Order
//   const placeOrderHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("userInfo");

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const { data } = await axios.post(
//         "http://localhost:5000/api/orders",
//         orderData,
//         config
//       );


//       alert("Order Created Successfully");
//     // Clear cart after successful order placement
//       dispatch(clearCart());


//       console.log(data);

//       setLoading(false);
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data?.message || "Order Failed"
//       );

//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow">
//         <h2 className="mb-4">Place Order</h2>

//         <form onSubmit={placeOrderHandler}>
//           {/* Product Info */}
//           <h4>Product Details</h4>

//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Product ID"
//             name="productId"
//             onChange={handleItemChange}
//             required
//           />

//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Product Name"
//             name="name"
//             onChange={handleItemChange}
//             required
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Quantity"
//             name="quantity"
//             onChange={handleItemChange}
//             required
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Price"
//             name="price"
//             onChange={handleItemChange}
//             required
//           />

//           {/* Shipping Address */}
//           <h4>Shipping Address</h4>

//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Address"
//             name="addressLine1"
//             value={orderData.shippingAddress.addressLine1}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="City"
//             name="city"
//             value={orderData.shippingAddress.city}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="State"
//             name="state"
//             value={orderData.shippingAddress.state}
//             onChange={handleChange}
//             required
//           />

//           {/* Payment Method */}
//           <h4>Payment Method</h4>

//           <select
//             className="form-control mb-3"
//             name="paymentMethod"
//             value={orderData.paymentMethod}
//             onChange={handleChange}
//           >
//             <option value="COD">Cash On Delivery</option>
//             <option value="JazzCash">JazzCash</option>
//             <option value="EasyPaisa">EasyPaisa</option>
//             <option value="Card">Card</option>
//           </select>

//           {/* Prices */}
//           <h4>Prices</h4>

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Items Price"
//             name="itemsPrice"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Shipping Price"
//             name="shippingPrice"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Tax Price"
//             name="taxPrice"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Total Price"
//             name="totalPrice"
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="submit"
//             className="btn btn-dark w-100"
//             disabled={loading}
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { T, FONT, fadeUp } from "../components/OrderComponents/Ordertokens.js";

import OrderCard       from "../components/OrderComponents/Ordercard.jsx";
import OrderFilters    from "../components/OrderComponents/Orderfilters.jsx";
import OrderSkeleton   from "../components/OrderComponents/Orderskeleton.jsx";
import OrderEmpty      from "../components/OrderComponents/Orderempty.jsx";

// ─────────────────────────────────────────────────────────────
//  MyOrders
//
//  API: GET /api/orders  (auth token se user orders fetch)
//  Response: orders[] — tera exact Order model shape
//
//  Usage:
//    <Route path="/orders" element={<MyOrders />} />
// ─────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:5000";

const MyOrders = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState("all");

  // Font inject
  useEffect(() => {
    if (!document.getElementById("nest-fonts-ord")) {
      const l = document.createElement("link");
      l.id = "nest-fonts-ord"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.background = T.offWhite;
  }, []);

  // ── Fetch orders from GET /api/orders ─────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ userInfo se token lo — tera localStorage key
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const token    = userInfo?.token || userInfo?.accessToken || "";

        const res = await axios.get(`${BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Handle both { data: [] } and [] response shapes
        const data = res.data?.data || res.data?.orders || res.data || [];
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ── Filter by orderStatus ──────────────────────────────────
  const filtered = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter(o => o.orderStatus === filter);
  }, [orders, filter]);

  // ── Count per status for filter badges ────────────────────
  const counts = useMemo(() => {
    const c = { total: orders.length };
    orders.forEach(o => {
      c[o.orderStatus] = (c[o.orderStatus] || 0) + 1;
    });
    return c;
  }, [orders]);

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @media(max-width:900px){
          .ord-expand-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          .ord-main  { padding: 20px 16px 56px !important; }
          .ord-bc    { padding: 10px 16px !important; }
          .ord-pills { gap: 6px !important; }
          .ord-pill  { padding: 6px 12px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={s.bcBar}>
        <div style={s.bcInner}>
          {["Home", "My Account", "My Orders"].map((c, i, a) => (
            <React.Fragment key={i}>
              <span style={{
                fontSize:13, cursor:i<a.length-1?"pointer":"default",
                fontWeight:i===a.length-1?700:400,
                color:i===a.length-1?T.green:T.textLight,
              }}
                onMouseEnter={e => { if(i<a.length-1) e.currentTarget.style.color=T.green; }}
                onMouseLeave={e => { if(i<a.length-1) e.currentTarget.style.color=T.textLight; }}
              >{c}</span>
              {i<a.length-1 && <span style={{ color:T.border, fontSize:12 }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={s.main}>

        {/* Header */}
        <div style={{ ...s.pageHeader, ...fadeUp(0) }}>
          <div>
            <div style={s.eyebrow}>My Account</div>
            <h1 style={s.heading}>
              My Orders
              {!loading && orders.length > 0 && (
                <span style={s.countBadge}>{orders.length} order{orders.length !== 1 ? "s" : ""}</span>
              )}
            </h1>
            <div style={s.underline} />
          </div>
        </div>

        {/* Loading */}
        {loading && <OrderSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div style={s.errorBox}>
            <span style={{ fontSize:24 }}>⚠️</span>
            <div>
              <div style={{ fontWeight:700, color:T.navy, marginBottom:4 }}>Could not load orders</div>
              <div style={{ fontSize:13, color:T.text }}>{error}</div>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={s.retryBtn}
              onMouseEnter={e => e.currentTarget.style.background=T.greenDark}
              onMouseLeave={e => e.currentTarget.style.background=T.green}
            >Retry</button>
          </div>
        )}

        {/* Orders list */}
        {!loading && !error && (
          <>
            {/* Stats row */}
            {orders.length > 0 && (
              <div style={{ ...s.statsRow, ...fadeUp(60) }}>
                {[
                  { label:"Total Orders",   val: orders.length,                                      icon:"📦" },
                  { label:"Delivered",      val: orders.filter(o=>o.orderStatus==="delivered").length, icon:"✅" },
                  { label:"In Progress",    val: orders.filter(o=>["pending","processing","shipped"].includes(o.orderStatus)).length, icon:"🚚" },
                  { label:"Total Spent",    val:`Rs ${orders.reduce((s,o)=>s+(o.totalPrice||0),0).toLocaleString()}`, icon:"💰" },
                ].map(({ label, val, icon }, i) => (
                  <div key={i} style={s.statCard}>
                    <span style={s.statIcon}>{icon}</span>
                    <span style={s.statVal}>{val}</span>
                    <span style={s.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Filter pills */}
            {orders.length > 0 && (
              <div style={{ ...fadeUp(100), marginBottom:20 }}>
                <OrderFilters
                  active={filter}
                  onFilter={setFilter}
                  counts={counts}
                />
              </div>
            )}

            {/* Empty state */}
            {orders.length === 0 && <OrderEmpty filtered={false} />}
            {orders.length > 0 && filtered.length === 0 && <OrderEmpty filtered={true} />}

            {/* Order cards — one per order */}
            <div style={s.cardsList}>
              {filtered.map((order, i) => (
                <OrderCard key={order._id} order={order} delay={i * 60} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const s = {
  bcBar:       { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:     { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
  main:        { maxWidth:1280, margin:"0 auto", padding:"44px 40px 72px" },
  pageHeader:  { marginBottom:32 },
  eyebrow:     { fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:T.textLight, marginBottom:8 },
  heading:     { fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:T.navy, letterSpacing:"-.5px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", lineHeight:1.1, marginBottom:10 },
  countBadge:  { background:T.greenLight, color:T.greenDeep, fontSize:14, fontWeight:700, padding:"4px 16px", borderRadius:40, letterSpacing:0 },
  underline:   { width:44, height:3, background:`linear-gradient(90deg,${T.green},${T.greenDark})`, borderRadius:99 },
  statsRow:    { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 },
  statCard:    { background:"#fff", borderRadius:16, padding:"18px 20px", border:`1.5px solid ${T.border}`, display:"flex", flexDirection:"column", gap:4, boxShadow:"0 2px 10px rgba(29,53,87,.04)" },
  statIcon:    { fontSize:22, marginBottom:2 },
  statVal:     { fontSize:22, fontWeight:800, color:T.navy, letterSpacing:"-.3px" },
  statLabel:   { fontSize:12, color:T.textLight, fontWeight:500 },
  cardsList:   { display:"flex", flexDirection:"column", gap:16 },
  errorBox:    { display:"flex", gap:16, alignItems:"center", background:"#fff", borderRadius:16, padding:"24px", border:`1.5px solid #FFD6E8`, marginBottom:24 },
  retryBtn:    { background:T.green, color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:FONT, transition:"background .2s", marginLeft:"auto", whiteSpace:"nowrap" },
};

const { greenDeep:_a, greenDark:_b } = T;
export default MyOrders;