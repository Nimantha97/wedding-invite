import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "../lib/api";

type Status = "idle" | "sending" | "success" | "error";

export default function RSVP() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    guests: "1", attending: "yes",
    meal: "nonveg", notes: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await submitRSVP(form);
      setStatus(res.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const Label = ({ text }: { text: string }) => (
    <label style={{ display: "block", fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.45rem" }}>
      {text}
    </label>
  );

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg)" }}>
      <div className="wd-inner-sm">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Will you join us?
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          RSVP
        </motion.h2>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 160 }}
              className="wd-card"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 0.5 }} style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                💌
              </motion.div>
              <p style={{ fontFamily: "var(--wd-script)", fontSize: "2rem", color: "var(--wd-text)", marginBottom: "0.75rem" }}>
                Thank you, {form.name}!
              </p>
              <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text-muted)", lineHeight: 1.7 }}>
                We've received your RSVP and can't wait to celebrate with you at Avenra Gardens.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={submit}
              className="wd-card"
              style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div>
                <Label text="Full Name *" />
                <input required className="wd-input" value={form.name} onChange={set("name")} placeholder="Your full name" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <Label text="Phone Number" />
                  <input className="wd-input" type="tel" value={form.phone} onChange={set("phone")} placeholder="+94 7X XXX XXXX" />
                </div>
                <div>
                  <Label text="Email" />
                  <input className="wd-input" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                </div>
              </div>

              <div>
                <Label text="Number of Guests" />
                <select className="wd-input" value={form.guests} onChange={set("guests")} style={{ cursor: "pointer" }}>
                  {["1","2","3","4","5+"].map(n => <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>)}
                </select>
              </div>

              <div>
                <Label text="Attendance *" />
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {["yes", "no"].map(v => (
                    <label key={v} style={{
                      flex: 1, textAlign: "center", padding: "0.85rem 0.5rem",
                      borderRadius: "0.875rem", cursor: "pointer",
                      fontFamily: "var(--wd-sans)", fontSize: "0.8rem",
                      border: `1.5px solid ${form.attending === v ? "rgba(212,180,131,0.7)" : "var(--wd-border)"}`,
                      background: form.attending === v ? "rgba(212,180,131,0.1)" : "#fff",
                      color: form.attending === v ? "var(--wd-gold-dark)" : "var(--wd-text-muted)",
                      transition: "all 0.25s",
                    }}>
                      <input type="radio" name="attending" value={v} checked={form.attending === v} onChange={set("attending")} style={{ display: "none" }} />
                      {v === "yes" ? "🎉 Joyfully Accept" : "😢 Regretfully Decline"}
                    </label>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {form.attending === "yes" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <Label text="Meal Preference" />
                    <select className="wd-input" value={form.meal} onChange={set("meal")} style={{ cursor: "pointer" }}>
                      <option value="nonveg">🍗 Non-Vegetarian</option>
                      <option value="veg">🥗 Vegetarian</option>
                      <option value="vegan">🌱 Vegan</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label text="Special Notes (optional)" />
                <textarea
                  className="wd-input"
                  value={form.notes}
                  onChange={set("notes")}
                  rows={3}
                  placeholder="Allergies, accessibility needs, or a personal message…"
                  style={{ resize: "none" }}
                />
              </div>

              {status === "error" && (
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.8rem", color: "#e05959", textAlign: "center" }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="wd-btn wd-btn-solid"
                style={{ opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
              >
                <span>{status === "sending" ? "Sending…" : "Send RSVP ✉️"}</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
