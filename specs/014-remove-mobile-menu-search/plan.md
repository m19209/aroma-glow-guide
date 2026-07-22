# Implementation Plan: Remove Search Section from Mobile Menu

**Goal**: Remove the mobile search input from inside `.mobile-menu` in `src/routes/index.tsx`.

## Proposed Changes

### `src/routes/index.tsx`
- Delete `.mobile-search-wrapper` container and its child `<input>` element inside `{mobileOpen && <div className="mobile-menu open">...` (lines 442-452).

## Verification Plan
- Open mobile hamburger menu on `http://localhost:3000/`; verify search section is gone and drawer renders navigation links cleanly.
