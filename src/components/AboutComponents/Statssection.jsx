import React, { useState, useEffect, useRef } from "react";

const Counter = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(end / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 25);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center", color: "#fff" }}>
      <div
        style={{
          fontSize: 48,
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {count.toLocaleString()}+
      </div>
      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8, letterSpacing: 1, textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { end: 12, label: "Glorious Years" },
    { end: 8500, label: "Happy Clients" },
    { end: 750, label: "Projects Complete" },
    { end: 45, label: "Team Advisors" },
    { end: 12000, label: "Products Sale" },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #3BB77E 0%, #29A56C 100%)",
        padding: "60px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            <Counter {...s} />
            {i < stats.length - 1 && (
              <div style={{ width: 1, height: 60, background: "rgba(255,255,255,.25)" }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

// import React, { useState, useEffect, useRef } from "react";

// // ── Data ───────────────────────────────────────────────────────────────────
// const stats = [
//   { end:12,    label:"Glorious Years",    icon:"🏆" },
//   { end:8500,  label:"Happy Clients",     icon:"😊" },
//   { end:750,   label:"Projects Complete", icon:"✅" },
//   { end:45,    label:"Team Advisors",     icon:"👥" },
//   { end:12000, label:"Products Sale",     icon:"🛒" },
// ];

// // ── Animated Counter ───────────────────────────────────────────────────────
// const Counter = ({ end, label, icon, delay }) => {
//   const [count, setCount]   = useState(0);
//   const [ready, setReady]   = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting && !ready) {
//         setReady(true);
//         setTimeout(() => {
//           let val = 0;
//           const steps = 60;
//           const inc = end / steps;
//           const timer = setInterval(() => {
//             val += inc;
//             if (val >= end) { setCount(end); clearInterval(timer); }
//             else setCount(Math.floor(val));
//           }, 1600 / steps);
//         }, delay);
//         obs.disconnect();
//       }
//     }, { threshold: 0.3 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [end, delay, ready]);

//   // Format: 12000 → 12K
//   const display = count >= 1000 ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "K" : count;

//   return (
//     <div ref={ref} style={{ textAlign:"center", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", gap:10, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
//       {/* Icon bubble */}
//       <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", border:"1.5px solid rgba(255,255,255,.25)", marginBottom:4, fontSize:22 }}>
//         {icon}
//       </div>
//       {/* Number */}
//       <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:48, fontWeight:700, color:"#fff", lineHeight:1, textShadow:"0 2px 12px rgba(0,0,0,.12)" }}>
//         {display}+
//       </div>
//       {/* Label */}
//       <div style={{ fontSize:12, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", color:"rgba(255,255,255,.8)" }}>
//         {label}
//       </div>
//     </div>
//   );
// };

// // ── Section ────────────────────────────────────────────────────────────────
// const StatsSection = () => (
//   <section style={{ position:"relative", background:"linear-gradient(130deg,#2D9B68 0%,#3BB77E 45%,#28976A 100%)", padding:"72px 80px", overflow:"hidden" }}>
//     {/* Dot overlay */}
//     <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
//     {/* Decorative rings */}
//     <div style={{ position:"absolute", top:-60, right:80, width:200, height:200, borderRadius:"50%", border:"2px solid rgba(255,255,255,.12)", pointerEvents:"none" }} />
//     <div style={{ position:"absolute", bottom:-40, left:60, width:140, height:140, borderRadius:"50%", border:"2px solid rgba(255,255,255,.10)", pointerEvents:"none" }} />

//     <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center", maxWidth:1100, margin:"0 auto", position:"relative" }}>
//       {stats.map((s, i) => (
//         <React.Fragment key={i}>
//           <Counter {...s} delay={i * 120} />
//           {i < stats.length - 1 && (
//             <div style={{ width:1, height:64, background:"rgba(255,255,255,.2)", borderRadius:99 }} />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   </section>
// );

// export default StatsSection;