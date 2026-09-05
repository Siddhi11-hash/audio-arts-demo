# audio arts — owner-admin frontend demonstration

A production-oriented redesign for **audio arts**, built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion and Lucide React.

## Scope
This repository is a **frontend demonstration**. It includes the public website, booking UX, and a single **studio owner / admin console** — there is no separate client-facing login. Content the owner manages (rooms, portfolio items, services, contact details) is stored in `localStorage` via `src/lib/content.ts` and is read directly by the public pages, so edits made in the admin console appear on the live site immediately. Operational records (bookings, client directory) are demo-only local records. There is no production authentication, payment processing, calendar connection, cloud storage or external upload service.

## Routes
Public: `/`, `/studio`, `/services`, `/services/:service`, `/portfolio`, `/booking`, `/contact`, `/quote`

Owner / Admin: `/admin/login`, `/admin`, `/admin/rooms`, `/admin/portfolio`, `/admin/services`, `/admin/bookings`, `/admin/clients`, `/admin/projects`, `/admin/messages`, `/admin/settings`

- **Rooms, Portfolio, Services** — full add / edit / delete for the studio owner. Changes write to `src/lib/content.ts`'s localStorage-backed store and are picked up by the public Studio, Portfolio, Services and Home pages, and by the booking flow.
- **Site settings** — edit studio name, phone, email, WhatsApp, Instagram, business hours and address; reflected on the public Contact page and site footer.
- **Bookings, Clients, Projects, Messages** — internal studio-operations views for the owner (demo data, local to the browser).

## Build verification
This delivery's code changes were made and manually reviewed (bracket/JSX balance, import/reference checks) in an environment without package-registry access, so `npm install` / `npm run build` could not be executed here to produce a fresh `dist/`. **Run `npm install && npm run build` yourself before deploying** and treat a clean, zero-TypeScript-error build as the final gate — the included `dist/` predates this pass's changes.

## Run
Requires Node 20+.

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

`npm install` will generate a fresh `package-lock.json` from the exact, non-floating dependency versions pinned in `package.json` (no `"latest"` tags). Before shipping to production, run `npm run audit` (or `npm audit`) and update any dependency with a published advisory — this environment had no network access to run that check at build time.

## Demo access
`/admin/login` accepts any non-empty email/password for demonstration — this is the studio owner's login, not a client-facing account. No credentials are persisted — a `sessionStorage` flag (cleared on tab close, or via "Exit admin") only gates whether the portal UI renders, and disappears entirely once real authentication is added. All `/admin/*` routes require passing through this gate; direct navigation to an admin URL redirects to `/admin/login` instead of rendering the page.

Admin routes are excluded from search indexing via `robots.txt`, a per-route `<meta name="robots" content="noindex, nofollow">` tag, and an `X-Robots-Tag` response header, so demo client names and bookings can't surface in search results.

## Configuration
Seed business information and service content lives in `src/config/brand.ts` — including `brand`, `services`, `studios`, `team`, `testimonials`, `portfolio`, `equipment`, `industries`, `whyUs`, `process` and `faqs`. Rooms, portfolio items, services and contact details can now be edited directly by the studio owner from `/admin` (see `src/lib/content.ts`) without touching code; `brand.ts` only supplies the first-run defaults. Replace placeholders only with owner-approved details. Replace the visual slots with approved studio photography and the audio states with approved audio assets.

**Team names:** the `team` array intentionally holds only a number, role and bio (no invented personal names) — the public site renders "Engineer 01 / 02 / 03 / 04" with generic role titles. When the client supplies real names and photos, extend the `team` objects with a `name` field and swap `TeamCard` (in `src/components/UI.tsx`) to display it. Do not fabricate names in the meantime.

**Homepage sections:** the fuller editorial flow is now built out — Creative Process (animated signal pipeline), Why Audio Arts, Industries, and FAQ all live in `Home()` in `src/pages/Public.tsx`, sourced from the corresponding `brand.ts` arrays. The Services page (`Services()`) uses a hover/click-driven large-title interaction instead of a static list. The "Hear the difference" section uses `BeforeAfterPlayer` (before/after toggle) rather than a single player.

