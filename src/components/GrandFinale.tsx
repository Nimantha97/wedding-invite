import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const LANTERNS = Array.from({ length: 14 }, (_, i) => ({
  left:     `${(i * 7.3) % 95}%`,
  size:     24 + (i % 5) * 8,
  duration: 12 + (i % 8),
  delay:    (i * 0.9) % 10,
  hue:      i % 3 === 0 ? "#D4B483" : i % 3 === 1 ? "#90C3A7" : "#F7C98A",
}));

const FIREWORKS = Array.from({ length: 8 }, (_, i) => ({
  left:     `${15 + (i * 11) % 70}%`,
  top:      `${10 + (i * 8) % 45}%`,
  size:     60 + (i % 4) * 30,
  duration: 1.2 + (i % 3) * 0.4,
  delay:    0.3 + (i * 0.5) % 3,
  color:    i % 3 === 0 ? "#D4B483" : i % 3 === 1 ? "rgba(139,178,170,0.8)" : "#E8C97A",
}));

export default function GrandFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Repeat fireworks
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; };
    const particles: Particle[] = [];
    const colors = ["#D4B483", "#90C3A7", "#F7C98A", "#8BB2AA", "#fff"];

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, maxLife: 60 + Math.random() * 40,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 80 === 0) burst(Math.random() * canvas.width, 80 + Math.random() * 180);
      frame++;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.04;
        p.life = Math.max(0, p.life - 1 / p.maxLife);
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };
    let rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="wd-section"
      style={{
        background: "linear-gradient(180deg, #1B2B26 0%, #0D1A15 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Canvas fireworks */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Lanterns */}
      {LANTERNS.map((l, i) => (
        <div
          key={i}
          className="lantern"
          style={{
            left: l.left, bottom: "-60px",
            width: l.size, height: l.size * 1.3,
            background: `radial-gradient(ellipse at 50% 40%, ${l.hue}cc, ${l.hue}44)`,
            boxShadow: `0 0 ${l.size}px ${l.hue}66`,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}

      {/* Firework rings */}
      {FIREWORKS.map((f, i) => (
        <motion.div
          key={i}
          className="firework-ring"
          style={{
            left: f.left, top: f.top,
            width: f.size, height: f.size,
            borderColor: f.color,
            marginLeft: -f.size / 2,
            marginTop: -f.size / 2,
          }}
          animate={inView ? {
            scale: [0, 1],
            opacity: [1, 0],
          } : {}}
          transition={{
            delay: f.delay,
            duration: f.duration,
            repeat: Infinity,
            repeatDelay: 2 + i * 0.3,
          }}
        />
      ))}

      {/* Stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          style={{
            position: "absolute",
            left: `${(i * 2.5) % 100}%`,
            top: `${(i * 3.7) % 60}%`,
            width: 2, height: 2,
            borderRadius: "50%",
            background: "#fff",
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.15) % 4, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "2rem" }}
        >
          <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(212,180,131,0.7)", marginBottom: "1rem" }}>
            Thank You for Celebrating With Us
          </p>
          <h2 style={{ fontFamily: "var(--wd-script)", fontSize: "clamp(3rem, 10vw, 5.5rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Nimantha
          </h2>
          <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.8rem", fontStyle: "italic", color: "var(--wd-gold)", margin: "0.2rem 0" }}>
            ❤️
          </p>
          <h2 style={{ fontFamily: "var(--wd-script)", fontSize: "clamp(3rem, 10vw, 5.5rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: "2rem" }}>
            Binasha
          </h2>
        </motion.div>

        {/* Silhouette couple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{ fontSize: "5rem", marginBottom: "1.5rem", filter: "drop-shadow(0 0 20px rgba(212,180,131,0.4))" }}
        >
          👫
        </motion.div>

        <motion.div
          className="gold-divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{ marginBottom: "1.5rem" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{ fontFamily: "var(--wd-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,180,131,0.7)" }}
        >
          30 · July · 2026 · Avenra Gardens Hotel · Negombo
        </motion.p>
      </div>
    </div>
  );
}
