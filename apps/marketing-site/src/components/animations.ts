export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  out: 'power3.out',
  in: 'power2.in',
  inOut: 'power3.inOut',
  smooth: 'none',
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/* -----------------------------------------------
   Page-load stagger reveal for hero elements
   Pass an array of refs in order you want them
   to animate in.
----------------------------------------------- */
export function animateHeroEntrance(
  targets: (HTMLElement | null)[],
  fromVars: gsap.TweenVars = { opacity: 0, y: 28 },
  stagger = 0.1
) {
  const valid = targets.filter(Boolean) as HTMLElement[];
  return gsap.fromTo(
    valid,
    fromVars,
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: DURATION.slow,
      ease: EASE.out,
      stagger,
      clearProps: 'transform',
    }
  );
}

/* -----------------------------------------------
   Desktop scroll timeline
   Phases:
     0–0.30  → text1 exits left
     0.12–0.72 → video crosses right→left
     0.58–1.0  → text2 enters from right
----------------------------------------------- */
export function buildDesktopTimeline(
  section: HTMLElement,
  text1: HTMLElement,
  video: HTMLElement,
  text2: HTMLElement
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });

  // Phase 1 — text1 exits left (0 → 0.30)
  tl.fromTo(
    text1,
    { opacity: 1, x: 0, filter: 'blur(0px)' },
    { opacity: 0, x: '-7vw', filter: 'blur(4px)', ease: EASE.in },
    0
  );

  // Phase 2 — video slides right → left (0.12 → 0.72)
  tl.fromTo(
    video,
    { x: '0vw', scale: 1 },
    { x: '-46vw', scale: 1.04, ease: EASE.smooth },
    0.12
  );

  // Phase 3 — text2 enters from right (0.58 → 1.0)
  tl.fromTo(
    text2,
    { opacity: 0, x: '7vw', filter: 'blur(4px)' },
    { opacity: 1, x: 0, filter: 'blur(0px)', ease: EASE.out },
    0.58
  );

  return tl;
}

/* -----------------------------------------------
   Mobile scroll timeline
   Phases:
     0–0.30  → text1 exits up
     0.15–0.70 → video slides up
     0.58–1.0  → text2 enters from below
----------------------------------------------- */
export function buildMobileTimeline(
  section: HTMLElement,
  text1: HTMLElement,
  video: HTMLElement,
  text2: HTMLElement
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });

  // text1 exits upward
  tl.fromTo(
    text1,
    { opacity: 1, y: 0, filter: 'blur(0px)' },
    { opacity: 0, y: '-5vh', filter: 'blur(3px)', ease: EASE.in },
    0
  );

  // video slides up
  tl.fromTo(
    video,
    { y: '0vh' },
    { y: '-7vh', ease: EASE.smooth },
    0.15
  );

  // text2 enters from below
  tl.fromTo(
    text2,
    { opacity: 0, y: '6vh', filter: 'blur(3px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', ease: EASE.out },
    0.58
  );

  return tl;
}

/* -----------------------------------------------
   Floating card idle animation (framer-motion
   compatible values — use in motion.div)
----------------------------------------------- */
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/* -----------------------------------------------
   Scroll hint dot bounce (framer-motion)
----------------------------------------------- */
export const scrollDotAnimation = {
  y: [0, 8, 0],
  transition: {
    duration: 1.6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/* -----------------------------------------------
   Ambient glow pulse (framer-motion keyframes)
----------------------------------------------- */
export const glowPulse = {
  opacity: [0.06, 0.13, 0.06],
  scale: [1, 1.08, 1],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

