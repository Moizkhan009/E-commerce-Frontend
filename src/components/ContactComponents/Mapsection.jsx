import React, { useState } from "react";

const locations = [
  {
    id: "office",
    type: "Office",
    icon: "🏢",
    address: "205 North Michigan Avenue, Suite 810",
    city: "Chicago, 60601, USA",
    phone: "(123) 456-7890",
    email: "office@nestmart.com",
    color: "#3BB77E",
    bg: "#f0faf4",
  },
  {
    id: "studio",
    type: "Studio",
    icon: "🎨",
    address: "205 North Michigan Avenue, Suite 810",
    city: "Chicago, 60601, USA",
    phone: "(123) 456-7890",
    email: "studio@nestmart.com",
    color: "#f6a623",
    bg: "#fff8ee",
  },
  {
    id: "shop",
    type: "Shop",
    icon: "🛒",
    address: "205 North Michigan Avenue, Suite 810",
    city: "Chicago, 60601, USA",
    phone: "(123) 456-7890",
    email: "shop@nestmart.com",
    color: "#e74c3c",
    bg: "#fff5f5",
  },
];

export default function MapSection() {
  const [active, setActive] = useState("office");

  return (
    <section style={{ padding: "70px 0", background: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <span style={{
            display: "inline-block",
            background: "#DEF9EC",
            color: "#228955",
            padding: "5px 16px",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            Find Us
          </span>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#111827",
            marginBottom: "10px",
          }}>
            Our Locations
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
            Visit any of our locations — our team is always ready to welcome you.
          </p>
        </div>

        {/* Map */}
        <div style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          marginBottom: "36px",
          border: "1.5px solid #e5e7eb",
        }}>
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            zIndex: 10,
            background: "#3BB77E",
            color: "white",
            padding: "10px 18px",
            borderRadius: "999px",
            fontSize: "0.83rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 16px rgba(59,183,126,0.4)",
          }}>
            📍 Chicago, Illinois, USA
          </div>
          <iframe
            title="Nest Mart Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-87.72%2C41.82%2C-87.53%2C41.93&layer=mapnik"
            style={{ width: "100%", height: "380px", border: "none", display: "block" }}
            allowFullScreen
          />
        </div>

        {/* Tab buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActive(loc.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "999px",
                border: `1.5px solid ${active === loc.id ? loc.color : "#e5e7eb"}`,
                background: active === loc.id ? loc.bg : "#fff",
                color: active === loc.id ? loc.color : "#6b7280",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.25s",
                fontFamily: "inherit",
              }}
            >
              {loc.icon} {loc.type}
            </button>
          ))}
        </div>

        {/* Location cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}>
          {locations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => setActive(loc.id)}
              style={{
                background: "#fff",
                border: `1.5px solid ${active === loc.id ? loc.color : "#e5e7eb"}`,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: active === loc.id ? `0 0 0 3px ${loc.color}22` : "none",
              }}
            >
              {/* Card header */}
              <div style={{
                padding: "20px 22px 16px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: loc.bg,
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}>
                  {loc.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.2rem",
                    color: loc.color,
                    marginBottom: "2px",
                  }}>
                    {loc.type}
                  </h3>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: loc.color,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}>
                    <span style={{
                      width: "6px", height: "6px",
                      background: loc.color,
                      borderRadius: "50%",
                      display: "inline-block",
                    }} />
                    Open Now
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { icon: "📍", text: `${loc.address}, ${loc.city}` },
                  { icon: "📞", text: loc.phone },
                  { icon: "✉️", text: loc.email },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "0.82rem",
                    color: "#4b5563",
                    lineHeight: 1.5,
                  }}>
                    <span style={{ flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* View map button */}
              <div style={{ padding: "0 22px 22px" }}>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "11px",
                    borderRadius: "10px",
                    background: loc.color,
                    color: "white",
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  🗺️ View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}