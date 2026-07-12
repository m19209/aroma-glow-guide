# Feature Specification: Resilient Database Fallback

## 1. Description
When Project M is deployed to Vercel, it runs in a serverless environment where the local SQLite database file (`local.db`) may be missing, inaccessible, or read-only. When database queries fail during server-side rendering (SSR) or Server Function calls, they throw unhandled exceptions, causing Vercel to return a catastrophic `{"status":500,"unhandled":true,"message":"HTTPError"}` response. The goal of this change is to wrap database queries in robust error handling, falling back to static metadata or Google Sheets data, thereby ensuring the store stays online.

## 2. User Scenarios
- **Scenario 1**: A user loads the home page of the VELORE store on the Vercel-deployed website. Even if the local SQLite database is missing or fails to open, the page loads successfully. Products and stocks are displayed correctly using fallbacks (such as Google Sheets data or static inventory defaults).
- **Scenario 2**: A user tries to view a custom product or access their profile. The server returns clean error states or empty lists instead of crashing with a generic 500 JSON error.

## 3. Functional Requirements
- **Resilient Stocks Retrieval**:
  - `getAllStocks` and `getProductStock` in `src/lib/inventory.ts` must catch database query errors and fall back to Google Sheets data or the static product lists with default stocks.
- **Resilient Custom Products Listing**:
  - `listCustomProducts` in `src/lib/admin-service.ts` must catch database query errors and return an empty array instead of throwing.
- **Resilient Profile and Orders Queries**:
  - `getUserProfile` and `getUserOrders` in `src/lib/auth-service.ts` must catch database read errors and return appropriate error flags or empty collections.
- **Resilient Admin Dashboard Stats and Queries**:
  - `getAdminStats` and `getAdminOrders` in `src/lib/auth-service.ts` must catch database read errors and fall back to empty collections or default structures.

## 4. Success Criteria
- The home page and product detail pages load successfully on Vercel without throwing a 500 error.
- Stock numbers display correct defaults (e.g., matching the Google Sheets data or fallback stock values) when database calls fail.

## 5. Assumptions & Dependencies
- Google Sheets API calls are functional and act as the master authority for inventory and order sync.
