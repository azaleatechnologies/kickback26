import { googleCalendarUrl } from "@/lib/event";

// Two ways to save the date: a Google Calendar template link and a downloadable
// .ics (Apple Calendar, Outlook, etc.). The .ics is a static file in /public.
export default function AddToCalendar() {
  const pill =
    "inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-white text-xs tracking-widest uppercase transition-opacity hover:opacity-70";
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-white text-xs tracking-widest uppercase text-shadow-sm">
        Save the date
      </span>
      <a
        className={pill}
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Calendar
      </a>
      <a className={pill} href="/kickback26.ics" download>
        Apple / Outlook (.ics)
      </a>
    </div>
  );
}
