# Implementation Plan - Grid-Style Luxury Category Filter Redesign

**Goal**: Implement a premier Grid-Style Category Filter using UI/UX Pro Max and UI/UX Designer standards, placing it prominently under the section title with active states, gold glassmorphic accents, and seamless i18n support.

## Proposed Changes

### 1. `src/lib/i18n.tsx`
- Add translation keys for category titles and subtitles:
  - `catAll`: "جميع العطور" / "All Fragrances"
  - `catAllSub`: "التشكيلة الكاملة" / "Full Collection"
  - `catOriental`: "عطور شرقية" / "Oriental"
  - `catOrientalSub`: "عنبر وعود فاخر" / "Amber & Royal Oud"
  - `catFloral`: "عطور زهرية" / "Floral"
  - `catFloralSub`: "ورود ياسمين نادرة" / "Rose & Jasmine"
  - `catWoody`: "خشب وعود" / "Oud & Wood"
  - `catWoodySub`: "أخشاب أرز صندل" / "Cedar & Sandalwood"
  - `catAquatic`: "عطور منعشة" / "Aquatic & Fresh"
  - `catAquaticSub`: "حمضيات ونسيم البحر" / "Citrus & Sea Breeze"

### 2. `src/routes/index.tsx`
- Replace single line sort bar with a 2-tier filter layout:
  1. Top Tier: Glassmorphic 5-Card Category Filter Grid (`category-grid`).
  2. Bottom Tier: Clean Sorting & Search Results Counter bar (`sort-bar-clean`).

### 3. `src/styles/global.css`
- Add `.category-grid`, `.category-card`, `.category-card.active`, `.category-icon`, `.category-badge` styles with gold glassmorphism, responsive grid breakpoints (5 columns desktop, 3 tablet, 2 mobile), and smooth hover micro-animations.

## Verification Plan
- Click each category grid card on `http://localhost:3000/`; verify products filter instantly and active card lights up.
- Test language toggle; verify card titles, subtitles, and direction adjust smoothly.
- Test responsive viewports on desktop (1280px), tablet (768px), and mobile (375px).
