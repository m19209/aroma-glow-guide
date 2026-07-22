# Implementation Plan - Fixed Cart Dimensions Across Languages

**Goal**: Lock the dimensions of the Navbar Cart button (`.nav-cart-btn`) and Cart Drawer (`.cart-drawer`) so that toggling between Arabic and English maintains an identical size.

## Proposed Changes

### `src/styles/global.css`
- Apply fixed `min-width: 175px`, `justify-content: center`, `text-align: center`, and `box-sizing: border-box` to `.nav-cart-btn`.
- Ensure `.cart-drawer` is locked to `width: 440px` and `max-width: 100vw`.
- Apply fixed width rules for both desktop and mobile header states to prevent text-length reflow.

## Verification Plan
- Click language toggle button on `http://localhost:3000/`.
- Verify `.nav-cart-btn` width remains constant at `175px`.
- Open Cart Drawer and switch language; verify drawer width remains constant at `440px`.
