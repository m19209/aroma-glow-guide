# Feature Specification: Grid-Style Luxury Category Filter Redesign

**Feature Name**: `013-grid-filter-redesign`  
**Status**: Draft  
**Target Components**: Product Section (`src/routes/index.tsx`), Filter CSS (`src/styles/global.css`), Translations (`src/lib/i18n.tsx`)

## User Scenarios & UX Principles (UI/UX Pro Max & UI/UX Designer)
- **High-End Visual Hierarchy**: Replace tiny line text filters with an opulent 5-card grid layout placed above the products section.
- **Micro-Interactions & Feedback**: Active cards display a gold glassmorphic border glow, gold accent icon, and smooth transition. Hovering cards triggers a subtle micro-lift (`translateY(-3px)`) with `cursor-pointer`.
- **RTL/LTR Adaptability**: Grid items and text flow naturally based on active language direction.

## Functional Requirements
1. **Category Grid**:
   - Categories: All (`all`), Oriental (`oriental`), Floral (`floral`), Oud & Wood (`woody`), Aquatic (`aquatic`).
   - Render each as a luxury glassmorphic card with icon, title, subtitle, and item count badge.
2. **Filter Integration**:
   - Clicking a category grid card filters the product grid in real-time.
   - Maintain sort select dropdown and product count display below the category grid.
3. **i18n Support**:
   - Translate all category titles and subtitles in English and Arabic.

## Success Criteria
- [x] Responsive 5-card grid on desktop (scales smoothly to 2-column on mobile).
- [x] Zero layout shift during filtering.
- [x] Full UI/UX Pro Max visual polish matching VELORE luxury branding.
