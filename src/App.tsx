import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

import { useGuest }       from "./hooks/useGuest";
import EnvelopeIntro      from "./components/EnvelopeIntro";
import Hero               from "./components/Hero";
import Countdown          from "./components/Countdown";
import OurStory           from "./components/OurStory";
import CoupleShowcase     from "./components/CoupleShowcase";
import VenueDetails       from "./components/VenueDetails";
import EventTimeline      from "./components/EventTimeline";
import Gallery            from "./components/Gallery";
import RSVP               from "./components/RSVP";
import Guestbook          from "./components/Guestbook";
import Quiz               from "./components/Quiz";
import SpotifyEmbed       from "./components/SpotifyEmbed";
import SocialShare        from "./components/SocialShare";
import PhotoUpload        from "./components/PhotoUpload";
import LoveLetter         from "./components/LoveLetter";
import GrandFinale        from "./components/GrandFinale";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "#story",    label: "Our Story"  },
  { href: "#couple",   label: "Couple"     },
  { href: "#venue",    label: "Details"    },
  { href: "#gallery",  label: "Gallery"    },
  { href: "#rsvp",     label: "RSVP"       },
  { href: "#upload",   label: "Photos"     },
];

export default function App() {
  const guestName        = useGuest();
  const [ready, setReady]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const elements = document.querySelectorAll(".gsap-fade");
    elements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener("scroll", onScroll);
    };
  }, [ready]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <EnvelopeIntro onOpen={() => setReady(true)} />

      <div
        ref={mainRef}
        style={{ width: "100%", minHeight: "100vh", background: "var(--wd-bg)", opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        {/* ── Nav ── */}
        <nav className={`wd-nav ${scrolled ? "wd-nav--scrolled" : ""}`}>
          <div className="wd-nav__inner">
            {/* Logo */}
            <a href="#hero" className="wd-nav__logo" onClick={closeMenu}>
              N ❤ B
            </a>

            {/* Desktop links */}
            <div className="wd-nav__links">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
              <a href="#rsvp" className="wd-btn wd-btn-solid wd-nav__cta">
                <span>RSVP</span>
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="wd-nav__burger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open" : ""}`} />
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="wd-nav__drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="wd-nav__drawer-link"
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#rsvp"
                  className="wd-btn wd-btn-solid"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  onClick={closeMenu}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <span>RSVP Now</span>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Backdrop for mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="wd-nav__backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>

        <main>
          <section id="hero">      <Hero guestName={guestName} />  </section>
          <section id="countdown"> <Countdown />                    </section>
          <section id="story">     <OurStory />                     </section>
          <section id="couple">    <CoupleShowcase />               </section>
          <section id="venue">     <VenueDetails />                 </section>
          <section id="timeline">  <EventTimeline />                </section>
          <section id="gallery">   <Gallery />                      </section>
          <section id="rsvp">      <RSVP />                         </section>
          <section id="guestbook"> <Guestbook />                    </section>
          <section id="quiz">      <Quiz />                         </section>
          <section id="playlist">  <SpotifyEmbed />                 </section>
          <section id="upload">    <PhotoUpload />                  </section>
          <section id="share">     <SocialShare />                  </section>
          <section id="letter">    <LoveLetter />                   </section>
          <section id="finale">    <GrandFinale />                  </section>
        </main>

        <footer className="wd-footer">
          <p style={{ fontFamily: "var(--wd-script)", fontSize: "2.2rem", color: "var(--wd-text)", marginBottom: "1.25rem" }}>
            Nimantha &amp; Binasha
          </p>
          <div className="gold-divider gold-divider-alt" style={{ marginBottom: "1.25rem" }} />
          <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--wd-accent)" }}>
            30 · July · 2026 · Negombo, Sri Lanka
          </p>
          <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.72rem", color: "var(--wd-text-muted)", marginTop: "1.5rem" }}>
            Made with ♥ for our most special day
          </p>
        </footer>
      </div>
    </>
  );
}
