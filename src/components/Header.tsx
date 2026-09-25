import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { RollLink } from "./Roll";

const LINKS = ["Home", "About", "Services", "Works", "Contact"];
const HREFS: Record<string, string> = {
  Home: "#home",
  About: "#about",
  Services: "#services",
  Works: "#works",
  Contact: "#contact",
};

export function MenuOverlay({
  open,
  onClose,
  interiorSrc,
}: {
  open: boolean;
  onClose: () => void;
  interiorSrc: string;
}) {
  // Lock scroll while the overlay is open (Lenis-friendly: just hide overflow on body)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          className="fixed inset-0 z-[80] bg-ink text-white overflow-y-auto"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-28 md:pt-32 pb-10 min-h-full flex flex-col">
            {/* close row */}
            <div className="flex items-center justify-between">
              <div className="font-display text-2xl font-bold tracking-tightest">
                <span className="mr-2 font-mono font-normal">//</span>
                Base<sup className="text-xs align-super">TM</sup>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-[0.12em] border border-white/30 rounded-lg px-5 py-3 hover:bg-white hover:text-black transition-colors"
              >
                Close ✕
              </button>
            </div>

            {/* links + photo */}
            <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-10 items-start flex-1">
              <nav className="flex flex-col gap-2">
                {LINKS.map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={HREFS[label]}
                      onClick={onClose}
                      className="font-display font-bold tracking-tightest leading-[1.05] text-5xl md:text-7xl hover:text-accent transition-colors"
                    >
                      {label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={interiorSrc}
                  alt="Base Studio interior"
                  className="w-full h-[320px] md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </div>

            {/* contact row */}
            <motion.div
              className="mt-12 flex flex-col md:flex-row gap-6 md:items-end justify-between font-mono text-xs uppercase tracking-[0.12em] text-bone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex flex-col gap-2">
                <a href="tel:+15554386583" className="hover:text-white">(555) 438 6583</a>
                <a href="mailto:hello@base.studio" className="hover:text-white">hello@base.studio</a>
              </div>
              <div className="flex flex-col gap-2 md:text-right">
                <span>Designed by Forx Studio</span>
                <span>© Base Studio 2026. All rights reserved</span>
              </div>
            </motion.div>

            {/* giant words */}
            <motion.div
              className="mt-8 select-none pointer-events-none font-display font-bold tracking-tightest leading-[0.85] text-[18vw] md:text-[13vw] text-white/[0.07] whitespace-nowrap overflow-hidden"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              BASE&nbsp;/&nbsp;STUDIO
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const NAV = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export function Header({ interiorSrc }: { interiorSrc: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] mix-blend-difference text-white">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-5 flex items-center justify-between">
          <a href="#home" className="font-display text-2xl font-bold tracking-tightest">
            <span className="mr-2 font-mono font-normal">//</span>
            Base<sup className="text-[10px] align-super">TM</sup>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[0.1em]">
            {NAV.map((n) => (
              <RollLink key={n.label} href={n.href}>
                {n.label}
              </RollLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="font-mono text-[12px] uppercase tracking-[0.1em] cursor-pointer"
            aria-expanded={open}
            aria-label="Open menu"
          >
            <span className="roll">
              <span className="roll-inner">
                <span>Menu</span>
                <span aria-hidden="true">Menu</span>
              </span>
            </span>
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} interiorSrc={interiorSrc} />
    </>
  );
}
