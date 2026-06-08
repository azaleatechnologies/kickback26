import { sendMagicLink } from "@/app/actions";

// Magic-link sign-in. Enter email → Auth.js emails a one-click sign-in link.
export default function SignInForm() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-bay-fog/40 bg-bay-mid/50 p-8">
      <h2 className="font-display text-foam text-3xl">Sign in to RSVP</h2>
      <p className="mt-3 text-sand-dim text-sm">
        No password. Drop your email and we&rsquo;ll send a one-tap sign-in link.
        That email becomes how we reach you about the Kickback.
      </p>
      <form action={sendMagicLink} className="mt-6 flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="rounded-lg border border-bay-fog/50 bg-bay-deep/70 px-4 py-3 text-sand placeholder:text-sand-dim/60 outline-none focus:border-sunset"
        />
        <button
          type="submit"
          className="rounded-full bg-sunset px-6 py-3 font-display text-bay-deep text-lg tracking-wider transition-colors hover:bg-sunset-warm"
        >
          Send my link
        </button>
      </form>
    </div>
  );
}
