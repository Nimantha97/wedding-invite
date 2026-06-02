import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "Where did Nimantha & Binasha first meet?",       options: ["At a party", "Through friends", "At work", "Online"],        answer: 1 },
  { q: "What is their favourite thing to do together?",  options: ["Cooking", "Travelling", "Watching movies", "Hiking"],         answer: 1 },
  { q: "Where is the wedding being held?",               options: ["Colombo", "Kandy", "Negombo", "Galle"],                       answer: 2 },
];

const results: Record<string, { emoji: string; msg: string }> = {
  "3": { emoji: "🏆", msg: "You know us better than we know ourselves! You're basically family." },
  "2": { emoji: "💛", msg: "Pretty good! You've been paying attention. We're honoured!" },
  "1": { emoji: "😄", msg: "One right! Hey, at least you showed up — that's what matters." },
  "0": { emoji: "😂", msg: "Zero? We're a little worried, but we love you anyway. See you at the wedding!" },
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score,   setScore]   = useState(0);
  const [chosen,  setChosen]  = useState<number | null>(null);
  const [done,    setDone]    = useState(false);

  const handleAnswer = (idx: number) => {
    if (chosen !== null) return;
    setChosen(idx);
    if (idx === questions[current].answer) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent(c => c + 1); setChosen(null); }
      else setDone(true);
    }, 950);
  };

  const reset = () => { setCurrent(0); setScore(0); setChosen(null); setDone(false); };
  const result = results[String(done ? score : 0)];

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner-sm">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          A little fun
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Guess the Couple
        </motion.h2>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="wd-card"
              style={{ padding: "2rem" }}
            >
              <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.9rem" }}>
                Question {current + 1} / {questions.length}
              </p>
              {/* Progress */}
              <div style={{ height: 2, background: "var(--wd-border)", borderRadius: 1, marginBottom: "1.5rem" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(current / questions.length) * 100}%` }}
                  style={{ height: "100%", background: "var(--wd-gold)", borderRadius: 1 }}
                />
              </div>
              <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.4rem", fontWeight: 300, color: "var(--wd-text)", marginBottom: "1.5rem", lineHeight: 1.45 }}>
                {questions[current].q}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {questions[current].options.map((opt, i) => {
                  const isCorrect = i === questions[current].answer;
                  const isChosen  = i === chosen;
                  let bg = "#fff", border = "var(--wd-border)", color = "var(--wd-text)";
                  if (chosen !== null) {
                    if (isCorrect)     { bg = "rgba(144,195,167,0.15)"; border = "rgba(144,195,167,0.7)"; color = "#3a8a5a"; }
                    else if (isChosen) { bg = "rgba(224,89,89,0.08)";   border = "rgba(224,89,89,0.5)";   color = "#c05050"; }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color,
                        background: bg, border: `1.5px solid ${border}`,
                        borderRadius: "0.875rem", padding: "0.85rem 1.25rem",
                        textAlign: "left", cursor: "pointer", transition: "all 0.25s",
                      }}
                      onMouseEnter={e => { if (chosen === null) (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,180,131,0.6)"; }}
                      onMouseLeave={e => { if (chosen === null) (e.currentTarget as HTMLElement).style.borderColor = "var(--wd-border)"; }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="wd-card"
              style={{ padding: "2.5rem", textAlign: "center" }}
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, -12, 0] }}
                transition={{ duration: 0.65, delay: 0.2 }}
                style={{ fontSize: "3.5rem", marginBottom: "1rem" }}
              >
                {result.emoji}
              </motion.div>
              <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.5rem" }}>
                You scored {score} / {questions.length}
              </p>
              <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.4rem", fontWeight: 300, color: "var(--wd-text)", marginBottom: "1.75rem", lineHeight: 1.55 }}>
                {result.msg}
              </p>
              <button onClick={reset} className="wd-btn"><span>Try Again</span></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
