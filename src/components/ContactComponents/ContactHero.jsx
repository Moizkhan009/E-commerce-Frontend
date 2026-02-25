import React from "react";

const services = [
  {
    num: "01",
    title: "Visit Feedback",
    desc: "Share your shopping experience and help us improve our services for everyone.",
    color: "#3BB77E",
    bg: "#f0faf4",
    icon: "💬",
  },
  {
    num: "02",
    title: "Employer Services",
    desc: "Career opportunities and employment inquiries for joining our growing team.",
    color: "#f6a623",
    bg: "#fff8ee",
    icon: "💼",
  },
  {
    num: "03",
    title: "Billing Inquiries",
    desc: "Questions about payments, invoices or subscription billing management.",
    color: "#3b82f6",
    bg: "#eff6ff",
    icon: "🧾",
  },
  {
    num: "04",
    title: "General Inquiries",
    desc: "Any other questions or concerns — our team is always happy to help.",
    color: "#e74c3c",
    bg: "#fff5f5",
    icon: "📋",
  },
];

const styles = {
  section: {
    padding: "70px 0",
    background: "linear-gradient(135deg, #f8fffe 0%, #f0faf4 50%, #fff 100%)",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#DEF9EC",
    color: "#228955",
    padding: "6px 16px",
    borderRadius: "999px",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "18px",
  },
  heading: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(2rem, 3.5vw, 3rem)",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.15,
    marginBottom: "16px",
  },
  highlight: {
    color: "#3BB77E",
  },
  subtext: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: 1.75,
    marginBottom: "32px",
    maxWidth: "420px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    border: "1.5px solid #bbebce",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#f0faf4",
    marginBottom: "32px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 8px",
    borderRight: "1px solid #bbebce",
  },
  statVal: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#3BB77E",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.68rem",
    color: "#6b7280",
    marginTop: "4px",
    textAlign: "center",
    fontWeight: 500,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "#3BB77E",
    color: "#fff",
    padding: "14px 30px",
    borderRadius: "999px",
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(59,183,126,0.3)",
    transition: "all 0.25s",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  card: {
    background: "#fff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px 20px",
    cursor: "pointer",
    transition: "all 0.25s",
    position: "relative",
  },
  cardIconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    marginBottom: "12px",
  },
  cardNum: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    opacity: 0.45,
    marginBottom: "4px",
  },
  cardTitle: {
    fontSize: "0.98rem",
    fontWeight: 700,
    marginBottom: "8px",
  },
  cardDesc: {
    fontSize: "0.81rem",
    color: "#6b7280",
    lineHeight: 1.6,
  },
};

const STATS = [
  { value: "24/7", label: "Support" },
  { value: "<15m", label: "Response" },
  { value: "99%", label: "Satisfaction" },
  { value: "50k+", label: "Customers" },
];

export default function ContactHeroSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Left */}
        <div>
          <div style={styles.badge}>⚡ How can we help you?</div>
          <h1 style={styles.heading}>
            Let us know how <br />
            <span style={styles.highlight}>we can help you</span>
          </h1>
          <p style={styles.subtext}>
            Our dedicated support team is here around the clock. From billing
            questions to feedback — reach out and we'll make it right.
          </p>

          <div style={styles.statsRow}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  ...styles.statItem,
                  borderRight: i === STATS.length - 1 ? "none" : "1px solid #bbebce",
                }}
              >
                <span style={styles.statVal}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <a href="#contact-form" style={styles.ctaBtn}>
            ✉️ Send Us a Message
          </a>
        </div>

        {/* Right - Cards */}
        <div style={styles.cardsGrid}>
          {services.map((s) => (
            <div
              key={s.num}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = s.color;
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ ...styles.cardIconWrap, background: s.bg }}>
                {s.icon}
              </div>
              <div style={{ ...styles.cardNum, color: s.color }}>{s.num}</div>
              <div style={{ ...styles.cardTitle, color: s.color }}>{s.title}</div>
              <p style={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}