import { motion } from "framer-motion";

const details = [
  { icon: "📅", label: "Date",       value: "Thursday, 30th July 2026" },
  { icon: "⏰", label: "Time",       value: "9:00 AM — Ceremony  ·  12:00 PM — Reception" },
  { icon: "🏛️", label: "Venue",      value: "Avenra Gardens Hotel, Negombo" },
  { icon: "✨", label: "Hall",        value: "Centurium Ballroom" },
  { icon: "👗", label: "Dress Code", value: "Formal Attire — Emerald, Gold & Ivory" },
];

const calendarUrl = [
  "https://calendar.google.com/calendar/render?action=TEMPLATE",
  "&text=Nimantha+%26+Binasha+Wedding",
  "&dates=20260730T030000Z/20260730T120000Z",
  "&details=Wedding+of+Nimantha+%26+Binasha+at+Avenra+Gardens+Hotel",
  "&location=Avenra+Gardens+Hotel,+Negombo,+Sri+Lanka",
].join("");

export default function VenueDetails() {
  return (
    <div className="wd-section" style={{ background: "var(--wd-bg)" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Mark your calendar
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Event Details
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {details.map((d, i) => (
            <motion.div
              key={i}
              className="wd-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
            >
              <span style={{ fontSize: "1.4rem", lineHeight: 1, marginTop: "0.1rem", flexShrink: 0 }}>{d.icon}</span>
              <div>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.3rem" }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text)", lineHeight: 1.65 }}>
                  {d.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}
        >
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="wd-btn wd-btn-solid"
          >
            <span>📅 Add to Calendar</span>
          </a>
          <a
            href="https://maps.google.com/?q=Avenra+Gardens+Hotel+Negombo"
            target="_blank"
            rel="noreferrer"
            className="wd-btn wd-btn-primary"
          >
            <span>📍 Get Directions</span>
          </a>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: "1.25rem", overflow: "hidden",
            border: "1px solid var(--wd-border)",
            boxShadow: "var(--wd-shadow-lg)",
          }}
        >
          <iframe
            title="Avenra Gardens Hotel Negombo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d79.8358!3d7.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ef9b5b5b5b5b%3A0x0!2sAvenra+Garden+Hotel%2C+Negombo!5e0!3m2!1sen!2slk!4v1"
            width="100%"
            height="340"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}
