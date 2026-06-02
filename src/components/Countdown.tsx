import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-07-30T09:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

function Tile({ value, label, highlight = false }: { value: number; label: string; highlight?: boolean }) {
  return (
    <motion.div
      key={value}
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.32 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.7rem" }}
    >
      <div
        className={highlight ? "pulse-ring" : ""}
        style={{
          width: "6.5rem", height: "6.5rem",
          borderRadius: "1.25rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff",
          border: `1.5px solid ${highlight ? "rgba(212,180,131,0.6)" : "var(--wd-border)"}`,
          boxShadow: highlight ? "0 4px 24px rgba(212,180,131,0.2)" : "var(--wd-shadow)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "35%",
          background: "linear-gradient(to bottom, rgba(212,180,131,0.05), transparent)",
          borderRadius: "1.25rem 1.25rem 0 0",
        }} />
        <span style={{ fontFamily: "var(--wd-serif)", fontSize: "2.6rem", fontWeight: 300, color: "var(--wd-text)", position: "relative", zIndex: 1 }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)" }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)", textAlign: "center" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Counting down to forever
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          The Big Day
        </motion.h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <Tile value={time.days}    label="Days"    highlight />
          <Tile value={time.hours}   label="Hours"   />
          <Tile value={time.minutes} label="Minutes" />
          <Tile value={time.seconds} label="Seconds" highlight />
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ fontFamily: "var(--wd-serif)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--wd-text-muted)", marginTop: "2.5rem" }}
        >
          Thursday, 30th July 2026 · Avenra Gardens Hotel, Negombo, Sri Lanka
        </motion.p>
      </div>
    </div>
  );
}
