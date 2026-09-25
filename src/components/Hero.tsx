import { useEffect, useRef } from "react";
import gsap from "gsap";

const HEADLINE = "Designing the Future, One Bold Idea at a Time";

/**
 * Hero: full-bleed cinematic background, centered H1 with GSAP
 * word-by-word rise-in on load, thin divider, wide outlined CTA.
 */
export function Hero({ bgSrc }: { bgSrc: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Word-by-word staggered rise-in (each word masked by overflow-hidden)
      gsap.fromTo(
        "[data-hero-word]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.045,
          ease: "expo.out",
          delay: 0.25,
        }
      );

      // Supporting elements fade/slide in after the headline
      gsap.fromTo(
        "[data-hero-fade]",
        { y: reduce ? 0 : 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power2.out", delay: 0.9 }
      );

      // Slow parallax drift on the background image while in view
      if (!reduce) {
        gsap.to("[data-hero-bg]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-void overflow-hidden"
    >
      {/* background */}
      <div className="absolute inset-0">
        <img
          data-hero-bg
          src={bgSrc}
          alt="Woman's face in a lush dark garden"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
      </div>

      {/* content */}
      <div className="relative z-10 px-6 pt-28 pb-16 flex flex-col items-center text-center max-w-[1100px]">
        <h1 className="font-display font-bold tracking-tightest leading-[1.04] text-[clamp(2.6rem,7.5vw,5.25rem)]">
          {HEADLINE.split(" ").map((word, i) => (
            <span key={i} className="mask-line inline-block pb-[0.08em] -mb-[0.08em] mr-[0.26em]">
              <span data-hero-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div data-hero-fade className="w-full max-w-[1100px] mt-12">
          <div className="h-px w-full bg-white/15" />
          <div className="pt-10 flex justify-center">
            <a href="#contact" className="btn-outline w-full sm:w-auto justify-center text-center">
              Let&apos;s build something extraordinary. <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
      >
        Scroll
      </div>
    </section>
  );
}
