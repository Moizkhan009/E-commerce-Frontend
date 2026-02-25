import React, { useState } from "react";

const TOPICS = [
  "Visit Feedback",
  "Employer Services",
  "Billing Inquiries",
  "General Inquiries",
  "Order Support",
  "Partnership",
  "Other",
];

const contactChannels = [
  { icon: "📞", label: "Phone", value: "1900 - 888", href: "tel:1900888", color: "#3BB77E" },
  { icon: "✉️", label: "Email", value: "hello@nestmart.com", href: "mailto:hello@nestmart.com", color: "#3b82f6" },
  { icon: "📍", label: "Address", value: "205 N Michigan Ave, Chicago IL", href: null, color: "#e74c3c" },
  { icon: "🕐", label: "Hours", value: "10:00 – 18:00, Mon – Sat", href: null, color: "#f6a623" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", topic: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "13px 16px",
    border: `1.5px solid ${hasError ? "#e74c3c" : "#e5e7eb"}`,
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#111827",
    background: hasError ? "#fff8f8" : "#f9fafb",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.25s, box-shadow 0.25s",
  });

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    letterSpacing: "0.02em",
  };

  return (
    <section id="contact-form" style={{ padding: "70px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "48px",
          alignItems: "start",
        }}>

          {/* ===== LEFT SIDEBAR ===== */}
          <div style={{ position: "sticky", top: "24px" }}>
            <span style={{
              display: "inline-block",
              background: "#DEF9EC",
              color: "#228955",
              padding: "5px 14px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Get in Touch
            </span>

            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2.2rem",
              color: "#111827",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}>
              We'd love to<br /> hear from you
            </h2>

            <p style={{
              fontSize: "0.92rem",
              color: "#6b7280",
              lineHeight: 1.75,
              marginBottom: "32px",
            }}>
              Our friendly team is always ready to help. Reach out through any
              channel below or fill the form.
            </p>

            {/* Contact info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {contactChannels.map((ch) => (
                <div
                  key={ch.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    border: "1.5px solid #f3f4f6",
                    borderRadius: "12px",
                    transition: "all 0.25s",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ch.color;
                    e.currentTarget.style.background = ch.color + "08";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f3f4f6";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{
                    width: "42px", height: "42px",
                    background: ch.color + "18",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}>
                    {ch.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: "2px",
                    }}>
                      {ch.label}
                    </div>
                    {ch.href ? (
                      <a href={ch.href} style={{ fontSize: "0.86rem", fontWeight: 600, color: ch.color, textDecoration: "none" }}>
                        {ch.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "#374151" }}>
                        {ch.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 18px",
              background: "#f0faf4",
              borderRadius: "12px",
              border: "1.5px solid #bbebce",
            }}>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>
                  Average reply: ~15 minutes
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  During business hours (Mon–Sat)
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT FORM ===== */}
          <div style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            {/* Form header */}
            <div style={{ marginBottom: "32px" }}>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#3BB77E",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}>
                Contact Form
              </span>
              <h2 style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.9rem",
                color: "#111827",
                marginBottom: "4px",
              }}>
                Drop Us a Line
              </h2>
              <p style={{ fontSize: "0.82rem", color: "#9ca3af" }}>
                Required fields are marked *
              </p>
            </div>

            {/* Success state */}
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>✅</div>
                <h3 style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "1.8rem",
                  color: "#3BB77E",
                  marginBottom: "10px",
                }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto 24px" }}>
                  Thank you! Our team will get back to you within 15 minutes during business hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ firstName: "", lastName: "", email: "", phone: "", topic: "", subject: "", message: "" }); }}
                  style={{
                    background: "#3BB77E",
                    color: "white",
                    padding: "13px 28px",
                    borderRadius: "999px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Row 1 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      style={inputStyle(!!errors.firstName)}
                      onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.firstName ? "#e74c3c" : "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                    />
                    {errors.firstName && <p style={{ color: "#e74c3c", fontSize: "0.73rem", marginTop: "4px" }}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      style={inputStyle(false)}
                      onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      style={inputStyle(!!errors.email)}
                      onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.email ? "#e74c3c" : "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                    />
                    {errors.email && <p style={{ color: "#e74c3c", fontSize: "0.73rem", marginTop: "4px" }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (000) 000-0000"
                      style={inputStyle(false)}
                      onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Topic</label>
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      style={{ ...inputStyle(false), appearance: "none", cursor: "pointer" }}
                    >
                      <option value="">Select a topic...</option>
                      {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      style={inputStyle(false)}
                      onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here..."
                    style={{ ...inputStyle(!!errors.message), resize: "vertical" }}
                    onFocus={(e) => { e.target.style.borderColor = "#3BB77E"; e.target.style.boxShadow = "0 0 0 3px rgba(59,183,126,0.12)"; e.target.style.background = "#fff"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.message ? "#e74c3c" : "#e5e7eb"; e.target.style.boxShadow = "none"; e.target.style.background = "#f9fafb"; }}
                  />
                  {errors.message && <p style={{ color: "#e74c3c", fontSize: "0.73rem", marginTop: "4px" }}>{errors.message}</p>}
                  <p style={{ textAlign: "right", fontSize: "0.7rem", color: "#d1d5db", marginTop: "4px" }}>
                    {form.message.length} / 500
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: loading ? "#7fcfab" : "#3BB77E",
                    color: "white",
                    padding: "16px 36px",
                    borderRadius: "999px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    alignSelf: "flex-start",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 20px rgba(59,183,126,0.3)",
                    transition: "all 0.25s",
                    minWidth: "170px",
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: "16px", height: "16px",
                        border: "2px solid rgba(255,255,255,0.35)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }} />
                      Sending...
                    </>
                  ) : (
                    <> ✉️ Send Message </>
                  )}
                </button>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}