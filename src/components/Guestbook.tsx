import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitGuestbook, fetchGuestbook } from "../lib/api";

interface Message { name: string; relation: string; message: string; rotate: number; }

const SEED_MESSAGES: Message[] = [
  { name: "Kavindra & Dilani",  relation: "Best Friends",  message: "Wishing you both a lifetime of laughter, love and beautiful memories. So proud of you both! 💛",     rotate: -3 },
  { name: "Uncle Prasad",       relation: "Family",        message: "May your home always be filled with warmth and your hearts with joy. Congratulations dear children!", rotate: 2  },
  { name: "Sachini",            relation: "School Friend", message: "I've watched this love story unfold — and it's even more magical in person. Love you both! 🌸",        rotate: -1 },
  { name: "Roshan & Maneesha",  relation: "Colleagues",    message: "The office will never be the same without Nimantha's smile. But we know why he's smiling now! 🥂",    rotate: 3  },
];

const ROTATIONS = [-4, 2, -2, 4, -3, 1, -1, 3];

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [form, setForm]         = useState({ name: "", relation: "", message: "" });
  const [status, setStatus]     = useState<"idle" | "sending" | "success" | "error">("idle");

  // Load approved messages from Sheets on mount
  useEffect(() => {
    fetchGuestbook()
      .then((data: { name: string; relation: string; message: string }[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const loaded: Message[] = data.map((m, i) => ({
          ...m,
          rotate: ROTATIONS[i % ROTATIONS.length],
        }));
        setMessages(loaded);
      })
      .catch(() => {}); // keep seed messages on error
  }, []);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      await submitGuestbook(form);
      setStatus("success");
      setForm({ name: "", relation: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg)" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Leave your mark
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Digital Guestbook
        </motion.h2>

        {/* Polaroid wall */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                className="polaroid"
                style={{ transform: `rotate(${m.rotate}deg)` }}
                initial={{ opacity: 0, scale: 0.8, rotate: m.rotate - 10 }}
                animate={{ opacity: 1, scale: 1, rotate: m.rotate }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
              >
                <div style={{
                  background: "linear-gradient(135deg, rgba(139,178,170,0.15), rgba(212,180,131,0.1))",
                  height: "90px", borderRadius: "1px", marginBottom: "0.75rem",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem",
                }}>
                  💌
                </div>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.82rem", color: "var(--wd-text)", lineHeight: 1.6, marginBottom: "0.75rem", fontStyle: "italic" }}>
                  "{m.message}"
                </p>
                <div style={{ borderTop: "1px solid rgba(46,58,54,0.08)", paddingTop: "0.5rem" }}>
                  <p style={{ fontFamily: "var(--wd-script)", fontSize: "1.3rem", color: "var(--wd-text)" }}>
                    {m.name}
                  </p>
                  {m.relation && (
                    <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wd-text-muted)", marginTop: "0.15rem" }}>
                      {m.relation}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Submit form */}
        <motion.div
          className="wd-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem" }}
        >
          <h3 style={{ fontFamily: "var(--wd-serif)", fontSize: "1.6rem", fontWeight: 300, color: "var(--wd-text)", textAlign: "center", marginBottom: "0.5rem" }}>
            Add Your Wishes
          </h3>
          <div className="gold-divider gold-divider-white" style={{ marginBottom: "1.75rem" }} />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "1.5rem 0" }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🌸</div>
                <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.4rem", fontWeight: 300, color: "var(--wd-text)" }}>
                  Thank you for your wishes!
                </p>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.8rem", color: "var(--wd-text-muted)", marginTop: "0.5rem" }}>
                  Your message will appear after approval.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.4rem" }}>
                      Your Name *
                    </label>
                    <input required className="wd-input" value={form.name} onChange={set("name")} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.4rem" }}>
                      Relationship
                    </label>
                    <select className="wd-input" value={form.relation} onChange={set("relation")} style={{ cursor: "pointer" }}>
                      <option value="">Select…</option>
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="School Friend">School Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.4rem" }}>
                    Your Message *
                  </label>
                  <textarea
                    required className="wd-input"
                    value={form.message} onChange={set("message")}
                    rows={3} placeholder="Write your wishes for the couple…"
                    style={{ resize: "none" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.8rem", color: "#e05959", textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button type="submit" disabled={status === "sending"} className="wd-btn wd-btn-solid"
                  style={{ opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}>
                  <span>{status === "sending" ? "Sending…" : "Post to Wall 💌"}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
