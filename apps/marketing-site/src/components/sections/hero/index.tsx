'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const LOGOS = [
  { name: 'TravelTech', width: 100 },
  { name: 'Wanderlust', width: 110 },
  { name: 'RouteIQ', width: 90 },
  { name: 'VoyagerOS', width: 105 },
  { name: 'TripForge', width: 95 },
  { name: 'FlightCore', width: 112 },
];

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Smoothed scroll progress — used for the subtle background video zoom. */
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  /* ── TEXT (visible on top of the video from frame 0, fades on scroll) ── */
  const textColOpacity = useTransform(scrollYProgress, [0.0, 0.22], [1, 0]);
  const textColY = useTransform(scrollYProgress, [0.0, 0.22], [0, -40]);
  const h1Y = useTransform(scrollYProgress, [0.0, 0.15], [0, -48]);
  const subY = useTransform(scrollYProgress, [0.05, 0.18], [0, -36]);
  const ctaY = useTransform(scrollYProgress, [0.08, 0.2], [0, -28]);

  /* ── VIDEO BACKGROUND — subtle zoom only, no card expansion ── */
  const videoScale = useTransform(smooth, [0.0, 0.3], [1.0, 1.08]);

  /* ── VIDEO EXIT — slides up to reveal logos ── */
  const videoExitY = useTransform(scrollYProgress, [0.55, 0.78], ['0%', '-100%']);
  const videoExitOp = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);

  /* ── OVERLAY TAGLINE (fades in then out over the full-screen video) ── */
  const overlayOp = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );
  const overlayY = useTransform(scrollYProgress, [0.28, 0.4], [24, 0]);

  /* ── SCRIM strengthens as text appears and again for tagline ── */
  const scrimOp = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.4, 0.6, 0.78],
    [0.55, 0.3, 0.55, 0.55, 0]
  );

  /* ── LOGOS SECTION ── */
  const logosY = useTransform(scrollYProgress, [0.7, 0.9], [80, 0]);
  const logosOp = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const logoTitleOp = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const logoTitleY = useTransform(scrollYProgress, [0.82, 0.94], [20, 0]);

  /* ── SCROLL HINT — only visible at the very top ── */
  const hintOp = useTransform(scrollYProgress, [0.0, 0.06], [1, 0]);

  /* Ensure autoplay on mount (works on iOS/Android/FB in-app when muted). */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="hero-scroll-root"
      style={{ position: 'relative' }}
    >
      {/*
        ───────────────────────────────────────────────────────────────
        Inline responsive CSS. Using 100dvh with 100vh fallback fixes
        Chrome / Safari / Firefox + Facebook Messenger / Instagram
        in-app browsers where 100vh jumps when the URL bar collapses.
        svh is used for the sticky viewport so it never overflows.
        ───────────────────────────────────────────────────────────────
      */}
      <style jsx>{`
        .hero-scroll-root {
          height: 500vh;
          height: 500svh;
        }
        .hero-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          height: 100dvh;
          overflow: hidden;
          background: #0a1024;
        }
        .hero-text-wrap {
          position: absolute;
          inset: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          padding-left: clamp(1.25rem, 6vw, 6rem);
          padding-right: clamp(1.25rem, 6vw, 6rem);
          padding-top: 5rem;
          padding-bottom: 5rem;
          pointer-events: none;
        }
        .hero-text-inner {
          pointer-events: auto;
          max-width: 640px;
          width: min(100%, 640px);
        }
        .hero-title {
          font-size: clamp(2rem, 5.5vw, 4.75rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 30px rgba(0, 0, 0, 0.45);
        }
        .hero-accent {
          color: #ff8a3d;
          background: linear-gradient(92deg, #ffb272 0%, #ff7a1a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          margin-top: clamp(0.9rem, 1.6vw, 1.35rem);
          font-size: clamp(0.95rem, 1.35vw, 1.2rem);
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.65;
          max-width: 52ch;
          text-shadow: 0 1px 16px rgba(0, 0, 0, 0.5);
        }
        .hero-ctas {
          display: flex;
          gap: 0.75rem;
          margin-top: clamp(1.25rem, 2.6vw, 2.1rem);
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #ffffff;
          color: #0f1f3d;
          padding: 0.85rem 1.6rem;
          border-radius: 9999px;
          font-size: clamp(0.9rem, 1.05vw, 1rem);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 14px 36px -14px rgba(0, 0, 0, 0.55);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 40px -14px rgba(0, 0, 0, 0.6);
        }
        .btn-ghost {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          padding: 0.85rem 1.4rem;
          border-radius: 9999px;
          font-size: clamp(0.9rem, 1.05vw, 1rem);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.8);
        }
        .trust-row {
          margin-top: clamp(1rem, 2vw, 1.5rem);
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          font-size: clamp(0.75rem, 0.9vw, 0.85rem);
          color: rgba(255, 255, 255, 0.72);
        }
        .tagline {
          color: #ffffff;
          font-size: clamp(1.5rem, 4vw, 3.25rem);
          font-weight: 700;
          text-align: center;
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 32px rgba(0, 0, 0, 0.6);
          max-width: min(90vw, 820px);
          padding: 0 1.25rem;
        }
        .logos-shell {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 5;
          background: #f7f4ef;
          padding: clamp(2rem, 5vw, 4rem) clamp(1.25rem, 6vw, 6rem);
        }
        .logos-kicker {
          text-align: center;
          font-size: clamp(0.7rem, 0.85vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #9ca3af;
          text-transform: uppercase;
          margin-bottom: clamp(1rem, 2.4vw, 2rem);
        }
        .logos-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(1rem, 4vw, 3.5rem);
          flex-wrap: wrap;
        }
        .scroll-hint {
          position: absolute;
          left: 50%;
          bottom: clamp(1rem, 3vw, 2.25rem);
          transform: translateX(-50%);
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          pointer-events: none;
        }
        .scroll-hint-dot {
          width: 22px;
          height: 38px;
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-hint-dot::before {
          content: '';
          width: 3px;
          height: 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.85);
          animation: dot 1.6s ease-in-out infinite;
        }
        @keyframes dot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          70% {
            transform: translateY(12px);
            opacity: 0;
          }
        }
        /* Tablet & below */
        @media (max-width: 900px) {
          .hero-text-wrap {
            align-items: flex-end;
            padding-bottom: clamp(7rem, 16vw, 10rem);
            text-align: left;
          }
        }
        /* Narrow phones */
        @media (max-width: 540px) {
          .hero-ctas {
            width: 100%;
          }
          .btn-primary,
          .btn-ghost {
            flex: 1 1 auto;
            justify-content: center;
          }
        }
        /* Tiny screens (FB Messenger in-app on small Androids) */
        @media (max-width: 380px) {
          .trust-row {
            gap: 0.35rem 0.65rem;
          }
        }
        /* Very tall / TV / ultrawide */
        @media (min-width: 1800px) {
          .hero-title {
            font-size: clamp(3.5rem, 5vw, 6rem);
          }
          .hero-sub {
            font-size: clamp(1.1rem, 1.2vw, 1.4rem);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-hint-dot::before {
            animation: none;
          }
        }
      `}</style>

      <div className="hero-sticky">
        {/* ── VIDEO BACKGROUND (full-bleed from frame 0) ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            y: videoExitY,
            opacity: videoExitOp,
            willChange: 'transform, opacity',
          }}
        >
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              scale: prefersReducedMotion ? 1 : videoScale,
              willChange: 'transform',
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </motion.video>

          {/* Dynamic scrim for text contrast */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(180deg, rgba(10,16,36,0.55) 0%, rgba(10,16,36,0.25) 35%, rgba(10,16,36,0.25) 55%, rgba(10,16,36,0.7) 100%)',
              opacity: scrimOp,
            }}
          />
          {/* Left-edge scrim so text always has contrast on wide screens */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(90deg, rgba(10,16,36,0.55) 0%, rgba(10,16,36,0.15) 45%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* ── HERO TEXT (overlaid, fades on scroll) ── */}
        <motion.div
          className="hero-text-wrap"
          style={{ opacity: textColOpacity, y: textColY }}
        >
          <div className="hero-text-inner">
            <motion.h1 className="hero-title" style={{ y: h1Y }}>
              Manage Your Travel Agency{' '}
              <span className="hero-accent">Effortlessly.</span>
            </motion.h1>

            <motion.p className="hero-sub" style={{ y: subY }}>
              Everything you need to run your agency — bookings, payments,
              vendors, CRM — in one beautifully simple platform. No code
              required.
            </motion.p>

            <motion.div className="hero-ctas" style={{ y: ctaY }}>
              <a href="#cta" className="btn-primary">
                Sign up now — it&apos;s free
                <ArrowRight size={16} />
              </a>
              <a href="#demo" className="btn-ghost">
                <Play size={14} />
                View Demo
              </a>
            </motion.div>

            <motion.div className="trust-row" style={{ y: ctaY }}>
              <span>✓ No credit card</span>
              <span>✓ Setup in 10 minutes</span>
              <span>✓ Cancel anytime</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── OVERLAY TAGLINE (centered, over full-screen video) ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: overlayOp,
          }}
        >
          <motion.p className="tagline" style={{ y: overlayY }}>
            Everything your agency needs — in one place.
          </motion.p>
        </motion.div>

        {/* ── CLIENT LOGOS (revealed as video slides up) ── */}
        <motion.div
          className="logos-shell"
          style={{ opacity: logosOp, y: logosY }}
        >
          <motion.p
            className="logos-kicker"
            style={{ opacity: logoTitleOp, y: logoTitleY }}
          >
            Trusted by leading travel agencies worldwide
          </motion.p>
          <div className="logos-grid">
            {LOGOS.map((logo, i) => (
              <LogoItem
                key={logo.name}
                logo={logo}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>

        {/* ── SCROLL HINT ── */}
        <motion.div className="scroll-hint" style={{ opacity: hintOp }}>
          <span>scroll</span>
          <div className="scroll-hint-dot" />
        </motion.div>
      </div>
    </section>
  );
}

function LogoItem({
  logo,
  index,
  scrollYProgress,
}: {
  logo: { name: string; width: number };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const delay = index * 0.018;
  const op = useTransform(
    scrollYProgress,
    [0.75 + delay, 0.88 + delay * 0.5],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [0.75 + delay, 0.88 + delay * 0.5],
    [24, 0]
  );

  return (
    <motion.div style={{ opacity: op, y }}>
      <div
        style={{
          width: logo.width,
          height: 32,
          background: '#D1D5DB',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#6B7280',
          letterSpacing: '0.05em',
        }}
      >
        {logo.name}
      </div>
    </motion.div>
  );
}
