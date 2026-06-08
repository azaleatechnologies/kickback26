"use client";

import { useEffect, useState } from "react";

type Props = { targetIso: string };

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetIso }: Props) {
  const target = new Date(targetIso);
  // Start with a stable SSR value (zeros) — hydrate to real diff on the client
  // to avoid hydration mismatch from Date.now() drift.
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Seeding the real countdown on mount (rather than during render) is what
    // keeps SSR output stable and avoids a hydration mismatch — the cascading-
    // render cost is one extra paint, which is fine for a once-mounted clock.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  const cells: [number, string][] = [
    [t.days, "days"],
    [t.hours, "hrs"],
    [t.minutes, "min"],
    [t.seconds, "sec"],
  ];

  return (
    <div
      aria-label="Countdown to Kickback '26"
      className="mt-10 grid grid-cols-4 gap-3 sm:gap-6"
      suppressHydrationWarning
    >
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[64px] sm:min-w-[88px] rounded-lg border border-bay-fog/40 bg-bay-deep/60 px-3 py-2 backdrop-blur-sm"
        >
          <div className="font-display text-foam text-3xl sm:text-5xl leading-none">
            {mounted ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-sand-dim">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
