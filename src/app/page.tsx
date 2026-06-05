import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
        {/* Sunset gradient wash behind the wordmark */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, var(--color-sunset) 0%, var(--color-sunset-warm) 25%, var(--color-bay-mid) 55%, var(--color-bay-deep) 90%)",
          }}
        />

        {/* Stacked festival wordmark */}
        <p className="font-display text-sand-dim text-lg sm:text-2xl tracking-[0.4em]">
          July 3rd
        </p>
        <h1 className="font-display text-foam text-[18vw] sm:text-[14vw] md:text-[12rem] leading-[0.85] my-2">
          Kickback
        </h1>
        <p className="font-display text-sunset-warm text-4xl sm:text-6xl tracking-tight">
          &rsquo;26
        </p>

        <p className="mt-8 max-w-md text-sand-dim font-sans text-base sm:text-lg">
          Year three. Friday, July 3, 2026. Mobile Bay. One night only.
        </p>

        <Countdown targetIso="2026-07-03T17:00:00-05:00" />

        <a
          href="#rsvp"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-sunset px-8 py-3 font-display text-bay-deep text-xl tracking-wider hover:bg-sunset-warm transition-colors"
        >
          RSVP
        </a>
      </section>

      {/* Placeholder: lineup / info / etc. ship in subsequent phases */}
      <section
        id="rsvp"
        className="border-t border-bay-fog/40 bg-bay-mid/60 px-6 py-20 text-center"
      >
        <p className="font-display text-sunset-warm tracking-[0.3em] text-sm">
          Coming soon
        </p>
        <h2 className="font-display text-foam text-4xl sm:text-6xl mt-2">
          Lineup &middot; RSVP &middot; The Plan
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-sand-dim">
          The site fills in over the next eight weeks. Wristbands ship June 19.
          Bookmark{" "}
          <span className="text-sand font-medium">kickback26.com</span>.
        </p>
      </section>
    </main>
  );
}
