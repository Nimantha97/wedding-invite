import { motion } from "framer-motion";

const milestones = [
  { year: "2020", title: "First Meeting",      desc: "A chance encounter that neither of us planned — fate had other ideas, and we're so glad it did." },
  { year: "2021", title: "First Date",         desc: "A quiet evening that turned into hours of conversation. We both knew something special had begun." },
  { year: "2022", title: "Made It Official",   desc: "We stopped pretending we were 'just friends' and admitted what everyone else already knew." },
  { year: "2023", title: "First Trip Together", desc: "Exploring new places together and realising that wherever we go, home is each other." },
  { year: "2024", title: "Met the Families",   desc: "Two families, one table, and a whole lot of laughter. They loved each other instantly." },
  { year: "2025", title: "The Proposal",       desc: "Under a sky full of stars, with a ring and a question that changed everything forever." },
  { year: "2026", title: "Forever Begins",     desc: "And now we invite you to witness the start of our greatest adventure together." },
];

export default function OurStory() {
  return (
    <div className="wd-section" style={{ background: "var(--wd-bg)" }}>
      <div className="wd-inner-md">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          How it all began
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Our Story
        </motion.h2>

        <div className="timeline-wrap">
          <div className="timeline-line" />
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className={`timeline-row ${i % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-year">{m.year}</span>
                <h3 className="timeline-title">{m.title}</h3>
                <p className="timeline-desc">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
