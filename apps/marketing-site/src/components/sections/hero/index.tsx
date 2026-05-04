'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;
    const state1 = state1Ref.current;
    const state2 = state2Ref.current;
    if (!section || !sticky || !videoWrap || !video || !state1 || !state2) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          pin: false,
        },
      });

      // STATE 1 → fade out
      tl.to(
        state1,
        { opacity: 0, y: -40, duration: 0.35, ease: 'power2.inOut' },
        0
      );

      // Video: right → center/left + scale up
      tl.fromTo(
        videoWrap,
        { x: '15%', scale: 0.92 },
        { x: '-8%', scale: 1.08, duration: 1, ease: 'none' },
        0
      );

      // STATE 2 → fade in
      tl.fromTo(
        state2,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.35
      );

      // Mobile video scrub
      if (isMobile) {
        video.pause();
        video.currentTime = 0;
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            if (video.duration && !isNaN(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      } else {
        video.play().catch(() => {});
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '220vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-soft flex items-center"
      >
        {/* Soft background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-gradient-accent opacity-[0.05] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-gradient-primary opacity-[0.05] blur-3xl" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {/* LEFT: Text states */}
          <div className="relative w-full lg:w-1/2 flex items-center min-h-[200px] lg:min-h-0">
            {/* STATE 1 */}
            <div
              ref={state1Ref}
              className="w-full absolute inset-0 flex flex-col justify-center will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent w-fit">
                  <Sparkles className="h-3.5 w-3.5" />
                  10% OFF for first 25 sign-ups · only 8 spots left
                </div>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
                  Manage Your Travel Agency{' '}
                  <span className="text-gradient-accent">Effortlessly.</span>
                </h1>

                <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                  Everything you need to run your agency — bookings, payments, vendors,
                  CRM — in one beautifully simple platform. No code required.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#cta"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all"
                  >
                    Sign up now — it&apos;s free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </a>
                  <a
                    href="#resources"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-semibold text-foreground hover:border-primary transition"
                  >
                    <Play className="h-4 w-4 text-accent" /> View Demo
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-accent" /> No credit card
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-accent" /> Setup in 10 minutes
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-accent" /> Cancel anytime
                  </span>
                </div>
              </motion.div>
            </div>

            {/* STATE 2 */}
            <div
              ref={state2Ref}
              className="w-full absolute inset-0 flex flex-col justify-center opacity-0 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted by 47 agencies across Nepal
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
                Get Tourists From{' '}
                <span className="text-gradient-accent">All Around the World.</span>
              </h1>

              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Deliver seamless global travel experiences with ease. Your website works
                24/7, speaks every language, and takes bookings while you sleep.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#cta"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-elegant hover:shadow-glow transition-all"
                >
                  Launch your site
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 font-semibold text-foreground hover:border-primary transition"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> Multi-currency payments
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> Global CDN
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> 99.9% uptime
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Video */}
          <div
            ref={videoWrapRef}
            className="relative w-full lg:w-1/2 flex items-center justify-center will-change-transform"
          >
            <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant border border-border/40">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                poster="/first-frame.jpg"
                loop={!isMobile}
              >
                <source src="/hero.webm" type="video/webm" />
                <source src="/hero.mp4" type="video/mp4" />
              </video>

              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 lg:-left-8 rounded-2xl bg-card border border-border shadow-card-soft p-3 flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">+127 bookings</p>
                  <p className="text-muted-foreground">this month globally</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
