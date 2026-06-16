import { sendMagicLink } from "@/app/actions";

export default function SignInForm() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8">
      <h2 className="font-display text-white text-3xl">Sign in to RSVP</h2>
      <p className="mt-3 text-white/60 text-sm">
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
          className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/60"
        />
        <button
          type="submit"
          className="rounded-full bg-white text-black px-6 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
        >
          Send my link
        </button>
      </form>
    </div>
  );
}
