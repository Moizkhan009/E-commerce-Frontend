// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { T, FONT, fadeUp } from "./hotdealsTokens.js";
// import { addToCart }      from "../../redux/cart/Cartslice.js";
// import { toggleWishlist } from "../../redux/Wishlist/wishlistSlice.js";

// //  DealCard — grid item for remaining featured products
// // ─────────────────────────────────────────────────────────────
// const DealCard = ({ product, delay = 0 }) => {
//   const dispatch = useDispatch();
//   const [added,     setAdded]   = useState(false);
//   const [wishlisted,setWish]    = useState(false);
//   const [hov,       setHov]     = useState(false);

//   const discount = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : Math.floor(Math.random() * 20) + 15;

//   const handleCart = (e) => {
//     e.stopPropagation();
//     dispatch(addToCart({ productId: product._id, qty: 1 }));
//     setAdded(true);
//     setTimeout(() => setAdded(false), 2000);
//   };

//   const handleWish = (e) => {
//     e.stopPropagation();
//     dispatch(toggleWishlist(product._id));
//     setWish(w => !w);
//   };

//   const catName = typeof product.category === "object"
//     ? product.category?.name
//     : product.category;

//   return (
//     <div
//       style={{
//         ...s.card,
//         ...fadeUp(delay),
//         boxShadow: hov ? "0 16px 40px rgba(29,53,87,.12)" : "0 2px 14px rgba(29,53,87,.05)",
//         transform: hov ? "translateY(-6px)" : "translateY(0)",
//       }}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//     >
//       {/* Image */}
//       <div style={s.imgWrap}>
//         <img
//           src={product.image}
//           alt={product.name}
//           style={{ ...s.img, transform: hov ? "scale(1.08)" : "scale(1)" }}
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=70"; }}
//         />
//         <div style={s.imgGrad} />

//         {/* Discount badge */}
//         <span style={s.discBadge}>-{discount}%</span>

//         {/* Heart */}
//         <button
//           onClick={handleWish}
//           style={{
//             ...s.heartBtn,
//             opacity: hov ? 1 : 0,
//             background: wishlisted ? T.pink : "rgba(255,255,255,.92)",
//             color:      wishlisted ? "#fff"  : T.pink,
//           }}
//           onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
//         >
//           {wishlisted ? "❤️" : "🤍"}
//         </button>

//         {/* Stock out overlay */}
//         {!product.countInStock && (
//           <div style={s.oosOverlay}>Out of Stock</div>
//         )}
//       </div>

//       {/* Body */}
//       <div style={s.body}>
//         <span style={s.catTag}>{catName}</span>
//         <h3 style={{ ...s.name, color: hov ? T.green : T.navy }}>{product.name}</h3>

//         <div style={s.priceRow}>
//           <span style={s.price}>Rs {product.price?.toLocaleString()}</span>
//           {product.originalPrice && (
//             <span style={s.origPrice}>Rs {product.originalPrice?.toLocaleString()}</span>
//           )}
//         </div>

//         <button
//           onClick={handleCart}
//           disabled={!product.countInStock}
//           style={{
//             ...s.cartBtn,
//             background: added ? T.greenDark : product.countInStock ? T.green : "#D1D9E0",
//             cursor: product.countInStock ? "pointer" : "not-allowed",
//             transform: added ? "scale(.98)" : "scale(1)",
//           }}
//           onMouseEnter={e => { if (product.countInStock && !added) { e.currentTarget.style.background = T.greenDark; e.currentTarget.style.transform = "translateY(-1px)"; }}}
//           onMouseLeave={e => { if (!added) { e.currentTarget.style.background = product.countInStock ? T.green : "#D1D9E0"; e.currentTarget.style.transform = "translateY(0)"; }}}
//         >
//           {added ? "✓ Added!" : "🛒 Add to Cart"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const s = {
//   card:      { background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}`, overflow:"hidden", transition:"all .3s cubic-bezier(.4,0,.2,1)", fontFamily:FONT },
//   imgWrap:   { position:"relative", height:210, overflow:"hidden" },
//   img:       { width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .45s cubic-bezier(.4,0,.2,1)" },
//   imgGrad:   { position:"absolute", inset:0, background:"linear-gradient(to top,rgba(29,53,87,.18) 0%,transparent 55%)" },
//   discBadge: { position:"absolute", top:12, left:12, background:T.pink, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:40 },
//   heartBtn:  { position:"absolute", top:12, right:12, width:32, height:32, borderRadius:"50%", border:"none", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", backdropFilter:"blur(4px)", fontFamily:FONT },
//   oosOverlay:{ position:"absolute", inset:0, background:"rgba(255,255,255,.75)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:T.pink, backdropFilter:"blur(2px)" },
//   body:      { padding:"16px 16px 18px", display:"flex", flexDirection:"column", gap:8 },
//   catTag:    { fontSize:10, fontWeight:700, color:T.textLight, textTransform:"uppercase", letterSpacing:1 },
//   name:      { fontSize:15, fontWeight:700, lineHeight:1.35, margin:0, transition:"color .2s" },
//   priceRow:  { display:"flex", alignItems:"center", gap:8 },
//   price:     { fontSize:20, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
//   origPrice: { fontSize:12, color:T.textLight, textDecoration:"line-through" },
//   cartBtn:   { width:"100%", color:"#fff", border:"none", borderRadius:10, padding:"11px", fontWeight:700, fontSize:13, fontFamily:FONT, transition:"all .2s", letterSpacing:.2, marginTop:2 },
// };

