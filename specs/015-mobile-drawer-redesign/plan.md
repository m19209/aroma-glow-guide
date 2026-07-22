# Implementation Plan: Simple & Luxury Mobile Hamburger Menu Redesign

**Goal**: Redesign the mobile drawer component in `src/routes/index.tsx` and `.mobile-menu` CSS in `src/styles/global.css` for a clean, simple, and high-end experience.

## Proposed Changes

### 1. `src/routes/index.tsx`
- Update `{mobileOpen && <div className="mobile-menu open">...` layout:
  - Add Header: Brand Name "VELORE" + Close Button `✕`.
  - Navigation Items: Collection, My Account / Logout / Login.
  - Footer: Segmented language toggle pill (`English` / `العربية`).

### 2. `src/styles/global.css`
- Refine `.mobile-menu` padding, flex gap, border, and backdrop effects.
- Style `.mobile-menu-header`, `.mobile-nav-item`, and `.mobile-lang-segmented`.

## Verification Plan
- Click hamburger icon on mobile viewports (<768px); verify clean header, spacious nav links, and segmented language toggle.
- Verify 100% responsiveness and zero layout jumping when switching languages.
