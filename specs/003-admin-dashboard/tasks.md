# Tasks: Admin Dashboard

## Phase 1: API & Sheets Setup
- [ ] T001 Implement `updateOrderInSheet` in `src/lib/sheets.ts` to search for an Order ID and update its status column in the Google Sheets "Orders" sheet.
- [ ] T002 Add `getAdminStats` server function in `src/lib/auth-service.ts` to aggregate revenue, total orders, pending orders, and check for low stock levels.
- [ ] T003 Add `getAdminOrders` server function in `src/lib/auth-service.ts` to fetch all orders with items, sorted by newest.
- [ ] T004 Add `updateOrderStatus` server function in `src/lib/auth-service.ts` to update the order status in SQLite and call `updateOrderInSheet`.

## Phase 2: Routing & Protection
- [ ] T005 Create `src/routes/admin.tsx` route with a loader that checks if the logged-in user has the `admin` role and redirects if not.
- [ ] T006 Update `src/routes/index.tsx` homepage loader or `useEffect` to capture `adminRequired` query param and display a toast alert if present.

## Phase 3: Dashboard Interface
- [ ] T007 [P] Create `src/components/AdminDashboard.tsx` skeleton and stats cards matching the store's visual styling.
- [ ] T008 Implement the searchable and filterable orders table in `src/components/AdminDashboard.tsx`.
- [ ] T009 Implement status update dropdown and detail drawer/modal in `src/components/AdminDashboard.tsx`.

## Phase 4: Polish & Integration
- [ ] T010 Verify mobile and desktop styling responsiveness of the Admin Dashboard.
- [ ] T011 Verify bi-directional sync (updating order status on the dashboard updates Google Sheets in real-time).
