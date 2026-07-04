# Feature Specification: Back to Top Button

## 1. Description
The website requires a "Back to Top" button to improve navigation on long, scrollable pages. This button must be positioned on the left side of the website and perfectly align with the premium VELORE aesthetic, using the UI/UX Pro Max guidelines for animations, touch targets, and accessibility.

## 2. User Scenarios
- **Scenario 1**: A user scrolls down past the hero section and wants to return to the top to access the main navigation or change product categories. They click the persistent floating button on the bottom-left to instantly and smoothly scroll to the top.
- **Scenario 2**: A user on a mobile device scrolls down through the perfume list. The floating button appears without overlapping critical content, providing an accessible 44x44px touch target to return to the top.

## 3. Functional Requirements
- **Visibility**: The button should be hidden when the user is at the very top of the page. It should fade in smoothly (using a 150-300ms transition) once the user scrolls down past a certain threshold (e.g., 300px).
- **Positioning**: The button must be fixed to the bottom-left of the viewport. It should maintain appropriate spacing (e.g., `bottom: 24px, left: 24px`).
- **Interaction**: Clicking the button must trigger a smooth scroll (`behavior: "smooth"`) to the very top of the window.
- **Styling**: The button must use brand theme colors (e.g., `var(--gold)` or `var(--charcoal)`) and include a clear, non-emoji SVG icon (e.g., an upward-pointing arrow).
- **UX Pro Max Constraints**:
  - The touch target must be at least 44x44px.
  - Hover states must provide clear visual feedback without causing layout shifts.
  - The button must have a `cursor-pointer` class/style.
  - It must have a `*:focus-visible` outline for keyboard navigation.
  - It must have an `aria-label` for screen reader accessibility.

## 4. Success Criteria
- **Functional**: The page scrolls to the absolute top smoothly upon clicking the button.
- **Visual**: The button blends seamlessly with the VELORE Maison de Parfum aesthetic, using correct colors, borders, and SVGs.
- **Responsive**: The button remains accessible and unobtrusive on mobile screens (375px) without horizontal scrolling or overlapping the chat/cart buttons on the right.

## 5. Assumptions
- The button is a global element and will be added to the main layout (`index.tsx`).
- The left-side positioning is specifically requested by the user and does not conflict with existing global overlays.
