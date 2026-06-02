import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props { guestName: string; }

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left:     `${(i * 5.1) % 100}%`,
  size:     2 + (i % 4),
  duration: 9 + (i % 7),
  delay:    (i * 0.65) % 9,
  opacity:  0.18 + (i % 5) * 0.07,
}));

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  left:     `${(i * 9.7) % 100}%`,
  w:        7 + (i % 5) * 2,
  h:        9 + (i % 4) * 3,
  duration: 9 + (i % 6),
  delay:    (i * 1.3) % 11,
}));

export default function Hero({ guestName }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => { el.style.transform = `translateY(${window.scrollY * 0.22}px)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(165deg, #EFF0EB 0%, #F7F6F2 55%, #E8EDE8 100%)",
    }}>
      {/* Parallax radial glow */}
      <div ref={bgRef} style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 75% 55% at 50% 38%, rgba(139,178,170,0.18) 0%, transparent 70%)",
      }} />

      {/* Gold particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="particle" style={{
          left: p.left, bottom: "-20px",
          width: p.size, height: p.size,
          background: `rgba(212,180,131,${p.opacity})`,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}

      {/* Petals */}
      {PETALS.map((p, i) => (
        <span key={i} className="petal" style={{
          left: p.left, width: p.w, height: p.h,
          background: `radial-gradient(ellipse at 40% 40%, rgba(212,180,131,0.55) 60%, rgba(144,195,167,0.3))`,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}

      {/* Decorative rings */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[560, 400, 260].map((s, i) => (
          <div key={i} style={{
            position: "absolute", width: s, height: s, borderRadius: "50%",
            border: `1px solid rgba(212,180,131,${0.07 + i * 0.05})`,
          }} />
        ))}
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "calc(var(--wd-nav-h) + 4rem) 1.25rem 4rem", maxWidth: "46rem", width: "100%" }}>

        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}
        >
          <div style={{ height: 1, width: 44, background: "linear-gradient(to right, transparent, var(--wd-gold))" }} />
          <span style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--wd-accent)" }}>
            You're Invited
          </span>
          <div style={{ height: 1, width: 44, background: "linear-gradient(to left, transparent, var(--wd-gold))" }} />
        </motion.div>

        {guestName !== "Dear Friend" && (
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text-muted)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}
          >
            Dear {guestName},
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.25 }}
          className="shimmer-text"
          style={{ fontFamily: "var(--wd-script)", fontSize: "clamp(3.5rem, 11vw, 6.5rem)", fontWeight: 400, lineHeight: 1.05, marginBottom: "0.1rem" }}
        >
          Nimantha
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", margin: "0.35rem 0" }}
        >
          <div style={{ height: 1, flex: 1, maxWidth: 90, background: "linear-gradient(to right, transparent, var(--wd-gold))" }} />
          <span style={{ fontFamily: "var(--wd-serif)", fontSize: "1.5rem", color: "var(--wd-gold-dark)", fontStyle: "italic" }}>&amp;</span>
          <div style={{ height: 1, flex: 1, maxWidth: 90, background: "linear-gradient(to left, transparent, var(--wd-gold))" }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.45 }}
          className="shimmer-text"
          style={{ fontFamily: "var(--wd-script)", fontSize: "clamp(3.5rem, 11vw, 6.5rem)", fontWeight: 400, lineHeight: 1.05, marginBottom: "1.5rem" }}
        >
          Binasha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.85 }}
          style={{ fontFamily: "var(--wd-sans)", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.6rem" }}
        >
          are getting married
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.05 }}
          style={{ fontFamily: "var(--wd-serif)", fontSize: "1rem", color: "var(--wd-text-muted)", letterSpacing: "0.04em", fontStyle: "italic" }}
        >
          Thursday, 30th July 2026 · Avenra Gardens Hotel, Negombo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}
        >
          <a href="#rsvp" className="wd-btn wd-btn-solid"><span>RSVP Now</span></a>
          <a href="#story" className="wd-btn"><span>Our Story</span></a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            style={{
              width: 24, height: 38, borderRadius: 12,
              border: "1.5px solid rgba(212,180,131,0.5)",
              display: "flex", justifyContent: "center", paddingTop: 6,
            }}
          >
            <div style={{ width: 3, height: 8, borderRadius: 2, background: "var(--wd-gold)" }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
