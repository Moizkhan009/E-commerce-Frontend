import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { T, FONT, fadeUp } from "../components/HotDealsCompoenets/Hotdealstokens.js";

import { fetchProductsBySection } from "../redux/products/products_action.jsx";

import DealsHeader      from "../components/HotDealsCompoenets/Dealsheader.jsx";
import FeaturedHero     from "../components/HotDealsCompoenets/Featuredhero.jsx";
import DealCard         from "../components/HotDealsCompoenets/Dealcard.jsx";

import HotDealsSkeleton from "../components/HotDealsCompoenets/Hotdealsskeleton.jsx";

const SECTION = "featured"; 

const HotDealsPage = () => {
  const dispatch = useDispatch();

  // ── Slice name: "product" — store mein state.product ──
  // sections[section] = products[] directly (array, not object)
  const products = useSelector(
    state => state.product?.sections?.[SECTION] || []
  );
  const loading = useSelector(state => state.product?.status === "loading");
  const error   = useSelector(state => state.product?.error || null);

  // ── Tera exact same dispatch — fetchProductsBySection("featured") ──
  useEffect(() => {
    dispatch(fetchProductsBySection(SECTION));
  }, [dispatch]);

  // Font inject
  useEffect(() => {
    if (!document.getElementById("nest-fonts-hd")) {
      const l = document.createElement("link");
      l.id = "nest-fonts-hd"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.background = T.offWhite;
  }, []);

  // Featured = first product, rest in grid
  const featuredProduct  = products[0] || null;
  const remainingProducts = products.slice(1);

  return (
    <div style={{ fontFamily:FONT, background:T.offWhite, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @media(max-width:1024px){
          .hd-hero  { grid-template-columns: 1fr !important; }
          .hd-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .hd-header{ flex-direction: column !important; }
        }
        @media(max-width:600px){
          .hd-main  { padding: 20px 16px 56px !important; }
          .hd-bc    { padding: 10px 16px !important; }
          .hd-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      {/* <div style={s.bcBar}>
        <div style={s.bcInner}>
          {["Home", "Shop", "Hot Deals"].map((c, i, a) => (
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
      </div> */}

      <div style={s.main}>

        {/* Page Header */}
        <DealsHeader count={products.length} />

        {/* Loading */}
        {loading && <HotDealsSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div style={{ ...s.errorBox, ...fadeUp(0) }}>
            <span style={{ fontSize:28 }}>⚠️</span>
            <div>
              <div style={{ fontWeight:700, color:T.navy, marginBottom:4 }}>Could not load deals</div>
              <div style={{ fontSize:13, color:T.text }}>{error}</div>
            </div>
            <button
              onClick={() => dispatch(fetchProductsBySection(SECTION))}
              style={s.retryBtn}
              onMouseEnter={e => e.currentTarget.style.background=T.greenDark}
              onMouseLeave={e => e.currentTarget.style.background=T.green}
            >Retry</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div style={{ ...s.emptyBox, ...fadeUp(0) }}>
            <span style={{ fontSize:52, display:"block", marginBottom:16 }}>🔥</span>
            <h2 style={{ fontSize:22, fontWeight:800, color:T.navy, marginBottom:8 }}>No deals right now</h2>
            <p style={{ color:T.textLight, fontSize:14 }}>Check back soon — new deals drop daily!</p>
          </div>
        )}

        {/* ── MIXED LAYOUT ── */}
        {!loading && !error && products.length > 0 && (
          <>
            {/* Featured hero — first product big */}
            <div style={{ marginBottom:40 }}>
              <FeaturedHero product={featuredProduct} />
            </div>

            {/* Section divider */}
            {remainingProducts.length > 0 && (
              <div style={{ ...s.dividerRow, ...fadeUp(200) }}>
                <div style={s.dividerLine} />
                <span style={s.dividerText}>🔥 More Hot Deals</span>
                <div style={s.dividerLine} />
              </div>
            )}

            {/* Remaining products grid */}
            {remainingProducts.length > 0 && (
              <div style={s.grid}>
                {remainingProducts.map((product, i) => (
                  <DealCard
                    key={product._id}
                    product={product}
                    delay={i * 60}
                  />
                ))}
              </div>
            )}

            {/* Bottom banner */}
            <div style={{ ...s.bottomBanner, ...fadeUp(300) }}>
              <div style={s.bannerLeft}>
                <div style={s.bannerTitle}>🌿 Fresh Deals Every Day</div>
                <p style={s.bannerSub}>All products are harvested fresh and delivered within 24 hours. Deals update daily at midnight!</p>
              </div>
              <div style={s.bannerRight}>
                {[
                  { icon:"🚚", val:"Free",    label:"Delivery over $ 999" },
                  { icon:"✅", val:"100%",    label:"Fresh Guarantee"      },
                  { icon:"↩️", val:"7 Days",  label:"Easy Returns"         },
                ].map(({ icon, val, label }, i) => (
                  <div key={i} style={s.bannerStat}>
                    <span style={{ fontSize:22 }}>{icon}</span>
                    <span style={s.bannerStatVal}>{val}</span>
                    <span style={s.bannerStatLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const s = {
  bcBar:          { background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"12px 40px" },
  bcInner:        { display:"flex", alignItems:"center", gap:8, maxWidth:1280, margin:"0 auto" },
  main:           { maxWidth:1280, margin:"0 auto", padding:"44px 40px 72px" },
  errorBox:       { display:"flex", gap:16, alignItems:"center", background:"#fff", borderRadius:16, padding:"24px", border:`1.5px solid #FFD6E8`, marginBottom:24 },
  retryBtn:       { background:T.green, color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:FONT, transition:"background .2s", marginLeft:"auto", whiteSpace:"nowrap" },
  emptyBox:       { textAlign:"center", padding:"80px 32px", background:"#fff", borderRadius:20, border:`1.5px solid ${T.border}` },
  dividerRow:     { display:"flex", alignItems:"center", gap:16, marginBottom:28 },
  dividerLine:    { flex:1, height:1.5, background:T.border, borderRadius:99 },
  dividerText:    { fontSize:14, fontWeight:700, color:T.navy, whiteSpace:"nowrap", background:T.offWhite, padding:"6px 20px", borderRadius:40, border:`1.5px solid ${T.border}` },
  grid:           { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:22, marginBottom:40 },
  bottomBanner:   { display:"flex", justifyContent:"space-between", alignItems:"center", background:`linear-gradient(135deg,${T.greenPale},${T.greenLight})`, borderRadius:20, padding:"32px 36px", border:`1.5px solid ${T.greenLight}`, flexWrap:"wrap", gap:24 },
  bannerLeft:     { flex:1, minWidth:200 },
  bannerTitle:    { fontSize:18, fontWeight:800, color:T.navy, marginBottom:8 },
  bannerSub:      { fontSize:13, color:T.text, lineHeight:1.7, margin:0 },
  bannerRight:    { display:"flex", gap:32, flexWrap:"wrap" },
  bannerStat:     { display:"flex", flexDirection:"column", alignItems:"center", gap:4, textAlign:"center" },
  bannerStatVal:  { fontSize:20, fontWeight:800, color:T.green, letterSpacing:"-.3px" },
  bannerStatLabel:{ fontSize:11, color:T.textLight, fontWeight:600 },
};

const { greenDark:_a, greenPale:_b } = T;
export default HotDealsPage;