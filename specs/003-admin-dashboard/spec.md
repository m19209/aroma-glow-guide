# Feature Specification: Admin Dashboard

## 1. Description
The goal of this feature is to build an Admin Dashboard for the VELORE perfume store. The dashboard should match the luxury design system of the website (vibrant dark mode, premium typography, clean layouts, and gold accents) and allow the administrator (the user with the 'admin' role) to manage store orders, update their statuses, and view sales statistics. The order statuses must sync bi-directionally with Google Sheets.

## 2. User Scenarios
- **Scenario 1**: An admin logs into the website using `admin@velore.com` and goes to `/admin`. They are presented with a premium dashboard displaying core metrics: Total Revenue, Total Orders, Pending Orders, and active perfume stock warnings.
- **Scenario 2**: The admin views the orders table. They search for a customer name or filter by status. They click on a pending order, view its full items and shipping address, and change its status to "تم التوصيل" (Delivered). The local SQLite database is updated, and the Google Sheets "Orders" sheet is automatically updated in real-time to match.
- **Scenario 3**: A customer visits their `/account` page. Since the admin changed their order status to "تم التوصيل", they instantly see the updated status on their page.

## 3. Functional Requirements
- **Route Protection**: The `/admin` route must be accessible only to users logged in with the `admin` role. Non-admin users or guests should be redirected to the homepage with a warning toast.
- **Visual Design**: The dashboard must align with the premium brand aesthetics (using Outfit, Cormorant Garamond, or Cairo fonts, smooth transitions, soft gold accents, card-based metrics, and a clean dark/cream dashboard interface).
- **Core Statistics Cards**:
  - Total Revenue (ج.م)
  - Total Orders Count
  - Active Pending Orders Count
  - Low Stock Warning list (perfumes with stock <= 5)
- **Order Management Table**:
  - Display all orders with columns: Order ID, Customer Name, Date, Shipping Address, Total, and Status.
  - Ability to filter orders by status (Pending, Processing, Shipped, Delivered, Cancelled).
  - Search bar to search orders by customer name or phone number.
- **Order Detail Modal/View**:
  - View list of ordered items (quantity, unit price, product name).
  - View shipping address details and optional customer notes.
  - Dropdown or button group to update the order status.
- **Sheets Synchronization**:
  - Updating status in the Admin Dashboard must immediately call the Google Sheets API to update the status of the corresponding order row in the `Orders` sheet.

## 4. Success Criteria
- The `/admin` page loads successfully and is restricted to admin users.
- An admin can change the status of an order, and the status updates in both the local SQLite database and the Google Sheets "Orders" sheet within 3 seconds.
- Non-admin users trying to access `/admin` are safely blocked and redirected to the home page.
- Layout is responsive and works cleanly on desktop (wider layout) and tablets.

## 5. Assumptions & Dependencies
- A user account with `role = 'admin'` already exists in the database.
- Google Sheets integration is active and using `SPREADSHEET_ID`.
- We will fetch all orders from the local SQLite database for speed, but trigger Google Sheet sync whenever an update occurs.
