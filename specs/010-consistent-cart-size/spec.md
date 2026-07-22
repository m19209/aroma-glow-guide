# Feature Specification: Consistent Cart Button & Drawer Dimensions Across Languages

**Feature Name**: `010-consistent-cart-size`  
**Status**: Draft  
**Target Components**: Navbar Cart Button (`.nav-cart-btn`), Cart Drawer Container (`.cart-drawer`)

## User Scenarios & UX Principles
- **Layout Stability**: When users toggle between Arabic and English using the language switcher, the Cart button in the navbar and the Cart Drawer container must preserve identical dimensions (width and height) to eliminate visual jumping or layout shift (CLS).
- **Smooth & Fixed Alignment**: Fixed width constraints (`min-width: 175px` for navbar button and locked `440px` width for cart drawer) ensure perfect symmetry across all language states.

## Functional Requirements
1. **Navbar Cart Button (`.nav-cart-btn`)**:
   - Set fixed min-width (`min-width: 175px` on desktop) with centered flex alignment (`justify-content: center`).
   - Ensure label text ("سلة المشتريات" and "Shopping Cart") fits comfortably without truncating or stretching the button bounds.
2. **Cart Drawer Container (`.cart-drawer`)**:
   - Lock width to `440px` (`max-width: 100vw; width: 440px`) across all languages and direction states (`dir="rtl"` and `dir="ltr"`).

## Success Criteria
- [x] Toggling between Arabic and English retains the exact same button width and drawer size.
- [x] Zero layout shift or dimension jump when changing languages.
