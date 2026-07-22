# Feature Specification: Simple & Luxury Mobile Hamburger Menu Redesign

**Feature Name**: `015-mobile-drawer-redesign`  
**Status**: Draft  
**Target Components**: `src/routes/index.tsx`, `src/styles/global.css`

## User Scenarios & UX Principles (UI/UX Pro Max & UI/UX Designer)
- **Minimalist Luxury & Elegance**: Redesign the mobile drawer to look clean, spacious, and premium.
- **Top Header Bar**: Add a VELORE brand title and dedicated `✕` close button for clear dismiss affordance.
- **Iconic Action Links**: Present navigation items (`Collection`, `My Account / Login`) as elegant list items with luxury icon indicators.
- **Segmented Language Toggle**: Integrate a luxury segmented toggle (`[ English ] [ العربية ]`) at the bottom of the drawer.

## Functional Requirements
1. **Drawer Header**: VELORE logo + close button (`✕`).
2. **Navigation List**: Clean list with subtle hover/active states.
3. **Language Switcher**: Glassmorphic segmented control.
4. **Touch & Ergonomics**: All targets meet 44x44px minimum touch target size.

## Success Criteria
- [x] Simple, un-cluttered mobile drawer layout.
- [x] Smooth slide-in/fade transition.
- [x] Full i18n and RTL/LTR support.
