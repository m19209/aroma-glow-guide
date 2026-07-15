# Feature Specification: Aroma Glow Guide Fixes (007-aroma-glow-guide-fixes)

## 1. Description
This specification covers the comprehensive fixes, security hardening, performance optimizations, and code cleanup required for the "aroma-glow-guide" web application. The tasks range from resolving horizontal layout overflow bugs on mobile devices, preventing sensitive credential leaks, removing redundant test/scratch code, optimizing large assets (video and images), cleaning up global CSS overrides, to fixing critical security vulnerabilities in authentication (plain-text passwords in sheets, weak sessions, automatic admin promotion, unsalted password hashes, and rate-limiting).

## 2. Goals
- Eliminate all horizontal layout overflow on mobile screens (320px to 414px) and prevent page "sliding" or blank white space.
- Secure the Git repository by untracking and ignoring `.env` and `local.db`, and advise on rotating exposed credentials.
- Clean up unused test scripts and scratch code from the workspace.
- Optimize media assets (compress video under 2MB, convert heavy PNGs to WebP, apply lazy loading) to improve performance and prevent layout shift.
- Secure the authentication layer:
  - Stop sending passwords to Google Sheets.
  - Implement cryptographically secure sessions using UUIDs and a database-backed sessions table.
  - Disable insecure automatic admin promotion, using environment variables and manual scripts instead.
  - Hash passwords securely using PBKDF2 (100,000+ iterations, random salt).
  - Implement memory cleanup for local serverless rate limiting.

## 3. User Scenarios
- **Scenario 1 (Mobile Viewer)**: A user opens the website on a mobile device (iPhone 12/13/Pro). The layout fits perfectly, doesn't scroll horizontally, and the mobile menu/modals work cleanly without layout breaking.
- **Scenario 2 (Security and Data Privacy)**: A new user signs up. Their password is secure, hashed with a strong algorithm, not sent to Google Sheets, and their session identifier is a secure cryptographically generated token.
- **Scenario 3 (Performance)**: The landing page loads rapidly because the main hero video is small and the perfume assets are served in compressed WebP format.

## 4. Functional Requirements
- **Horizontal Overflow Fixes**:
  - Apply `overflow-x: hidden` and `max-width: 100%` on `html` and `body`.
  - Fix element margins, paddings, and widths on mobile breakpoints for `.magic-login-modal`, `.mobile-menu`, `.pdetail-modal`, `nav`, `.filter-chips`, `.marquee-track`, and `.products-grid`.
- **Sensitive Data & Git Cleanup**:
  - Add `.env` and `local.db` to `.gitignore`.
  - Untrack both files using `git rm --cached`.
- **Redundant Files Cleanup**:
  - Delete `test-*.ts` files from project root.
  - Clean up `scratch/` files (`add-admin.ts`, `add-role.ts`, `apply-dropdown.ts`) after checking for imports in `src/`.
- **Performance Optimizations**:
  - Compress `hero-video.mp4` using `ffmpeg` to under 2MB.
  - Convert `perfume-zahra.png` and `perfume-musk.png` to WebP format.
  - Define `aspect-ratio` or `width`/`height` on `<video>` tag.
  - Enable `loading="lazy"` on below-the-fold images.
- **CSS Overrides Cleanup**:
  - Clean up and merge styles in `global.css`, reducing redundant `!important` rules.
- **Authentication Security Hardening**:
  - Remove plain text password transmission to Google Sheets in `signupUser` (`src/lib/auth-service.ts`).
  - Generate cryptographically secure session IDs using `crypto.randomUUID()` and store sessions in a database table with an expiration date.
  - Remove bootstrap admin code from `ensureAdminFlag` in `src/lib/admin-service.ts`.
  - Hash passwords using PBKDF2 (100,000 iterations, unique salt per user) and store salts in the database.
  - Set up local memory cleanup interval for serverless rate limiting.
- **Order Price Validation & Rate Limiting (Task 7)**:
  - Inside `createOrder` in `src/lib/auth-service.ts`, calculate the correct price on the server side using the static `PRODUCTS` list or custom products from the database, ignoring user-supplied price inputs.
  - Reject the order with an error message `{ success: false, error: 'منتج غير موجود' }` if a product in the order is invalid.
  - Perform server-side total order cost calculations.
  - Implement rate limiting inside `createOrder` based on the user's phone number or IP, rejecting requests with an error message if the limit is exceeded (max 5 orders per minute).
  - Limit the number of items in the order (`items.length`) and individual item quantities (`quantity`) to reasonable values (e.g., max 50 items and max 10 quantity per item).

## 5. Success Criteria
- Website complies with the mobile-design criteria (no horizontal overflow on viewport widths 320px–414px).
- `.env` and `local.db` are removed from the git index.
- Heavy media assets are optimized (video < 2MB, target images converted to WebP).
- Authentication flow works correctly with secure PBKDF2 hashing, database sessions, and no password leak.
- Order creation validates item prices on the server, rejects fake/compromised prices, and enforces request rate-limiting.
- Project builds cleanly (`bun run build` passes with no errors).

## 6. Assumptions & Defaults
- Environmental configurations (like database schema changes) will be updated using Drizzle.
- Credentials previously checked into Git must be considered compromised and rotated.
- The project runs on Node/Vercel serverless environment.

## 7. Open Questions
None.

