import { motion } from "framer-motion";

const couple = [
  {
    role: "The Groom",
    name: "Nimantha",
    img: "https://picsum.photos/seed/groom1/600/700",
    desc: "A gentle soul with a warm heart, Nimantha brings laughter and light into every room he enters. His love for Binasha is as steady as the stars.",
    facts: [
      { icon: "🍕", label: "Favourite Food", value: "Pizza & Kottu" },
      { icon: "🌏", label: "Favourite Place", value: "Ella, Sri Lanka" },
      { icon: "💬", label: "Favourite Quote", value: "\"Love is not finding someone to live with — it's finding someone you can't live without.\"" },
    ],
  },
  {
    role: "The Bride",
    name: "Binasha",
    img: "https://picsum.photos/seed/bride1/600/700",
    desc: "Graceful, radiant, and endlessly kind — Binasha lights up the world with her smile. She found her forever in Nimantha's eyes.",
    facts: [
      { icon: "🍰", label: "Favourite Food", value: "Chocolate Cake & String Hoppers" },
      { icon: "🌺", label: "Favourite Place", value: "Mirissa Beach" },
      { icon: "💬", label: "Favourite Quote", value: "\"A happy marriage is a long conversation that always seems too short.\"" },
    ],
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 48 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" as const } }),
};

export default function CoupleShowcase() {
  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          The happy couple
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Meet the Couple
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
          {couple.map((person, i) => (
            <motion.div
              key={i}
              className="couple-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div style={{ overflow: "hidden" }}>
                <img src={person.img} alt={person.name} className="couple-card-img" loading="lazy" />
              </div>

              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.4rem" }}>
                  {person.role}
                </p>
                <h3 style={{ fontFamily: "var(--wd-script)", fontSize: "2.5rem", color: "var(--wd-text)", marginBottom: "0.75rem", lineHeight: 1 }}>
                  {person.name}
                </h3>
                <div className="gold-divider gold-divider-white" style={{ margin: "0 0 1.25rem" }} />
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  {person.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {person.facts.map((f, j) => (
                    <div key={j} style={{
                      background: "var(--wd-bg)",
                      border: "1px solid var(--wd-border)",
                      borderRadius: "0.75rem",
                      padding: "0.75rem 1rem",
                      display: "flex", gap: "0.75rem", alignItems: "flex-start",
                    }}>
                      <span style={{ fontSize: "1.1rem", lineHeight: 1, marginTop: "0.05rem", flexShrink: 0 }}>{f.icon}</span>
                      <div>
                        <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.2rem" }}>
                          {f.label}
                        </p>
                        <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.82rem", color: "var(--wd-text)", lineHeight: 1.55 }}>
                          {f.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
