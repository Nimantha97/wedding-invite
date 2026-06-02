import { useState } from "react";
import { motion } from "framer-motion";

const URL = "https://mywedding.pages.dev";
const TEXT = "You're invited to celebrate the wedding of Nimantha & Binasha on 30 July 2026! 💍";

const buttons = [
  {
    label: "WhatsApp",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: `https://wa.me/?text=${encodeURIComponent(TEXT + " " + URL)}`,
  },
  {
    label: "Facebook",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`,
  },
  {
    label: "Copy Link",
    color: "var(--wd-accent)",
    bg: "rgba(127,169,156,0.1)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
    href: null,
  },
];

export default function SocialShare() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="wd-section-sm" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner-sm">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Spread the joy
        </motion.p>
        <motion.h2 className="wd-heading" style={{ marginBottom: "2rem" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Share Our Invitation
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          {buttons.map((btn, i) =>
            btn.href ? (
              <motion.a
                key={i}
                href={btn.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.8rem 1.5rem",
                  background: btn.bg,
                  border: `1px solid ${btn.color}33`,
                  borderRadius: "9999px",
                  color: btn.color,
                  fontFamily: "var(--wd-sans)", fontSize: "0.75rem", fontWeight: 500,
                  textDecoration: "none",
                  transition: "box-shadow 0.25s",
                  boxShadow: "var(--wd-shadow)",
                }}
              >
                {btn.icon}
                {btn.label}
              </motion.a>
            ) : (
              <motion.button
                key={i}
                onClick={handleCopy}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.8rem 1.5rem",
                  background: copied ? "rgba(144,195,167,0.15)" : btn.bg,
                  border: `1px solid ${copied ? "var(--wd-secondary)" : btn.color}55`,
                  borderRadius: "9999px",
                  color: copied ? "var(--wd-secondary)" : btn.color,
                  fontFamily: "var(--wd-sans)", fontSize: "0.75rem", fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow: "var(--wd-shadow)",
                }}
              >
                {copied ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : btn.icon}
                {copied ? "Copied!" : btn.label}
              </motion.button>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}
