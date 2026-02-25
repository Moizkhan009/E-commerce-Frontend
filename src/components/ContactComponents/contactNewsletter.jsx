import React, { useState } from "react";

export default function ContactNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  };

  const veggies = [
    { emoji: "🥬", top: "50%", left: "50%", size: "4.5rem", delay: "0s", transform: "translate(-50%,-50%)" },
    { emoji: "🥕", top: "8%", right: "8%", size: "2rem", delay: "0.4s" },
    { emoji: "🍅", top: "12%", left: "8%", size: "2.2rem", delay: "0.8s" },
    { emoji: "🥦", bottom: "8%", left: "12%", size: "2rem", delay: "1.2s" },
    { emoji: "🫑", bottom: "12%", right: "6%", size: "1.8rem", delay: "1.6s" },
    { emoji: "🧅", top: "38%", left: "2%", size: "1.6rem", delay: "2s" },
  ];

  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #DEF9EC 0%, #c2f0d8 60%, #bbebce 100%)",
      padding: "70px 0",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", background: "rgba(255,255,255,0.2)",
        top: "-200px", right: "-100px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: "300px", height: "300px",
        borderRadius: "50%", background: "rgba(255,255,255,0.15)",
        bottom: "-120px", left: "-80px", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "60px",
          alignItems: "center",
        }}>
          {/* Content */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.55)",
              color: "#1a6e43",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              marginBottom: "18px",
              backdropFilter: "blur(8px)",
            }}>
              🛒 Daily Fresh Delivery
            </div>

            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "#111827",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}>
              Stay home & get your daily<br />
              <span style={{ color: "#228955" }}>needs from our shop</span>
            </h2>

            <p style={{ color: "#374151", fontSize: "0.95rem", marginBottom: "28px" }}>
              Start your daily shopping with{" "}
              <strong style={{ color: "#228955" }}>Nest Mart</strong>{" "}
              — fresh groceries delivered fast.
            </p>

            {done ? (
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 24px",
                background: "white",
                borderRadius: "12px",
                fontWeight: 600,
                color: "#228955",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                fontSize: "0.95rem",
                marginBottom: "16px",
              }}>
                ✅ You're subscribed! Welcome to the Nest family.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: "flex",
                borderRadius: "999px",
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                background: "white",
                maxWidth: "480px",
                marginBottom: "14px",
              }}>
                <div style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "0 20px",
                }}>
                  <span style={{ color: "#9ca3af", flexShrink: 0 }}>✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    required
                    style={{
                      border: "none",
                      outline: "none",
                      background: "none",
                      fontSize: "0.9rem",
                      color: "#111827",
                      flex: 1,
                      minWidth: 0,
                      padding: "16px 0",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "#7fcfab" : "#3BB77E",
                    color: "white",
                    border: "none",
                    padding: "16px 30px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    borderRadius: "999px",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "background 0.25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {loading ? (
                    <span style={{
                      width: "16px", height: "16px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }} />
                  ) : "Subscribe"}
                </button>
              </form>
            )}

            <p style={{
              fontSize: "0.77rem",
              color: "#1a6e43",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              opacity: 0.8,
            }}>
              🔒 No spam, unsubscribe anytime. Up to 15% discount on your first order.
            </p>
          </div>

          {/* Floating veggies illustration */}
          <div style={{
            position: "relative",
            width: "280px",
            height: "280px",
            flexShrink: 0,
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              border: "2px dashed rgba(59,183,126,0.3)",
              borderRadius: "50%",
              animation: "spinSlow 20s linear infinite",
            }} />
            {veggies.map((v, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  fontSize: v.size,
                  top: v.top,
                  left: v.left,
                  right: v.right,
                  bottom: v.bottom,
                  transform: v.transform,
                  filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.12))",
                  animation: `floatY 3s ${v.delay} ease-in-out infinite`,
                }}
              >
                {v.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}