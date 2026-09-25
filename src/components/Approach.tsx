import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PHASES = [
  {
    word: "Discover",
    copy: "We begin with open-ended, high-energy brainstorming sessions to uncover bold directions.",
  },
  {
    word: "Define",
    copy: "We distill big ideas into sharp concepts with clear positioning.",
  },
  {
    word: "Design",
    copy: "Using tools like Figma, we shape clear, premium, and modern visuals.",
  },
  {
    word: "Build",
    copy: "Our no-code arsenal (Framer, Webflow, etc.) means we go from static to stunning — fast.",
  },
];

/** Approach: stacked oversized display words; click to activate a phase (one at a time). */
export function Approach() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* left: phase words */}
      <div className="flex flex-col">
        {PHASES.map((phase, i) => {
          const isActive = i === active;
          return (
            <button
              key={phase.word}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              className="group text-left border-b border-white/15 py-2 md:py-3 cursor-pointer"
            >
              <motion.span
                layout
                className={`font-display font-bold tracking-tightest leading-[1.02] block text-[clamp(2.8rem,6vw,4.2rem)] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/25 group-hover:text-white/60"
                }`}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                {phase.word}
              </motion.span>
              {/* active underline indicator */}
              <motion.div
                className="h-[2px] bg-accent origin-left"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          );
        })}
      </div>

      {/* right: active phase description */}
      <div className="lg:pt-6 lg:sticky lg:top-32">
        <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-bone/70 mb-6">
          Phase 0{active + 1} — {PHASES[active].word}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="font-display text-2xl md:text-[2rem] leading-[1.35] font-medium text-white max-w-[520px]"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {PHASES[active].copy}
          </motion.p>
        </AnimatePresence>
        <div className="mt-8 flex gap-2">
          {PHASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${PHASES[i].word}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? "w-10 bg-white" : "w-4 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
