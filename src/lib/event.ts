// Single source of truth for the event's when/where, used by the countdown,
// the add-to-calendar links, and page copy.

export const EVENT = {
  name: "July 3rd Kickback '26",
  tagline: "Year three. Friday, July 3, 2026. Mobile Bay.",
  // 5:00 PM Central (CDT, UTC-5) on Friday, July 3, 2026.
  startIso: "2026-07-03T17:00:00-05:00",
  // Runs into the night — 1:00 AM Central.
  endIso: "2026-07-04T01:00:00-05:00",
  location: "Mobile Bay, AL",
  url: "https://kickback26.com",
  details:
    "Year three of the July 3rd Kickback. Swimming, cornhole, grilling, bonfire, and 4th-of-July-eve fireworks. RSVP at https://kickback26.com",
} as const;

// Format a Date as the UTC "basic" form calendars expect: YYYYMMDDTHHMMSSZ.
function toCalUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Google Calendar "add event" template URL.
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.name,
    dates: `${toCalUtc(EVENT.startIso)}/${toCalUtc(EVENT.endIso)}`,
    details: EVENT.details,
    location: EVENT.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
