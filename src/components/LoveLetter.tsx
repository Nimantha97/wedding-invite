import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "To every single person who is reading this,",
  "",
  "We didn't choose the day we'd fall in love,",
  "but we choose, every single day, to stay in it.",
  "",
  "You being here — whether across the table or across the ocean —",
  "means the world to us. Your love, your laughter,",
  "your presence has shaped the people we are today.",
  "",
  "As we begin this new chapter, we carry you with us.",
  "Thank you for being part of our story.",
  "",
  "With all our love,",
];

const lineVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.18, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner-sm" ref={ref}>
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          From our hearts
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          A Letter to You
        </motion.h2>

        {/* Paper */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "#fff",
            border: "1px solid rgba(212,180,131,0.35)",
            borderRadius: "1.25rem",
            padding: "3rem 2.5rem 2.5rem",
            boxShadow: "0 20px 60px rgba(46,58,54,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative corner */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 120, height: 120,
            background: "linear-gradient(225deg, rgba(212,180,131,0.12) 0%, transparent 60%)",
            borderBottomLeftRadius: "120px",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            width: 100, height: 100,
            background: "linear-gradient(45deg, rgba(139,178,170,0.1) 0%, transparent 60%)",
            borderTopRightRadius: "100px",
          }} />

          {/* Lines */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {lines.map((line, i) =>
              line === "" ? (
                <div key={i} style={{ height: "0.9rem" }} />
              ) : (
                <motion.p
                  key={i}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  style={{
                    fontFamily: i >= lines.length - 2 ? "var(--wd-script)" : "var(--wd-sans)",
                    fontSize: i >= lines.length - 2 ? "1.6rem" : "0.92rem",
                    color: i === 0 ? "var(--wd-accent)" : "var(--wd-text)",
                    lineHeight: 1.8,
                    fontWeight: i >= lines.length - 2 ? 400 : 300,
                  }}
                >
                  {line}
                </motion.p>
              )
            )}

            {/* Signature */}
            <motion.div
              custom={lines.length}
              variants={lineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ marginTop: "1rem" }}
            >
              <p style={{ fontFamily: "var(--wd-script)", fontSize: "2.2rem", color: "var(--wd-text)", lineHeight: 1.2 }}>
                Nimantha &amp; Binasha
              </p>
              <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--wd-text-muted)", marginTop: "0.25rem" }}>
                30 · 07 · 2026
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
