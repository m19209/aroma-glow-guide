# Implementation Plan: Back to Top Button

## 1. Technical Context
- **Tech Stack**: React, TypeScript, Vite, CSS variables.
- **Target Files**:
  - `src/components/BackToTop.tsx` (New Component)
  - `src/styles/global.css` (Styles for the button)
  - `src/routes/index.tsx` (Integration)

## 2. Architecture & Design Decisions
- **Component Separation**: We will create a dedicated `<BackToTop />` component to isolate the scroll-event listener logic, preventing unnecessary re-renders in the massive `Index` component.
- **Animation Strategy**: The button will be persistently rendered in the DOM but hidden via `opacity: 0` and `pointer-events: none` when `window.scrollY <= 300`. This allows CSS `transition: opacity 0.3s ease` to work smoothly per the UI/UX Pro Max guidelines.
- **Theme & Aesthetics**: The button will use `var(--charcoal)` for the background and `var(--gold)` for the icon, matching the "buy" buttons. It will have a subtle box-shadow that elevates on hover.
- **Positioning**: Fixed to the bottom-left (`bottom: 24px`, `left: 24px`) with a high z-index (e.g., `250`).
- **Touch Targets & Accessibility**:
  - Explicit `width: 48px; height: 48px;` to exceed the 44x44px minimum.
  - `<button aria-label="العودة إلى الأعلى">` for screen readers.
  - SVG icon (Lucide/Heroicons standard upward arrow).
  - Global `*:focus-visible` ring applies automatically based on earlier redesigns.

## 3. Phase 0: Research
- No outstanding clarifications needed. Standard React `useEffect` scroll listeners and CSS transitions will be used.

## 4. Phase 1: Data Model & Contracts
- *Not Applicable*: This is a pure UI feature. No database models or API contracts are involved.

## 5. Phase 2: Execution Phases
### Setup
- Create `src/components/BackToTop.tsx`.

### Core Development
- Implement the React component with `useState` and `useEffect` for the `scrollY` threshold (300px).
- Add the `scrollToTop` handler (`window.scrollTo({ top: 0, behavior: "smooth" })`).

### Integration
- Import and mount `<BackToTop />` in `src/routes/index.tsx` at the root level (just above the Toast).

### Polish & CSS
- Add `.back-to-top` classes to `src/styles/global.css` with the 300ms transitions and 48x48px touch targets.
- Ensure responsive checks on mobile (375px) so it doesn't overlap the mobile menu or other elements.
