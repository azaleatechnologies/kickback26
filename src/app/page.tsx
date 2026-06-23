import Link from "next/link";
import Countdown from "@/components/Countdown";
import AddToCalendar from "@/components/AddToCalendar";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Full-bleed hero — sky photo fills the viewport */}
      <section
        className="relative flex flex-1 flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Scrim — enough to anchor white text without killing the photo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.40) 100%)",
          }}
        />

        {/* Wordmark */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-white text-sm tracking-[0.25em] uppercase mb-2 text-shadow-sm">
            July 3rd, 2026 · Mobile Bay
          </p>
          <h1
            className="font-display text-white leading-none text-shadow whitespace-nowrap flex items-baseline justify-center"
            style={{ fontSize: "clamp(3.5rem, 16vw, 13rem)" }}
          >
            Kickback
            <span className="text-[0.32em] ml-[0.15em]">&rsquo;26</span>
          </h1>

          <Countdown targetIso="2026-07-03T17:00:00-05:00" />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rsvp"
              className="rounded-full bg-white text-black px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
            >
              RSVP
            </Link>
            <Link
              href="/info"
              className="rounded-full border border-white text-white px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 text-shadow-sm"
            >
              Info
            </Link>
          </div>

          <div className="mt-8">
            <AddToCalendar />
          </div>
        </div>
      </section>
    </main>
  );
}
