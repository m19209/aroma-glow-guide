# Implementation Plan: Mobile Navbar Redesign

## 1. Technical Context
- **Tech Stack**: React (tsx) with custom CSS (`global.css`). No UI frameworks (Tailwind, MUI) are used for the navbar.
- **State Management**: React `useState` hooks for toggling modals (cart, login, search) and the mobile menu.
- **CSS Strategy**: Use `@media (max-width: 768px)` blocks inside `global.css` to override desktop layout rules for mobile viewports without altering the desktop experience.

## 2. Architecture & Design Choices
### 2.1 CSS (Styling Layer)
- **Hiding Labels**: We will use `display: none;` on text labels inside navbar buttons exclusively within the mobile media query.
- **Touch Targets**: We will ensure `.nav-actions button` has a minimum dimension of `44x44px` (Apple HIG standard) on mobile, applying padding if necessary.
- **Layout Adjustments**: `.nav-right` will have its gap reduced to prevent overflow on `375px` screens.

### 2.2 React (Component Layer)
- **Streamlining `index.tsx` Nav**:
  - The desktop nav contains the Hamburger, Logo, Search, User, and Cart.
  - On mobile, we will hide the Search and User buttons from the main `.nav-right` flex container using CSS.
- **Overlay Menu (`.mobile-menu`)**:
  - The existing mobile menu triggered by the Hamburger icon will be expanded.
  - We will inject "Search" and "Login / Account" buttons directly inside the `.mobile-menu` overlay, so they are accessible once the user opens the menu.

## 3. Data Model
- *No changes to data models.* This is a pure UI/UX change.

## 4. Constitution Check
- **Minimalism**: Removing text labels heavily cleans the UI.
- **Accessibility**: 44x44px touch targets improve mobile usability.
- **Performance**: No new heavy libraries are introduced; purely CSS and standard React.

## 5. Phases
1. **Foundational Updates (CSS)**: Update `global.css` for media queries, hiding text, and adjusting flex gaps.
2. **Component Updates (JSX)**: Refactor `index.tsx` to include hidden elements inside the mobile drawer.
3. **Polish & Verification**: Test at `375px` and `> 768px` to ensure responsive boundaries hold.