**Color system:** `tailwind.config.js` now includes `violet` (#6d5bff) and `blue` (#3aa0ff) alongside the existing `ink`, `charcoal`, `navy` and `green`, matching the black → navy → blue/violet → neon-green hierarchy. Green stays reserved for waveform/meter/active-state accents; violet and blue appear only in the scroll rail and the diagonal shard/band motif described below — avoid making either dominant.

**Signature visual motif — not generic decoration:** the diagonal green/charcoal wall treatment visible in the studio's own `console-detail.jpg` photo is echoed as a real design element (`.hero-shard`, `.diagonal-band` in `src/index.css`) — a clipped, striped panel used in the hero and as a section divider. This replaces a generic radial "SaaS glow" from an earlier pass and is derived from the client's own asset rather than any reference site.

**Numbering system:** every decorative index across the site (service list, process pipeline, use-case lists) now renders as an SMPTE-style timecode (`00:00:00:01`, via the `tc()` helper in `src/components/UI.tsx`) instead of the generic "01 / 02 / 03" pattern common to agency templates. The nav uses `CH.01`, `CH.02`... (channel numbering) for the same reason.

**Navigation:** `Navbar.tsx` no longer uses plain text links — each nav item is a two-line "channel strip" element (channel number + label) with a fader-style underline that fills on hover/active, rather than a generic pill or simple color-change link.

**Scroll rail:** `src/components/ScrollRail.tsx` renders a fixed, functional vertical progress indicator styled like a tape/timeline scrubber (mounted in `PublicLayout.tsx`, desktop only) — a bespoke, on-brand alternative to a generic top-of-page progress bar.

**Hero:** rebuilt from a boxed "headline left / photo right" split (a very common agency-template layout) into a full-bleed composition — the real studio photo as background, the headline overlaid directly on it, a level-meter row and a signal-line accent under the subhead, and the diagonal shard motif in the corner.

**Services page:** rebuilt as a hover/click-driven large-title list with a live detail panel (`Services()` in `src/pages/Public.tsx`), replacing the earlier plain divided list.

## Persistence
`src/lib/storage.ts` is the single localStorage abstraction. It handles JSON parsing failures by returning safe fallbacks. Demo bookings and messages are browser-local only. Owner content edits (rooms, portfolio, services, contact details) are also browser-local via `src/lib/content.ts`.

## Security limitations
This frontend must not be treated as production authentication or authorization. The `sessionStorage`-based portal gate (`src/lib/auth.ts`) only prevents casually stumbling into `/admin` by URL — it is trivially bypassable from devtools and carries no real trust boundary. Never put secrets, API keys or passwords in Vite client variables. If a backend is added, use HTTPS-only APIs, secure `HttpOnly` + `Secure` + appropriate `SameSite` cookies, CSRF protection, server-side authorization and server-side validation, and remove `src/lib/auth.ts` entirely in favor of real session checks. File uploads require authenticated, authorized backend handling and malware/content controls.

## HTTPS and deployment
Vercel, Netlify, Cloudflare Pages, Nginx and Apache can terminate HTTPS. The frontend does not create certificates. Use HTTPS-only API endpoints and configure HSTS at the production edge once HTTPS is enforced. `public/_headers` provides a Cloudflare/Netlify-style baseline for security headers; adapt equivalent headers for Nginx/Apache.

React Router requires SPA fallback configuration so direct requests to `/studio`, `/booking`, `/admin`, etc. resolve to `index.html`.

## Security headers
Baseline headers include CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and frame protection. HSTS is documented rather than enabled in the static frontend because it is an origin-level deployment decision.

## Environment variables
`.env.example` contains only non-secret placeholders actually intended for future integration.

## Future production architecture
Recommended additions: API service, database, real identity/authentication, server-side booking availability, object storage/CDN for audio, transactional email, WhatsApp/SMS, calendar integration, payment gateway, audit logging, monitoring and analytics. Keep credentials server-side.

## QA checklist
Run typecheck and production build. Manually verify every route, responsive breakpoints (320–1920px), keyboard navigation, gallery lightbox, booking persistence, forms, owner admin CRUD (rooms/portfolio/services/settings), admin tables, and demo states. Browser console should contain no implementation warnings or errors.

## Assets
The submitted ZIP did not contain approved studio photography or audio files. The redesigned experience therefore uses explicitly labeled visual/audio placeholders rather than inventing client assets or business claims.

## Design refresh (this pass)
This pass restyled the entire product without changing page structure, routes, or component logic — a skin-level redesign so the "everything" look-and-feel could be updated safely without a network-connected build environment to verify against.

**What changed:**
- **Typography:** display face swapped from Manrope to Space Grotesk (more geometric/technical, less generic-agency), mono swapped from DM Mono to JetBrains Mono for a more recognizable "console readout" feel. Body stays Inter.
- **Palette:** refined every token in `tailwind.config.js` — the near-black is warmer, navy is deeper, and the signal green moved from a yellow-leaning neon to a more controlled lime (`#a3e635`) so it reads as a precision instrument accent rather than gaming neon. Violet/blue accents were softened to match.
- **Signature motif:** the hero's diagonal green stripe panel (`.hero-shard`) was replaced with a fine dot-grid "calibration frame" with corner brackets — closer to studio-monitor/viewfinder calibration marks, and deliberately moved away from anything that could read as cyberpunk.
- **Section dividers:** `.diagonal-band` moved from a diagonal stripe fill to a thin vertical rule pattern with a glowing top hairline — a subtler "ruler" texture.
- **Grain:** a very low-opacity animated-free noise texture was added over the whole page (`body::after`, disabled under `prefers-reduced-motion`) for a filmic, less flat-vector feel.
- **Footer:** rebuilt larger and more editorial, with a signal-line divider above it and the wordmark set at display scale.
- Every other page and component (services, portfolio, booking, the admin portal, forms, cards, audio players) inherits this refresh automatically because they consume the same shared CSS classes and Tailwind color tokens — nothing about their markup, state, or routes changed.

**Verification note:** this sandbox has no network access, so `npm install` / `npm run build` could not be executed here. No syntax errors were found in a structural TypeScript pass over every `.ts`/`.tsx` file, but please run the standard `npm install && npm run typecheck && npm run build` yourself before shipping.
