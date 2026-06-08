"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "@/app/actions";

export type RsvpInitial = {
  name: string;
  email: string;
  status: "GOING" | "MAYBE" | "NO" | "";
  plusOne: boolean;
  plusOneName: string;
  dietary: string;
  sleeping: "HOUSE" | "TENT" | "CAR" | "COMMUTING" | "UNSURE";
  mailingAddress: string;
  notes: string;
};

const SLEEPING_OPTIONS: { value: RsvpInitial["sleeping"]; label: string }[] = [
  { value: "HOUSE", label: "Crashing at the house" },
  { value: "TENT", label: "Bringing a tent" },
  { value: "CAR", label: "Sleeping in my car" },
  { value: "COMMUTING", label: "Heading home that night" },
  { value: "UNSURE", label: "Not sure yet" },
];

const field =
  "rounded-lg border border-bay-fog/50 bg-bay-deep/70 px-4 py-3 text-sand placeholder:text-sand-dim/60 outline-none focus:border-sunset";
const labelCls = "font-display text-sand text-sm tracking-wide";

export default function RsvpForm({ initial }: { initial: RsvpInitial }) {
  const [state, action, pending] = useActionState<RsvpState, FormData>(
    submitRsvp,
    null,
  );
  const [plusOne, setPlusOne] = useState(initial.plusOne);

  return (
    <form action={action} className="flex flex-col gap-5">
      <p className="text-sand-dim text-sm">
        Signed in as <span className="text-sand">{initial.email}</span>. Update
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
              className="flex cursor-pointer items-center justify-center rounded-lg border border-bay-fog/50 bg-bay-deep/40 px-3 py-3 text-center text-sand has-[:checked]:border-sunset has-[:checked]:bg-sunset/15"
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
        <label className="flex items-center gap-3 text-sand">
          <input
            type="checkbox"
            name="plusOne"
            defaultChecked={initial.plusOne}
            onChange={(e) => setPlusOne(e.target.checked)}
            className="h-4 w-4 accent-sunset"
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
            <option key={o.value} value={o.value} className="bg-bay-deep">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dietary" className={labelCls}>
          Dietary needs <span className="text-sand-dim">(optional)</span>
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
          Mailing address{" "}
          <span className="text-sand-dim">(for your wristband)</span>
        </label>
        <textarea
          id="mailingAddress"
          name="mailingAddress"
          rows={2}
          defaultValue={initial.mailingAddress}
          placeholder="Street, city, state, ZIP"
          className={field}
        />
        <p className="text-sand-dim text-xs">
          We mail every guest a printed wristband. Skip it if you&rsquo;d rather
          grab yours at the door.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelCls}>
          Anything else? <span className="text-sand-dim">(optional)</span>
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
        className="mt-2 rounded-full bg-sunset px-6 py-3 font-display text-bay-deep text-lg tracking-wider transition-colors hover:bg-sunset-warm disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save my RSVP"}
      </button>

      {state && (
        <p
          role="status"
          className={`text-sm ${state.ok ? "text-sunset-warm" : "text-red-300"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
