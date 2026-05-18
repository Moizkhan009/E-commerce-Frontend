import React, { useEffect, useState } from "react";
import { useParams }    from "react-router-dom";
import axios            from "axios";
import { T, FONT }      from "../components/ProductDetailComponents/Producttokens.js";

import ProductImageBox  from "../components/ProductDetailComponents/Productimagebox.jsx";
import ProductMeta      from "../components/ProductDetailComponents/Productmeta.jsx";
import ProductActions   from "../components/ProductDetailComponents/Productactions.jsx";
import ProductSkeleton  from "../components/ProductDetailComponents/Productskeleton.jsx";
// import Header from "../components/header.jsx";

// ─────────────────────────────────────────────────────────────
//  ProductDetailPage
//
//  Tera EXACT same logic:
//    useParams() → id
//    axios.get(`/api/product/${id}`)
//    res.data.product || res.data
//    loading → skeleton
//    !product → not found
//
//  Usage:
//    <Route path="/product/:id" element={<ProductDetailPage />} />
// ─────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const ProductDetailPage = () => {
  const { id } = useParams();

  // ── Tera exact same state ────────────────────────────────
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Tera exact same useEffect + axios call ────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/product/${id}`);
        setProduct(res.data.product || res.data); // tera exact line
      } catch (err) {
        console.log("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Font inject
  useEffect(() => {
    if (!document.getElementById("nest-fonts-pd")) {
      const l = document.createElement("link");
      l.id = "nest-fonts-pd"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.background = T.offWhite;
  }, []);

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        @media(max-width:900px){
          .pd-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width:560px){
          .pd-main { padding: 20px 16px 56px !important; }
          .pd-bc   { padding: 10px 16px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      {/* <div style={s.bcBar}>
        <div style={s.bcInner}>
          {["Home", "Shop", loading ? "…" : (product?.name ?? "Product")].map((c, i, a) => (
            <React.Fragment key={i}>
              <span style={{
                fontSize:13,
                fontWeight: i === a.length-1 ? 700 : 400,
                color:      i === a.length-1 ? T.green : T.textLight,
                cursor:     i < a.length-1 ? "pointer" : "default",
                maxWidth:   i === a.length-1 ? 220 : "none",
                overflow:   "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
                {c}
              </span>
              {i < a.length-1 && <span style={{ color:T.border, fontSize:12 }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      </div> */}
      {/* <Header/> */}

      <div style={s.main}>

        {/* ── Loading — tera: loading → "Loading product..." ── */}
        {loading && <ProductSkeleton />}

        {/* ── Error — tera: !product → "Product not found" ── */}
        {!loading && (error || !product) && (
          <div style={s.errorBox}>
            <span style={{ fontSize:40, display:"block", marginBottom:16 }}>😔</span>
            <h2 style={{ fontSize:22, fontWeight:800, color:T.navy, marginBottom:8 }}>
              Product not found
            </h2>
            <p style={{ color:T.textLight, fontSize:14 }}>
              This product may have been removed or the link is incorrect.
            </p>
          </div>
        )}

        {/* ── Main layout — tera: grid md:grid-cols-2 ── */}
        {!loading && product && (
          <div style={s.grid}>

            {/* Left — Image (tera: <img src={product.image} />) */}
            <ProductImageBox
              image={product.image}
              name={product.name}
            />

            {/* Right — Details */}
            <div style={s.rightCol}>
              {/* Name, brand, price, desc (tera: product.name, price, description) */}
              <ProductMeta product={product} />

              {/* Add to Cart + Wishlist (tera: two buttons) */}
              <ProductActions product={product} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const s = {
  bcBar:    { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:  { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto", overflow:"hidden" },
  main:     { maxWidth:1280, margin:"0 auto", padding:"44px 40px 72px" },
  grid:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:52, alignItems:"start" },
  rightCol: { display:"flex", flexDirection:"column", gap:24 },
  errorBox: { textAlign:"center", padding:"80px 32px", background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}` },
};

export default ProductDetailPage;