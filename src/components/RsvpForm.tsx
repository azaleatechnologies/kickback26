"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { submitRsvp, type RsvpState } from "@/app/actions";

export type RsvpInitial = {
  name: string;
  email: string;
  status: "GOING" | "MAYBE" | "NO" | "";
  plusOne: boolean;
  plusOneName: string;
  dietary: string;
  sleeping: "HOUSE" | "UNSURE";
  mailingAddress: string;
  notes: string;
};

const SLEEPING_OPTIONS: { value: RsvpInitial["sleeping"]; label: string }[] = [
  { value: "HOUSE", label: "At the house" },
  { value: "UNSURE", label: "Wherever I pass out" },
];

const field =
  "rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/60";
const labelCls = "text-white/80 text-sm tracking-wide";

export default function RsvpForm({ initial }: { initial: RsvpInitial }) {
  const [state, action, pending] = useActionState<RsvpState, FormData>(
    submitRsvp,
    null,
  );
  const [plusOne, setPlusOne] = useState(initial.plusOne);
  const [editing, setEditing] = useState(false);

  // Whenever a save succeeds, drop back out of edit mode so the
  // confirmation screen shows (including after re-saving an edit).
  useEffect(() => {
    if (state?.ok) setEditing(false);
  }, [state]);

  if (state?.ok && !editing) {
    const headline =
      state.status === "GOING"
        ? "You’re on the list"
        : state.status === "MAYBE"
          ? "You’re down as a maybe"
          : "Thanks for the heads up";

    return (
      <div className="flex flex-col items-start gap-5" role="status">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-white"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div>
          <h2 className="font-display text-white text-4xl sm:text-5xl">
            {headline}
          </h2>
          <p className="mt-2 text-white/80">{state.message}</p>
        </div>

        <p className="text-white/50 text-sm">
          Saved for {initial.email}. You can change your answer anytime before
          the cutoff.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/guests"
            className="rounded-full bg-white text-black px-6 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
          >
            See who&rsquo;s going
          </Link>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full border border-white text-white px-6 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
          >
            Edit my RSVP
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <p className="text-white/50 text-sm">
        Signed in as <span className="text-white">{initial.email}</span>. Update
        your answers anytime before the cutoff.
      </p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelCls}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={initial.name}
          placeholder="First & last"
          className={field}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelCls}>Are you coming?</legend>
        <div className="mt-1 grid grid-cols-3 gap-3">
          {(
            [
              ["GOING", "I'm in"],
              ["MAYBE", "Maybe"],
              ["NO", "Can't make it"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center justify-center rounded-lg border border-white/30 bg-white/10 px-3 py-3 text-center text-white has-[:checked]:border-white has-[:checked]:bg-white/20 backdrop-blur-sm"
            >
              <input
                type="radio"
                name="status"
                value={value}
                required
                defaultChecked={initial.status === value}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            name="plusOne"
            defaultChecked={initial.plusOne}
            onChange={(e) => setPlusOne(e.target.checked)}
            className="h-4 w-4 accent-white"
          />
          Bringing a +1
        </label>
        {plusOne && (
          <input
            name="plusOneName"
            defaultValue={initial.plusOneName}
            placeholder="Who are you bringing?"
            className={field}
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="sleeping" className={labelCls}>
          Sleeping arrangement
        </label>
        <select
          id="sleeping"
          name="sleeping"
          defaultValue={initial.sleeping}
          className={field}
        >
          {SLEEPING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-sky-800">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dietary" className={labelCls}>
          Dietary needs <span className="text-white/40">(optional)</span>
        </label>
        <input
          id="dietary"
          name="dietary"
          defaultValue={initial.dietary}
          placeholder="Veg, allergies, etc."
          className={field}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="mailingAddress" className={labelCls}>
          Mailing address
        </label>
        <textarea
          id="mailingAddress"
          name="mailingAddress"
          rows={2}
          defaultValue={initial.mailingAddress}
          placeholder="Street, city, state, ZIP"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelCls}>
          Anything else? <span className="text-white/40">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          defaultValue={initial.notes}
          placeholder="Arrival time, what you're bringing, requests…"
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-white text-black px-6 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-40"
      >
        {pending ? "Saving…" : "Save my RSVP"}
      </button>

      {state && !state.ok && (
        <p role="status" className="text-sm text-red-300">
          {state.message}
        </p>
      )}
    </form>
  );
}
