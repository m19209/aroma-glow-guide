# Implementation Plan: Aroma Glow Guide Fixes (007-aroma-glow-guide-fixes)

## 1. Technical Context
- **Tech Stack**: React, Vite, TypeScript, TanStack Router (Start), SQLite (Drizzle ORM), Google Sheets API, CSS variables.
- **Target Files**:
  - `src/styles/global.css` (CSS cleanup, overflow prevention, layout adjustments)
  - `src/routes/index.tsx` (Body scroll locking, image lazy loading, aspect ratio)
  - `src/lib/auth-service.ts` (Authentication, password hashing, session tokens, rate limiting, order validation)
  - `src/lib/admin-service.ts` (Admin checks, remove auto promotion)
  - `src/lib/sheets.ts` (Google Sheets connection structure, password removal)
  - `src/lib/db/schema.ts` (Database schema updates for sessions table and passwordSalt column)
  - `.gitignore` (Ignore database and env files)

## 2. Architecture & Design Decisions
- **Mobile Overflow**: Add layout-containment wrappers and overflow rules. Ensure `.marquee-track` and `.products-grid` size properly inside viewport.
- **Git Security**: Move `local.db` and `.env` to `.gitignore`. Exclude them using Git CLI.
- **Clean Redundant Files**: Remove test scripts from root. Check imports to make sure no active code imports them.
- **Media Asset Optimization**:
  - Compress `hero-video.mp4` under 2MB using `ffmpeg` with compression settings `-vcodec libx264 -crf 28 -preset slow -an`.
  - Convert `perfume-zahra.png` and `perfume-musk.png` to WebP.
  - Add `aspect-ratio` to `<video>` css layout block to avoid layout shifts.
- **Security Hardening (Auth & Sessions)**:
  - Add a `sessions` table in Drizzle: `id` (text key), `userId` (text, references users), `expiresAt` (integer).
  - Switch session tracking to look up the DB session token rather than comparing raw user IDs from the `velore_session` cookie directly.
  - Replace plain SHA-256 with PBKDF2 hashing: use `crypto.subtle` APIs with 100,000 iterations and a unique 16-byte random salt for each user.
  - Add `passwordSalt` text column in the `users` table.
  - Remove auto admin bootstrap logic inside `ensureAdminFlag` and enforce promotion via `ADMIN_EMAILS` check or one-time setup scripts.
  - Prevent plain text password logs to Google Sheets.
- **Rate Limiting & Order Integrity**:
  - Store rate limit data in a server-side map. Add a periodic cleanup interval to purge old rate limit keys to prevent memory leaks in serverless/local runtimes.
  - Validate order prices on the server. Look up database/static product prices, calculate totals server-side, and discard client-provided totals or unit prices.
  - Rate-limit orders based on customer phone number/IP.

## 3. Phase 0: Research
- Run the provided diagnostics snippet in DevTools/node environment to identify overflow elements.
- Verify Drizzle migration commands to update SQLite schema.

## 4. Phase 1: Data Model & Contracts
- **Schema changes (`src/lib/db/schema.ts`)**:
  - `users` table: add `passwordSalt` column.
  - `sessions` table: new table.

## 5. Phase 2: Execution Phases
- **Phase 2.1**: Git & File Cleanup (untrack env/db, delete redundant files).
- **Phase 2.2**: CSS Overflow fixes and media compression.
- **Phase 2.3**: Database schema migration (add sessions table and password salt).
- **Phase 2.4**: Authentication overhaul (PBKDF2, session tokens, secure Google Sheets).
- **Phase 2.5**: Order price validation, rate-limiting, and memory leak cleanup.
- **Phase 2.6**: Final build and local verification.
