# Private-Link Interactive BOV MVP (Multifamily Brokerage)

Production-quality MVP focused on **presentation brain** (owner-facing interactive BOV), while keeping Excel/manual underwriting as the source of financial truth.

## Phase 1: Architecture, Schema, Route Map, Component Plan, Data Strategy

### 1) App Architecture
- **Framework:** Next.js App Router + TypeScript + Tailwind.
- **Data layer:** Supabase-ready schema (auth, db, storage, RLS).
- **Presentation layer:** `app/share/[token]` with guided top-tab flow.
- **Admin layer:** `app/admin` for broker edit flow, visibility controls, share settings.
- **Service adapters:**
  - `lib/services/rates.ts` provider interface + cached snapshot.
  - `lib/services/area.ts` provider interface with `live/cache/manual` modes and normalized payload.
- **Core valuation interaction:** `ValueWorkbench` computes output values from manually entered assumptions without exposing formulas.

### 2) Database Schema
See `supabase/migrations/001_init.sql` for full DDL.
Includes:
- broker profiles, team branding, properties, photos, unit mix, underwriting snapshots + line items
- valuation assumptions + buckets + scenarios
- debt assumptions
- rent comps + sales comps
- area data payload + narrative
- share links with token/password/expiration/disable/visibility
- RLS policies for broker-owned editing

### 3) Route Map
- `/` home launcher
- `/admin` dashboard
- `/admin/properties/[id]/edit` admin edit flow
- `/share/[token]` owner-facing private link
- `/print/[token]` print-friendly export
- `/api/rates` cached rates snapshot endpoint
- `/api/share/[token]` share token validation endpoint

### 4) Component Plan
- `components/client/ShareExperience.tsx`
  - premium tab navigation + all client tabs
- `components/client/ValueWorkbench.tsx`
  - NOI slider, occupancy slider (formula-based output), cap sliders, reset
- `components/client/CompsMap.tsx`
  - Leaflet/OSM map with sales + rent comp popups
- Future modular split (for production hardening): one component per tab section and one chart component per metric family.

### 5) Data Strategy (Free/Low-Cost First)
- **Rates:** seeded provider + cache now; FRED/other free providers pluggable later.
- **Area data:** normalized schema with mode adapter
  - `live`: future public API pull
  - `cache`: imported snapshots
  - `manual`: broker-entered override (default for MVP)
- **Comps/underwriting:** manual entry + seeded demo.
- **No paid API required** for core MVP.

### 6) Phased Implementation Plan
1. Scaffold app/theme/types/services.
2. Build owner-facing tabbed experience (priority).
3. Build admin pages + edit shell.
4. Add Supabase SQL schema + RLS.
5. Add seeded Dallas demo content.
6. Add print view + share API + rates API.
7. QA pass + premium styling refinement.

## What is implemented now
- Premium light-theme branded interface with non-generic styling.
- Owner-facing tabs in required order.
- Interactive Value tab with baseline reset and dynamic outputs.
- Comps map + comp summaries.
- Admin dashboard + edit flow shell in requested section order.
- Rates snapshot service with server-side cache and source labels.
- Area adapter architecture and narrative generator.
- Share-link tokenized route and print-friendly export route.
- Seeded Dallas-area multifamily example in `lib/data/demo.ts`.

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open:
   - Home: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`
   - Client link: `http://localhost:3000/share/demo-dallas-token`

## Supabase Setup Instructions
1. Create a Supabase project.
2. Run migration file in SQL editor:
   - `supabase/migrations/001_init.sql`
3. Enable email auth.
4. Set env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Create storage bucket for property photos (e.g., `property-media`) and update upload logic when wiring fully.

## Vercel Deployment
1. Push repo to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.example`.
4. Build command: `npm run build`
5. Output: Next.js default.
6. Deploy.

## Notes
- MVP intentionally avoids rebuilding an underwriting engine.
- Underwriting logic remains manual-input driven and presentation-focused.
- Adapter architecture is ready for paid provider integrations (e.g., Yardi Matrix) in future phases.
