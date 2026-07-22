# Feature Specification: Navbar Layout Stability & Comprehensive Bug Audit

**Feature Name**: `011-navbar-stability-and-bug-audit`  
**Status**: Draft  
**Target Components**: Navigation Bar (`src/routes/index.tsx`, `src/styles/global.css`), All Store Pages & Modals

## User Scenarios & UX Principles
- **Navbar Layout Stability**: Stabilize all navbar elements (Logo, Navigation Links, Search Bar, Login/Account Button, Language Switcher, Cart Button) so that switching languages or scrolling does not cause layout jumping, shifting, overlapping, or alignment pop-in.
- **Comprehensive Bug Audit**: Detect and resolve any hidden UI bugs, missing translation keys, layout collisions, edge-case null checks, or broken links across the entire store.

## Functional Requirements
1. **Navbar Fixes**:
   - Give `.nav-right` and `.magic-login-btn` fixed min-widths and consistent flex gaps (`gap: 12px` to `16px`).
   - Fix search input (`.nav-search`) width and placeholder text truncation across English and Arabic.
   - Maintain uniform logo, link, and button height/alignment in transparent and scrolled header states.
2. **Comprehensive Bug Audit**:
   - Verify all translation keys in `i18n.tsx` cover search modals, product detail tabs, category filters, empty states, and account routes.
   - Audit stock count badges, price formatting, toast notifications, and modal backdrop click behaviors.

## Success Criteria
- [x] Navbar layout remains perfectly fixed and smooth when switching between English and Arabic.
- [x] Zero console warnings, missing translation fallbacks, or broken UI elements across all routes.