// const { greenDark:_a } = T;
// export default DealCard;
import React, { useState } from "react";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/Cart/Cartslice";
import { toggleWishlist } from "../../redux/Wishlist/wishlistSlice";

// ─────────────────────────────────────────────────────────────
//  DealCard — exact same style as ProductsGridPage cards
// ─────────────────────────────────────────────────────────────
const DealCard = ({ product }) => {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const location    = useLocation();
  const [loadingId, setLoadingId] = useState(null);

  // ── Auth ─────────────────────────────────────────────────────
  const token      = localStorage.getItem("userInfo");
  const isLoggedIn = !!token;

  // ── Wishlist ─────────────────────────────────────────────────
  const wishlistState = useSelector((state) => state.wishlist);
  const wishlistItems = wishlistState?.items || [];

  const isInWishlist = (productId) =>
    wishlistItems.some(
      (item) => item.productId === productId || item._id === productId
    );
  const inWishlist = isInWishlist(product._id);

  // ── Handlers ─────────────────────────────────────────────────
  const handleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error("Login required to add items to your wishlist❤️");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setLoadingId(product._id);
    try {
      await dispatch(toggleWishlist(product._id));
      toast.success(
        isInWishlist(product._id) ? "Removed From Wishlist💔" : "Added to Wishlist❤️"
      );
    } catch {
      toast.error("Failed to update wishlist");
    } finally {
      setLoadingId(null);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart 🛒");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    try {
      setLoadingId(product._id);
      await dispatch(addToCart({ productId: product._id, quantity: 1 }));
      toast.success("Added to Cart🛒");
    } catch {
      toast.error("Failed to add to Cart");
    } finally {
      setLoadingId(null);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────
  const getProductName  = () => product.name || product.productName || "Unnamed Product";
  const getProductPrice = () => product.price || product.priceValue || 0;

  const getProductImage = () => {
    if (!product.image) return null;
    if (typeof product.image === "string") return product.image;
    if (typeof product.image === "object")
      return product.image.url || product.image.secure_url;
    return null;
  };

  const getCategoryName = () => {
    const cat = product.category;
    if (!cat) return "Uncategorized";
    if (typeof cat === "object") return cat.name || "Uncategorized";
    return cat;
  };

  const renderStars = (rating) => {
    const num = Math.floor(rating || 0);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < num ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const isLoading = loadingId === product._id;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative">

      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 left-3 ${product.badgeColor || "bg-emerald-500"} text-white text-xs px-3 py-1 rounded-full font-semibold z-10`}>
          {product.badge}
        </div>
      )}

      {/* Hover Actions — Heart + Eye */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={handleWishlist}
          disabled={isLoading}
          className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-300
            ${inWishlist
              ? "bg-red-500 text-white scale-110"
              : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Heart className="w-4 h-4" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "currentColor"} />
          )}
        </button>

        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Persistent wishlist heart (no hover needed) */}
      {inWishlist && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 bg-red-500 rounded-full shadow-md flex items-center justify-center group-hover:opacity-0 transition-opacity">
            <Heart className="w-4 h-4" fill="white" stroke="white" />
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="bg-gray-50 p-6 md:p-8 flex items-center justify-center h-40 md:h-48">
        {getProductImage() ? (
          <img
            src={getProductImage()}
            alt={getProductName()}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg";
            }}
          />
        ) : (
          <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">🛒</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        <p className="text-xs text-gray-500 mb-1">{getCategoryName()}</p>

        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {getProductName()}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500">({product.rating || 0})</span>
        </div>

        {(product.brand || product.seller) && (
          <p className="text-xs text-gray-500 mb-3">
            By{" "}
            <span className="text-emerald-600">
              {product.brand ||
                (typeof product.seller === "object"
                  ? product.seller?.name
                  : product.seller)}
            </span>
          </p>
        )}

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-base md:text-lg">
              $ {getProductPrice().toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs md:text-sm">
                $ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;