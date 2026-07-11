# Implementation Plan: Admin Dashboard

## 1. Technical Context
- **Tech Stack**: React, TypeScript, Drizzle ORM, Google Sheets API.
- **Target Files**:
  - `src/lib/auth-service.ts` (Implement admin endpoints)
  - `src/routes/admin.tsx` (Implement `/admin` routing, checking auth and loading stats/orders)
  - `src/components/AdminDashboard.tsx` (Implement UI components for dashboard stats, orders table, modals, low stock list)
  - `src/styles/global.css` (Add any specific CSS for the dashboard elements)

## 2. Architecture & Design Decisions
- **Access Control & Routing**: 
  - The TanStack Router loader in `src/routes/admin.tsx` will run `getUserProfile()` and verify if `role === 'admin'`. If not, it redirects to `/` with search params `loginRequired=true&adminRequired=true`.
  - In `index.tsx` (homepage), we will handle `adminRequired` search parameter to show a toast message like "غير مصرح لك بدخول صفحة الإدارة".
- **Visual Design**:
  - Follow the existing premium design system: cream background (`#fdfbf7`), charcoal accents, elegant borders, Outfit & Cormorant Garamond typography.
  - A clean top bar with store title and "Back to Store" link.
  - Core statistics displayed as grid cards with gold accents.
  - Clean table layout with status badges matching the colors in `STATUS_MAP`.
- **Admin Endpoints**:
  - `getAdminStats`: Fetches aggregate data (Total revenue, total orders count, pending orders count). We'll also fetch low stock warnings.
  - `getAdminOrders`: Fetches all orders with their items.
  - `updateOrderStatus`: Updates order status in SQLite DB AND updates it in Google Sheets' `Orders` sheet.
- **Bi-directional Google Sheet Status Synchronization**:
  - When updating status, we find the row in `Orders` matching the `id`. We update column I (Status) in the spreadsheet.

## 3. Phase 0: Research
- We verified SQLite `users` table now contains a `role` column, and we inserted an admin user (`admin@velore.com`).
- We verified Drizzle schemas in `src/lib/db/schema.ts` have `role` added.
- The Google Sheets `Orders` sheet was successfully created with proper headers.

## 4. Phase 1: Data Model & Contracts
- The `role` column is already added to `users`.
- API Contract additions to `src/lib/auth-service.ts`:
  - `getAdminStats`: `() => Promise<{ success: boolean; stats?: { totalRevenue: number; totalOrders: number; pendingOrders: number; lowStockItems: Array<{ id: string; name: string; stock: number }> } }>`
  - `getAdminOrders`: `() => Promise<{ success: boolean; orders?: Order[] }>`
  - `updateOrderStatus`: `(data: { orderId: string; status: string }) => Promise<{ success: boolean; error?: string }>`

## 5. Phase 2: Execution Phases
### Setup & API Implementation
- Update `src/lib/auth-service.ts` to implement `getAdminStats`, `getAdminOrders`, and `updateOrderStatus`.
- In `updateOrderStatus`, update the local SQLite `orders` status AND search/update the corresponding row in the Google Sheets `Orders` sheet.

### Route & Component Creation
- Create `src/routes/admin.tsx` which restricts access and loads data.
- Create `src/components/AdminDashboard.tsx` with:
  - Statistics header.
  - Metrics cards (Revenue, orders count, pending count).
  - Low stock warning list.
  - Searchable/filterable orders table.
  - Status updater dropdowns.
  - Expanded order details popup.

### Polish & CSS
- Apply styling rules to match VELORE's brand identity.
- Verify responsiveness.
