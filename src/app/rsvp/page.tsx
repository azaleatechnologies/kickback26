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
    sleeping: existing?.rsvp?.sleeping ?? "UNSURE",
    mailingAddress: existing?.rsvp?.mailingAddress ?? "",
    notes: existing?.rsvp?.notes ?? "",
  };

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16 sm:py-24">
      <div className="w-full max-w-xl">
        <Link
          href="/"
          className="font-display text-sand-dim text-xs tracking-[0.3em] hover:text-sunset-warm"
        >
          ← Kickback &rsquo;26
        </Link>

        <h1 className="mt-4 font-display text-foam text-5xl sm:text-6xl">
          RSVP
        </h1>
        <p className="mt-3 text-sand-dim">
          Friday, July 3, 2026 · Mobile Bay · One night only.
        </p>

        <div className="mt-10">
          {email ? (
            <>
              <RsvpForm initial={initial} />
              <form action={signOutAction} className="mt-8">
                <button
                  type="submit"
                  className="font-display text-sand-dim text-xs tracking-widest hover:text-sunset-warm"
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
