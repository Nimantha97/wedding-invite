import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left:     `${(i * 5.6) % 100}%`,
  size:     2 + (i % 4),
  duration: 9 + (i % 6),
  delay:    (i * 0.7) % 8,
  opacity:  0.2 + (i % 4) * 0.08,
}));

interface Props { onOpen: () => void; }

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 800);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "linear-gradient(145deg, #EFF0EB 0%, #F7F6F2 50%, #E8EDE8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Floating gold particles */}
          {PARTICLES.map((p, i) => (
            <div key={i} className="particle" style={{
              left: p.left, bottom: "-20px",
              width: p.size, height: p.size,
              background: `rgba(212,180,131,${p.opacity})`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }} />
          ))}

          {/* Decorative rings */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            {[600, 440, 300].map((s, i) => (
              <div key={i} style={{
                position: "absolute", width: s, height: s,
                borderRadius: "50%",
                border: `1px solid rgba(212,180,131,${0.08 + i * 0.05})`,
              }} />
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem" }}>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "2rem" }}
            >
              Together With Their Families
            </motion.p>

            {/* Envelope SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              style={{ position: "relative", display: "inline-block", marginBottom: "2.5rem" }}
            >
              {/* Envelope body */}
              <svg width="260" height="180" viewBox="0 0 260 180" fill="none" style={{ filter: "drop-shadow(0 12px 32px rgba(46,58,54,0.12))" }}>
                <rect x="2" y="2" width="256" height="176" rx="10" fill="white" stroke="rgba(212,180,131,0.4)" strokeWidth="1.5"/>
                {/* Envelope bottom-left triangle */}
                <polygon points="2,178 130,100 2,40" fill="rgba(212,180,131,0.12)" stroke="rgba(212,180,131,0.3)" strokeWidth="1"/>
                {/* Envelope bottom-right triangle */}
                <polygon points="258,178 130,100 258,40" fill="rgba(212,180,131,0.12)" stroke="rgba(212,180,131,0.3)" strokeWidth="1"/>
                {/* Envelope bottom flap */}
                <polygon points="2,178 258,178 130,100" fill="rgba(139,178,170,0.08)" stroke="rgba(212,180,131,0.35)" strokeWidth="1"/>
                {/* Envelope top flap — animates open */}
                <motion.polygon
                  points="2,2 258,2 130,90"
                  fill="rgba(235,230,215,0.95)"
                  stroke="rgba(212,180,131,0.4)"
                  strokeWidth="1"
                  style={{ transformOrigin: "130px 2px" }}
                  animate={phase === "opening" ? { rotateX: -160 } : { rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
                />
              </svg>

              {/* Wax seal */}
              <motion.div
                className="wax-seal"
                style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                animate={phase === "opening" ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : {
                  boxShadow: ["0 4px 24px rgba(212,180,131,0.4)", "0 4px 40px rgba(212,180,131,0.8)", "0 4px 24px rgba(212,180,131,0.4)"],
                }}
                transition={phase === "opening"
                  ? { duration: 0.6, delay: 0, ease: "easeIn" }
                  : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }
                onClick={handleOpen}
              >
                <span style={{ fontFamily: "var(--wd-serif)", fontSize: "1.1rem", fontWeight: 600, color: "#fff", letterSpacing: "0.05em" }}>
                  N♥B
                </span>
              </motion.div>
            </motion.div>

            {/* Card slides out */}
            <AnimatePresence>
              {phase === "opening" && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(212,180,131,0.4)",
                    borderRadius: "0.875rem",
                    padding: "2rem 2.5rem",
                    boxShadow: "0 20px 60px rgba(46,58,54,0.14)",
                    maxWidth: "320px",
                    margin: "0 auto",
                  }}
                >
                  <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.75rem" }}>
                    Request the pleasure of your company
                  </p>
                  <p style={{ fontFamily: "var(--wd-serif)", fontSize: "0.9rem", fontWeight: 300, color: "var(--wd-text-muted)", marginBottom: "0.5rem" }}>
                    At the wedding of
                  </p>
                  <p style={{ fontFamily: "var(--wd-script)", fontSize: "2.4rem", color: "var(--wd-text)", lineHeight: 1.2 }}>
                    Nimantha
                  </p>
                  <p style={{ fontFamily: "var(--wd-serif)", fontSize: "0.8rem", fontStyle: "italic", color: "var(--wd-gold-dark)", margin: "0.2rem 0" }}>&amp;</p>
                  <p style={{ fontFamily: "var(--wd-script)", fontSize: "2.4rem", color: "var(--wd-text)", lineHeight: 1.2 }}>
                    Binasha
                  </p>
                  <div className="gold-divider gold-divider-white" style={{ margin: "1rem auto" }} />
                  <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--wd-text-muted)" }}>
                    30 July 2026
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prompt */}
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              >
                <p style={{ fontFamily: "var(--wd-serif)", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 300, color: "var(--wd-text)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
                  You have received an invitation
                </p>
                <motion.button
                  className="wd-btn wd-btn-solid"
                  onClick={handleOpen}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Open Invitation</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
