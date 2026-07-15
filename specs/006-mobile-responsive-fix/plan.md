# Implementation Plan: Mobile Responsiveness Overhaul (006-mobile-responsive-fix)

## 1. Technical Context
- **Tech Stack**: React, TypeScript, Vite, CSS.
- **Target Files**:
  - `src/styles/global.css` (Responsive media queries, touch targets, grids, modal adjustments)
  - `src/routes/index.tsx` (Scroll lock adjustments for iOS, menu behavior)

## 2. Architecture & Design Decisions
- **Mobile-First Responsiveness**: Add media queries at standard breakpoints (1024px, 768px, 480px) to global CSS.
- **Touch targets**: Ensure all buttons and links on mobile have min-height and min-width of at least 44px to satisfy mobile-design constraints.
- **No Overflow Scrolling**: Set `overflow-x: hidden` globally where needed to prevent horizontal scrolling on small (320px) screens.
- **Layout Grids**: Product grid changes dynamically (e.g. 4 columns on desktop, 2 columns on tablet, 1 column on mobile).
- **iOS Body Scroll Lock**: Adjust `useEffect` in `index.tsx` using `position: fixed` and dynamic top-offsets when modals are open to handle iOS-specific bounce scroll bugs.

## 3. Phase 0: Research
- Standard CSS media queries and React viewport event listeners are sufficient. No external dependencies are introduced.

## 4. Phase 1: Data Model & Contracts
- *Not Applicable*: This is a pure UI/UX responsiveness overhaul.

## 5. Phase 2: Execution Phases
### Setup & Verification
- Check existing `global.css` and `index.tsx` states.

### Core CSS Overhaul
- Write `@media` queries to optimize typography (`clamp()` or responsive classes), navigation links (collapsed to hamburger on small viewports), buttons, drawer sizing, and grid adjustments.
- Set up fallback modes for hover effects on touch-based devices.

### iOS & Mobile Scroll Locks
- Update `index.tsx` to handle robust iOS scroll-locking.

### Verification
- Validate page layout on mobile/tablet viewports.
