import Link from "next/link";
import AddToCalendar from "@/components/AddToCalendar";

export const metadata = {
  title: "Info · July 3rd Kickback '26",
};


export default function InfoPage() {
  return (
    <main
      className="relative flex flex-1 flex-col items-center px-6 py-16 sm:py-24"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Uniform scrim so text stays legible across all cloud zones */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.28)", zIndex: 0 }}
      />
      <div className="relative z-10 w-full max-w-xl">
        <Link
          href="/"
          className="text-white text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-shadow-sm"
        >
          ← Kickback &rsquo;26
        </Link>

        <h1 className="mt-4 font-display text-white text-5xl sm:text-6xl text-shadow">
          The Info
        </h1>

        <div className="mt-8 border-t border-white/30 pt-7 text-shadow-sm">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-3">Who, what, when, and where?</p>
          <p className="text-white leading-relaxed">
            Us, 3rd annual July 3rd Kickback, July 3rd (Friday), same place as last time.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4">
          <Link
            href="/rsvp"
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
          >
            RSVP
          </Link>
          <AddToCalendar />
        </div>
      </div>
    </main>
  );
}

