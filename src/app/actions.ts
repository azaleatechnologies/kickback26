"use server";

import { revalidatePath } from "next/cache";
import { RsvpStatus, Sleeping } from "@prisma/client";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ---- Magic-link sign-in -----------------------------------------------------

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return;
  // Sends the email, then redirects to the "check your email" page.
  // After the user clicks the link they land back on /rsvp, signed in.
  await signIn("nodemailer", { email, redirectTo: "/rsvp" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// ---- RSVP submission --------------------------------------------------------

export type RsvpState = { ok: boolean; message: string } | null;

const STATUSES = Object.values(RsvpStatus);
const SLEEPING = Object.values(Sleeping);

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { ok: false, message: "You need to sign in first." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { ok: false, message: "Account not found — try signing in again." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "");
  const sleepingRaw = String(formData.get("sleeping") ?? "UNSURE");
  const plusOne = formData.get("plusOne") === "on";
  const plusOneName = String(formData.get("plusOneName") ?? "").trim() || null;
  const dietary = String(formData.get("dietary") ?? "").trim() || null;
  const mailingAddress =
    String(formData.get("mailingAddress") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!name) {
    return { ok: false, message: "Please add your name." };
  }
  if (!STATUSES.includes(statusRaw as RsvpStatus)) {
    return { ok: false, message: "Pick whether you're coming." };
  }
  const status = statusRaw as RsvpStatus;
  const sleeping = SLEEPING.includes(sleepingRaw as Sleeping)
    ? (sleepingRaw as Sleeping)
    : Sleeping.UNSURE;

  // Keep the user's display name in sync with what they typed.
  if (name !== user.name) {
    await prisma.user.update({ where: { id: user.id }, data: { name } });
  }

  await prisma.rsvp.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      status,
      plusOne,
      plusOneName: plusOne ? plusOneName : null,
      dietary,
      sleeping,
      mailingAddress,
      notes,
    },
    update: {
      status,
      plusOne,
      plusOneName: plusOne ? plusOneName : null,
      dietary,
      sleeping,
      mailingAddress,
      notes,
    },
  });

  revalidatePath("/rsvp");

  const confirmation =
    status === RsvpStatus.GOING
      ? "You're on the list. See you July 3rd."
      : status === RsvpStatus.MAYBE
        ? "Marked as maybe — update it anytime before the cutoff."
        : "Got it — sorry you can't make it.";
  return { ok: true, message: confirmation };
}
