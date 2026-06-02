import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  { href: "#story",    label: "Our Story" },
  { href: "#couple",   label: "The Couple" },
  { href: "#venue",    label: "Details"   },
  { href: "#gallery",  label: "Gallery"   },
  { href: "#rsvp",     label: "RSVP"      },
];

export default function App() {
  const guestName = useGuest();
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // GSAP fade-in for .gsap-fade elements
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

  return (
    <>
      {/* Envelope intro overlay */}
      <EnvelopeIntro onOpen={() => setReady(true)} />

      {/* Main site (always mounted, visible after intro) */}
      <div ref={mainRef} style={{ width: "100%", minHeight: "100vh", background: "var(--wd-bg)", opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}>

        {/* ── Sticky nav ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: "2rem", padding: "1rem 1.5rem",
          background: scrolled ? "rgba(247,246,242,0.94)" : "rgba(247,246,242,0.7)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid rgba(212,180,131,0.2)" : "1px solid transparent",
          transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(46,58,54,0.06)" : "none",
        }}>
          <a href="#hero" style={{ fontFamily: "var(--wd-script)", fontSize: "1.3rem", color: "var(--wd-text)", textDecoration: "none", marginRight: "0.5rem" }}>
            N ❤ B
          </a>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <main>
          <section id="hero">      <Hero guestName={guestName} />   </section>
          <section id="countdown"> <Countdown />                     </section>
          <section id="story">     <OurStory />                      </section>
          <section id="couple">    <CoupleShowcase />                </section>
          <section id="venue">     <VenueDetails />                  </section>
          <section id="timeline">  <EventTimeline />                 </section>
          <section id="gallery">   <Gallery />                       </section>
          <section id="rsvp">      <RSVP />                          </section>
          <section id="guestbook"> <Guestbook />                     </section>
          <section id="quiz">      <Quiz />                          </section>
          <section id="playlist">  <SpotifyEmbed />                  </section>
          <section id="upload">    <PhotoUpload />                   </section>
          <section id="share">     <SocialShare />                   </section>
          <section id="letter">    <LoveLetter />                    </section>
          <section id="finale">    <GrandFinale />                   </section>
        </main>

        {/* ── Footer ── */}
        <footer style={{
          background: "var(--wd-bg-alt)",
          borderTop: "1px solid var(--wd-border)",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--wd-script)", fontSize: "2.2rem", color: "var(--wd-text)", marginBottom: "1.25rem" }}>
            Nimantha &amp; Binasha
          </p>
          <div className="gold-divider gold-divider-alt" style={{ marginBottom: "1.25rem" }} />
          <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--wd-accent)" }}>
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
