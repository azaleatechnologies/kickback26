import Link from "next/link";
import Countdown from "@/components/Countdown";
import AddToCalendar from "@/components/AddToCalendar";

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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/rsvp"
            className="inline-flex items-center justify-center rounded-full bg-sunset px-8 py-3 font-display text-bay-deep text-xl tracking-wider hover:bg-sunset-warm transition-colors"
          >
            RSVP
          </Link>
          <Link
            href="/info"
            className="inline-flex items-center justify-center rounded-full border border-sand/40 px-8 py-3 font-display text-sand text-xl tracking-wider hover:border-sunset hover:text-sunset-warm transition-colors"
          >
            The Info
          </Link>
        </div>

        <AddToCalendar />
      </section>

      {/* The "RSVP to get on the poster" lineup lands here in v1.1 */}
      <section className="border-t border-bay-fog/40 bg-bay-mid/60 px-6 py-20 text-center">
        <p className="font-display text-sunset-warm tracking-[0.3em] text-sm">
          One night only
        </p>
        <h2 className="font-display text-foam text-4xl sm:text-6xl mt-2">
          Lock it in
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-sand-dim">
          RSVP so we can mail your wristband and save you a spot.{" "}
          <Link href="/rsvp" className="text-sand font-medium underline decoration-sunset/60 underline-offset-4 hover:text-sunset-warm">
            Claim your spot →
          </Link>
        </p>
      </section>
    </main>
  );
}
