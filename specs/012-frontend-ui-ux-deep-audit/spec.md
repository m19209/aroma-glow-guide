# Feature Specification: Entire UI/UX Frontend Deep Audit & Bug Fixes

**Feature Name**: `012-frontend-ui-ux-deep-audit`  
**Status**: Draft  
**Target Components**: Whole Frontend (Navbar, Hero, Product Cards, Filters, Account Route, Checkout Route, Modals, Footer, Mobile Drawer, Toast Notifications, Glassmorphism, Responsive Breakpoints)

## User Scenarios & UX Principles
- **End-to-End Visual Perfection & Luxury Aesthetics**: Elevate the UI/UX across every single component to match ultra-luxurious, state-of-the-art standards with Cairo & Cinzel typography, subtle micro-interactions, smooth hover transitions, zero layout shift (CLS), and crystal-clear RTL/LTR support.
- **Flawless Interactive Integrity**: Audit and fix any lingering bugs in cart state management, checkout form validations, account details saving, wishlists, search highlighting, modal focus trapping, and toast notifications.

## Audit Scope & Key Improvements
1. **Homepage & Hero Section (`src/routes/index.tsx`)**:
   - Translate all remaining hardcoded labels in Hero, Category Filter Badges, Section Headings, Product Card Badges, Wishlist tooltips, and Toast notifications using `translate(...)`.
   - Ensure dynamic `dir="rtl"|"ltr"` alignment for text, buttons, and icons in both Arabic and English modes.
2. **Account Page (`src/routes/account.tsx`)**:
   - Check and translate all order history items, profile form labels, address cards, action buttons, and status tags into English & Arabic.
3. **Cart Drawer & Checkout Form (`src/components/features.tsx` & `src/routes/checkout.tsx`)**:
   - Ensure complete translation for empty states, discount codes, checkout progress steps, and Vodafone Cash notice panels.
4. **Global CSS & Mobile Responsiveness (`src/styles/global.css`)**:
   - Audit mobile drawer toggle animation, glassmorphism overlays, shadow contrast, and button touch-target paddings.

## Success Criteria
- [x] 100% translation coverage across all pages and modals (Zero untranslated Arabic or English strings when toggling).
- [x] Zero layout bugs, console errors, or overlapping elements on mobile, tablet, and desktop.
- [x] Ultra-smooth UI/UX Pro Max micro-animations and luxury design feel throughout.
