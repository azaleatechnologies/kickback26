# July 3rd Kickback '26 — site

Event site for the third annual Kickback. Friday, July 3, 2026. Mobile Bay.

- **Production URL:** kickback26.com (registered 2026-05-19, not yet deployed)
- **Deploy target:** Azalea Technologies mac mini (192.168.1.138) via Coolify
- **Master plan:** `../PLAN.md`
- **Design system:** `../DESIGN.md`

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- Fonts: Anton (display) + Inter (body), both via `next/font/google`
- DB: Postgres 17 (shared instance on the Azalea mini, dedicated `kickback26` schema)
- ORM: Prisma
- Auth: NextAuth magic-link (email = account)
- Deploy: Docker (Next.js standalone output) → Coolify → Cloudflare tunnel → kickback26.com

## Getting started (local dev)

```bash
# If a partial node_modules exists from previous setup, blow it away first:
rm -rf node_modules

npm install
npm run dev
```

Then open http://localhost:3000.

## Current state

Phase 2.0 (scaffold). The placeholder landing page shows the locked visual identity — coastal palette, festival type, hero countdown — but RSVP/auth/data aren't wired yet.

## Project layout

```
src/
  app/
    layout.tsx       # Root layout, font loading, base body styles
    page.tsx         # Landing page (placeholder hero + countdown)
    globals.css      # Tailwind 4 + design tokens (palette, fonts)
  components/
    Countdown.tsx    # Client component: live ticker to 2026-07-03 17:00 CDT
```

## Next milestones

1. **MVP (target: T-6 weeks, May 22):** RSVP form, magic-link auth, data persistence (SQLite + Prisma).
2. **Phase 2 (week 4–6):** theme vote, kitty tracker, chat wall, Spotify embed.
3. **Phase 3 (week 7–8):** photo upload, day-of dashboard, schedule of bits.
4. **Post-event:** photo gallery, guestbook, archive page.

See `../PLAN.md` for the full timeline and `../DESIGN.md` (forthcoming) for design system specs.
