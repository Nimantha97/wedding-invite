import { motion } from "framer-motion";

const PLAYLIST_ID = "37i9dQZF1DX0XUsuxWHRQd";

export default function SpotifyEmbed() {
  return (
    <div className="wd-section" style={{ background: "var(--wd-bg)" }}>
      <div className="wd-inner-md">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Our soundtrack
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Wedding Playlist
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            borderRadius: "1.25rem", overflow: "hidden",
            border: "1px solid var(--wd-border)",
            boxShadow: "var(--wd-shadow-lg)",
          }}
        >
          <iframe
            title="Wedding Playlist"
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
            width="100%"
            height="352"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
