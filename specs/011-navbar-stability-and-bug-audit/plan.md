# Implementation Plan - Navbar Stability & Comprehensive Bug Audit

**Goal**: Fix all navbar layout shift and alignment issues when toggling languages/scrolling, and perform a deep code & UI bug audit across the website.

## Proposed Changes

### 1. Navbar Stability (`src/routes/index.tsx` & `src/styles/global.css`)
- Add fixed width/min-width constraints for `.nav-search`, `.nav-login-btn`, and `.nav-brand` so changing language text ("Login" vs "تسجيل الدخول", "My Account" vs "حسابي") does not shift adjacent header items.
- Ensure header `nav-right` container has fixed flex alignment (`align-items: center; justify-content: flex-end`) with locked element heights.

### 2. Comprehensive Bug Audit & Fixes
- **Product Details Modal (`src/components/modals.tsx`)**: Wire missing translation strings (`translate(...)`) for tab headers ("Description", "Specifications", "Scent Pyramid", "Volume", "Concentration", "Longevity", "Sillage", "Buy Now", "Top Notes", "Heart Notes", "Base Notes", etc.).
- **Login Modal (`src/components/modals.tsx`)**: Wire translation strings for Login / Sign up titles, field labels, placeholders, switch links, and validation error messages.
- **Search Modal (`src/components/modals.tsx`)**: Wire translation strings for search input placeholder, item details, currency labels, and close buttons.
- **Hero & Category Filters (`src/routes/index.tsx`)**: Ensure category filter badges and sort dropdowns translate properly without text overflow.

## Verification Plan
- Test navbar stability by toggling between English and Arabic 10+ times on `http://localhost:3000/`; confirm ZERO element movement or jumping.
- Test all modals (Login Modal, Search Modal, Product Detail Modal) in both AR and EN modes to ensure 100% translation coverage.
- Verify checkout flow and stock indicators function flawlessly without console errors.
