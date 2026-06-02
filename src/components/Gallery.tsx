import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category = "All" | "Pre Shoot" | "Engagement" | "Family" | "Memories";

const photos: { src: string; thumb: string; cat: Category }[] = [
  { src: "https://picsum.photos/seed/w1/800/1000",  thumb: "https://picsum.photos/seed/w1/400/500",  cat: "Pre Shoot"  },
  { src: "https://picsum.photos/seed/w2/800/600",   thumb: "https://picsum.photos/seed/w2/400/300",  cat: "Engagement" },
  { src: "https://picsum.photos/seed/w3/800/800",   thumb: "https://picsum.photos/seed/w3/400/400",  cat: "Family"     },
  { src: "https://picsum.photos/seed/w4/800/1000",  thumb: "https://picsum.photos/seed/w4/400/500",  cat: "Pre Shoot"  },
  { src: "https://picsum.photos/seed/w5/800/600",   thumb: "https://picsum.photos/seed/w5/400/300",  cat: "Memories"   },
  { src: "https://picsum.photos/seed/w6/800/800",   thumb: "https://picsum.photos/seed/w6/400/400",  cat: "Engagement" },
  { src: "https://picsum.photos/seed/w7/800/1000",  thumb: "https://picsum.photos/seed/w7/400/500",  cat: "Family"     },
  { src: "https://picsum.photos/seed/w8/800/600",   thumb: "https://picsum.photos/seed/w8/400/300",  cat: "Memories"   },
];

const CATS: Category[] = ["All", "Pre Shoot", "Engagement", "Family", "Memories"];

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const [index, setIndex]   = useState(-1);

  const filtered = active === "All" ? photos : photos.filter(p => p.cat === active);

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Captured moments
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Our Gallery
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}
        >
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "var(--wd-sans)", fontSize: "0.6rem", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "0.5rem 1.2rem", borderRadius: "9999px", cursor: "pointer",
                border: `1px solid ${active === cat ? "var(--wd-gold)" : "var(--wd-border)"}`,
                background: active === cat ? "var(--wd-gold)" : "#fff",
                color: active === cat ? "#fff" : "var(--wd-text-muted)",
                transition: "all 0.25s",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.src}
                className="gallery-item"
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                onClick={() => setIndex(photos.indexOf(p))}
              >
                <img src={p.thumb} alt={`Photo ${i + 1}`} loading="lazy" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          style={{ fontFamily: "var(--wd-sans)", fontSize: "0.75rem", color: "var(--wd-text-muted)", textAlign: "center", marginTop: "1.5rem" }}
        >
          Click any photo to view full size
        </motion.p>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map(p => ({ src: p.src }))}
      />
    </div>
  );
}
