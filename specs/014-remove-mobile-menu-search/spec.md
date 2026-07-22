# Feature Specification: Remove Search Bar from Mobile Hamburger Menu

**Feature Name**: `014-remove-mobile-menu-search`  
**Status**: Draft  
**Target Components**: `src/routes/index.tsx`

## Overview
Remove the `.mobile-search-wrapper` input block from inside the mobile hamburger menu drawer, keeping the header clean and focused on navigation links, user login/account actions, and language toggle.

## Requirements
1. Remove `.mobile-search-wrapper` div from `mobile-menu` in `src/routes/index.tsx`.
2. Ensure search remains accessible via the dedicated search button icon in the navbar.
