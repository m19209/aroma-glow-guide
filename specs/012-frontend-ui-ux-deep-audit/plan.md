# Implementation Plan - Entire UI/UX Frontend Deep Audit & Bug Fixes

**Goal**: Perform a comprehensive UI/UX Pro Max front-end audit across the entire application, fixing all remaining translation gaps, layout edge-cases, responsive alignment bugs, and interaction details.

## Audit Findings & Proposed Fixes

### 1. Hero & Homepage (`src/routes/index.tsx`)
- Hardcoded Arabic strings in Hero badge ("عطور خشبية وشرقية فاخرة"), Hero title ("الفخامة والتميز"), Hero CTA ("تصفح المجموعة"), Category filters ("جميع العطور", "عطور نسائية", "عطور رجالية", "عطور شرقية"), Sorting dropdown, and Toast notifications.
- Fix: Add missing translation keys to `i18n.tsx` and wire `translate(...)` for all Hero, Filter, Card, and Toast labels.

### 2. Account Page (`src/routes/account.tsx`)
- Audit and wire `useI18n()` into `src/routes/account.tsx` for profile headings, order status badges, address edit forms, and save buttons.

### 3. Product Cards & Wishlist (`src/routes/index.tsx` & `src/components/features.tsx`)
- Ensure price formatting is wrapped in `<span dir="ltr">` with `{translate("currency")}` in all product cards and detail views.
- Ensure wishlist button tooltip & toast messages use localized strings.

### 4. Global CSS & UX Touch Ups (`src/styles/global.css`)
- Ensure mobile drawer menu links display smooth hover states and consistent line heights in both Arabic & English.

## Verification Plan
- Switch languages on Homepage, Account Page, and Checkout Page. Confirm 100% text translation and zero layout distortion.
- Open Product Modals, Search Modal, and Login Modal in both EN and AR modes.
- Test responsive viewports on mobile (375px), tablet (768px), and desktop (1280px).
