import Link from "next/link";

export const metadata = {
  title: "Check your email · July 3rd Kickback '26",
};

export default function CheckEmailPage() {
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
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.28)", zIndex: 0 }}
      />
      <div className="relative z-10 w-full max-w-xl text-shadow-sm">
        <Link
          href="/"
          className="text-white text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-shadow-sm"
        >
          ← Kickback &rsquo;26
        </Link>

        <h1 className="mt-4 font-display text-white text-5xl sm:text-6xl text-shadow">
          Check your email
        </h1>

        <p className="mt-4 text-white text-lg leading-relaxed">
          We just sent you a one-tap sign-in link. Open it on this device to
          finish your RSVP.
        </p>

        <div className="mt-6 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm p-5">
          <p className="text-white font-semibold">
            Don&rsquo;t see it? Check your spam or junk folder.
          </p>
          <p className="mt-2 text-white/80 leading-relaxed">
            The link sometimes lands there. If it does, mark it{" "}
            <span className="text-white">&ldquo;Not spam&rdquo;</span> so you
            keep getting Kickback updates. It can take a minute to arrive.
          </p>
        </div>

        <p className="mt-8 text-white/60 text-sm">
          Wrong address or no link after a few minutes?{" "}
          <Link href="/rsvp" className="text-white underline hover:opacity-70">
            Try again
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
