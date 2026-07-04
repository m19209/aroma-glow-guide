# Feature Specification: Mobile Navbar Redesign

## 1. Description
The mobile version of the navigation bar in VELORE is currently messy and crowded, making it difficult for users to navigate the app on small screens. The goal of this feature is to redesign the mobile navbar to be minimal, clean, and highly usable, prioritizing key actions.

## 2. User Scenarios
- **Scenario 1**: A user on a mobile device lands on the homepage and wants to find the perfume catalog. They tap a clear, accessible hamburger menu or navigation tab.
- **Scenario 2**: A user wants to quickly check their cart or login status. The mobile navbar highlights the cart icon clearly without cluttering the header with text labels.
- **Scenario 3**: A user searches for a specific perfume on a mobile device. The search action is easily identifiable but doesn't take up excessive space until activated.

## 3. Functional Requirements
- Remove text labels (like "تسجيل الدخول", "حسابي", "تسجيل الخروج", "الحقيبة") from the mobile view of the navbar, keeping only the icons.
- Ensure the hit area for touch targets is at least 44x44px.
- Use a hamburger menu or bottom navigation pattern to declutter the top bar.
- Only show the brand logo, cart icon (with badge), and a hamburger menu in the top bar on mobile screens.
- Move search, authentication, and secondary links into the mobile menu overlay or side drawer.
- Ensure the navbar remains sticky ("scrolled" state) but occupies minimal vertical space.

## 4. Success Criteria
- The mobile navbar items fit comfortably within a 375px width screen without overlapping or squeezing.
- Touch targets pass accessibility tests (minimum 44x44px).
- Users can access the cart and main menu in one tap.

## 5. Assumptions & Dependencies
- The current tech stack is React/Tailwind (or custom CSS, as seen in `index.tsx`).
- Icons will use the existing SVG elements or standard icons.
- The redesign only targets viewport widths under 768px (standard mobile breakpoint).
