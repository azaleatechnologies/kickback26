import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Always render fresh — reflects live RSVP data. Public: anyone can see who's
// coming, signed in or not.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Who's going · July 3rd Kickback '26",
};

type Guest = { name: string; plusOne: boolean; plusOneName: string | null };

function displayName(name: string | null): string {
  // Public page — never fall back to anything email-derived.
  return (name ?? "").trim() || "A guest";
}

function GuestRow({ guest }: { guest: Guest }) {
  return (
    <li className="border-t border-white/20 py-3 flex items-baseline justify-between gap-4">
      <span className="text-white">{guest.name}</span>
      {guest.plusOne && (
        <span className="text-white/50 text-sm whitespace-nowrap">
          +1{guest.plusOneName ? ` · ${guest.plusOneName}` : ""}
        </span>
      )}
    </li>
  );
}

export default async function GuestsPage() {
  const rsvps = await prisma.rsvp.findMany({
    where: { status: { in: ["GOING", "MAYBE"] } },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  const toGuest = (r: (typeof rsvps)[number]): Guest => ({
    name: displayName(r.user.name),
    plusOne: r.plusOne,
    plusOneName: r.plusOneName,
  });

  const going = rsvps.filter((r) => r.status === "GOING").map(toGuest);
  const maybe = rsvps.filter((r) => r.status === "MAYBE").map(toGuest);

  // Headcount = confirmed people + their +1s.
  const goingHeadcount =
    going.length + going.filter((g) => g.plusOne).length;

  return (
    <Shell>
      <p className="mt-3 text-white/70">
        {goingHeadcount} coming
        {maybe.length > 0 ? ` · ${maybe.length} maybe` : ""}.
      </p>

      <section className="mt-10">
        <h2 className="text-white/60 text-xs tracking-widest uppercase">
          Going
        </h2>
        {going.length > 0 ? (
          <ul className="mt-3">
            {going.map((g, i) => (
              <GuestRow key={`going-${i}`} guest={g} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-white/50">
            No one yet. Be the first to RSVP.
          </p>
        )}
      </section>

      {maybe.length > 0 && (
        <section className="mt-10">
          <h2 className="text-white/60 text-xs tracking-widest uppercase">
            Maybe
          </h2>
          <ul className="mt-3">
            {maybe.map((g, i) => (
              <GuestRow key={`maybe-${i}`} guest={g} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 border-t border-white/20 pt-8">
        <p className="text-white/70">Not on the list yet?</p>
        <Link
          href="/rsvp"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
        >
          RSVP
        </Link>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
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
          Who&rsquo;s Going
        </h1>
        {children}
      </div>
    </main>
  );
}
