import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signOutAction } from "@/app/actions";
import SignInForm from "@/components/SignInForm";
import RsvpForm, { type RsvpInitial } from "@/components/RsvpForm";

// Always render fresh — this page depends on the signed-in session.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "RSVP · July 3rd Kickback '26",
};

export default async function RsvpPage() {
  const session = await auth();
  const email = session?.user?.email ?? null;

  const existing = email
    ? await prisma.user.findUnique({
        where: { email },
        include: { rsvp: true },
      })
    : null;

  const initial: RsvpInitial = {
    name: existing?.name ?? session?.user?.name ?? "",
    email: email ?? "",
    status: existing?.rsvp?.status ?? "",
    plusOne: existing?.rsvp?.plusOne ?? false,
    plusOneName: existing?.rsvp?.plusOneName ?? "",
    dietary: existing?.rsvp?.dietary ?? "",
    sleeping: existing?.rsvp?.sleeping === "HOUSE" ? "HOUSE" : "UNSURE",
    mailingAddress: existing?.rsvp?.mailingAddress ?? "",
    notes: existing?.rsvp?.notes ?? "",
  };

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
      <div className="relative z-10 w-full max-w-xl">
        <Link
          href="/"
          className="text-white text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-shadow-sm"
        >
          ← Kickback &rsquo;26
        </Link>

        <h1 className="mt-4 font-display text-white text-5xl sm:text-6xl">
          RSVP
        </h1>
        <p className="mt-3 text-white/70">
          Friday, July 3, 2026 · Mobile Bay.
        </p>

        <div className="mt-10">
          {email ? (
            <>
              <RsvpForm initial={initial} />
              <form action={signOutAction} className="mt-8">
                <button
                  type="submit"
                  className="text-white/50 text-xs tracking-widest uppercase hover:text-white transition-opacity"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <SignInForm />
          )}
        </div>
      </div>
    </main>
  );
}

