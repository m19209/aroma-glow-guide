# Tasks: Mobile Navbar Redesign

## Phase 1: Foundational Updates (CSS)
- [x] T001 [US1] Update `src/styles/global.css` to hide text labels (.login-label, .cart-label) on mobile screens (< 768px).
- [x] T002 [US1] Update `src/styles/global.css` to enlarge touch targets (min 44x44px) for navbar buttons.
- [x] T003 [US1] Update `src/styles/global.css` to refine layout of `.nav-right` and `.nav-brand` to prevent overlapping on 375px screens.

## Phase 2: Component Updates (JSX)
- [x] T004 [US2] Modify `src/routes/index.tsx` to conditionally move Search and Auth options into the `mobile-menu` overlay or ensure they don't clutter the top bar on mobile.
- [x] T005 [US2] Modify `src/routes/index.tsx` to streamline the top nav bar (keeping Logo, Hamburger Menu, and Cart icon visible).
- [x] T006 [US2] Update the `mobile-menu` in `src/routes/index.tsx` to include Search and Login/Account/Logout links inside the drawer.

## Phase 3: Polish & Verification
- [x] T007 Verify mobile layout at 375px using responsive design mode.
- [x] T008 Verify that desktop layout (> 768px) remains unchanged and fully functional.
