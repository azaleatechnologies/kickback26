import Link from "next/link";
import AddToCalendar from "@/components/AddToCalendar";

export const metadata = {
  title: "Info · July 3rd Kickback '26",
};

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-bay-fog/30 py-7">
      <h2 className="font-display text-sunset-warm text-sm tracking-[0.3em]">
        {heading}
      </h2>
      <div className="mt-3 text-sand-dim leading-relaxed">{children}</div>
    </section>
  );
}

export default function InfoPage() {
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
          The Info
        </h1>
        <p className="mt-3 text-sand-dim">
          Everything you need for July 3rd. More fills in as the date gets close.
        </p>

        <Block heading="When">
          Friday, July 3, 2026. Doors / first dip around 5 PM, rolling into the
          night with the bonfire and 4th-of-July-eve fireworks.
        </Block>

        <Block heading="Where">
          Mobile Bay — Michael&rsquo;s place. The exact address and parking notes
          go out to everyone who&rsquo;s RSVP&rsquo;d as the date gets closer
          (kept off the public page on purpose).
        </Block>

        <Block heading="What to bring">
          Swimsuit and a towel, a chair if you want one, and whatever you want to
          drink. If you&rsquo;re contributing to the grill or bringing a dish,
          note it in your RSVP so we don&rsquo;t end up with twelve bags of chips.
        </Block>

        <Block heading="Where to crash">
          There&rsquo;s floor and couch space at the house, room to pitch a tent,
          and the option to head home that night. Tell us your plan in the RSVP
          so we can sort sleeping spots.
        </Block>

        <Block heading="Wristbands">
          Every guest gets a printed wristband in the mail before the event —
          add your mailing address to your RSVP by the cutoff to get yours.
        </Block>

        <div className="mt-10 flex flex-col items-start gap-4">
          <Link
            href="/rsvp"
            className="inline-flex items-center justify-center rounded-full bg-sunset px-8 py-3 font-display text-bay-deep text-xl tracking-wider transition-colors hover:bg-sunset-warm"
          >
            RSVP
          </Link>
          <AddToCalendar />
        </div>
      </div>
    </main>
  );
}
