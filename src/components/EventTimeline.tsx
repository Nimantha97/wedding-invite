import { motion } from "framer-motion";

const events = [
  { time: "9:00 AM",  icon: "🚗", title: "Guest Arrival",      desc: "Guests are welcomed at the entrance with refreshments." },
  { time: "9:30 AM",  icon: "📋", title: "Registration",        desc: "Check in and collect your wedding programme." },
  { time: "10:00 AM", icon: "💍", title: "Ceremony",            desc: "The sacred exchange of vows and rings at Centurium Ballroom." },
  { time: "11:00 AM", icon: "📸", title: "Photography",         desc: "Couple portraits and group photographs on the garden grounds." },
  { time: "12:00 PM", icon: "🥂", title: "Cocktail Reception",  desc: "Drinks, canapés, and mingling in the garden terrace." },
  { time: "1:00 PM",  icon: "🍽️", title: "Wedding Banquet",    desc: "A curated multi-course dinner for all our beloved guests." },
  { time: "3:00 PM",  icon: "🎂", title: "Cake Cutting",        desc: "Witness the sweet tradition with the happy couple." },
  { time: "3:30 PM",  icon: "💃", title: "First Dance",         desc: "Nimantha & Binasha take to the floor for their first dance." },
  { time: "4:00 PM",  icon: "🎉", title: "Celebration",         desc: "Dance, music, and memories to carry in your heart forever." },
];

export default function EventTimeline() {
  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner-md">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          The big day schedule
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Day Timeline
        </motion.h2>

        <div style={{ position: "relative" }}>
          {events.map((ev, i) => (
            <motion.div
              key={i}
              className="event-item"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{
                background: "var(--wd-bg-card)",
                border: "1px solid var(--wd-border)",
                borderRadius: "1rem",
                padding: "1.1rem 1.4rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                boxShadow: "var(--wd-shadow)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,180,131,0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--wd-shadow-lg)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--wd-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--wd-shadow)";
                }}
              >
                <span style={{ fontSize: "1.4rem", lineHeight: 1, flexShrink: 0, marginTop: "0.1rem" }}>{ev.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--wd-gold-dark)", fontWeight: 500 }}>
                      {ev.time}
                    </span>
                    <span style={{ fontFamily: "var(--wd-serif)", fontSize: "1.1rem", fontWeight: 300, color: "var(--wd-text)" }}>
                      {ev.title}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.82rem", color: "var(--wd-text-muted)", lineHeight: 1.65 }}>
                    {ev.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
