# Validation Guide: Back to Top Button

This guide documents how to manually test and validate the Back to Top button functionality.

## Prerequisites
1. Ensure the development server is running (`bun run dev`).
2. Open the browser to `http://localhost:63712/`.

## Test Scenarios

### 1. Visibility Threshold
- Load the homepage at the absolute top.
- **Expected Outcome**: The Back to Top button on the bottom-left is completely invisible.
- Scroll down slowly. Once you pass approximately 300px of scroll depth (e.g., reaching the first divider or Products section), observe the bottom-left corner.
- **Expected Outcome**: The Back to Top button smoothly fades in (opacity transitions to 1).

### 2. Smooth Scroll Interaction
- While scrolled down, click the Back to Top button.
- **Expected Outcome**: The page smoothly scrolls back to the absolute top (`scrollY: 0`). The button then smoothly fades out.

### 3. Touch Targets & UI/UX Pro Max Rules
- Inspect the button element using browser DevTools.
- **Expected Outcome**: The button dimensions are at least 44x44px (e.g., 48x48px).
- Hover over the button with the mouse.
- **Expected Outcome**: The button exhibits a hover state (e.g., color shift or elevation) without any layout shifting.
- Verify the cursor changes to a pointer.
- Focus the button using the `Tab` key.
- **Expected Outcome**: A visible `var(--gold-deep)` focus ring surrounds the button.

### 4. Responsiveness
- Resize the browser viewport to a mobile width (e.g., 375px) using DevTools Responsive Mode.
- Scroll down to reveal the button.
- **Expected Outcome**: The button remains tucked in the bottom-left corner and does not overlap the centered content or cause horizontal scrolling.
