import { useEffect, useState } from "react";

const WORDMARKS = [
  "Base Studio",
  "VECTOR.SAGE™",
  "INTERGALACTICA",
  "Framebloc",
  "ONTORIA",
  "AMBI DEXTER",
  "Caster.Den",
  "logoipsum",
];

/** Infinite horizontal marquee of client wordmarks (duplicated list, CSS animation). */
export function Marquee() {
  const row = [...WORDMARKS, ...WORDMARKS];
  return (
    <div className="overflow-hidden border-y border-white/15 py-6 select-none" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-16 pr-16">
        {row.map((mark, i) => (
          <span
            key={i}
            className="font-display font-bold text-2xl md:text-3xl tracking-tight text-white/70 whitespace-nowrap"
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Live clock, updates every second, rendered in the footer address column. */
export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <span className="font-mono text-xs uppercase tracking-[0.12em] text-bone tabular-nums">
      {time}
    </span>
  );
}
