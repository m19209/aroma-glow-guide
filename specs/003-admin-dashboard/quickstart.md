# Validation Guide: Admin Dashboard

This guide documents how to test and validate the Admin Dashboard functionality.

## Prerequisites
1. Ensure the development server is running (`bun run dev`).
2. Log out if you are logged into a normal user account.
3. Log in with the admin account:
   - **Email**: `admin@velore.com`
   - **Password**: `admin`

## Test Scenarios

### 1. Unauthorized Access Block
- Log out of the website.
- Attempt to navigate directly to `http://localhost:3000/admin`.
- **Expected Outcome**: You are redirected to the homepage `/` with a warning message/toast stating that access is unauthorized or you must log in as an administrator.
- Log in as a normal customer account (not admin).
- Attempt to navigate to `http://localhost:3000/admin`.
- **Expected Outcome**: Redirected to the homepage `/` with an access denied warning.

### 2. Dashboard Loading & Stats
- Log in with `admin@velore.com` / `admin`.
- Navigate to `http://localhost:3000/admin`.
- **Expected Outcome**: Page loads successfully.
- Verify metrics cards:
  - **Total Revenue**: Calculates correct sum of all completed (delivered) or non-cancelled orders.
  - **Total Orders**: Reflects correct number of orders in the SQLite DB.
  - **Pending Orders**: Count matches orders with "معلق" status.
  - **Low Stock Warnings**: Lists perfumes with stock <= 5 (fetched from synced DB).

### 3. Orders Table & Details
- Verify search functionality: Type a name of a customer who placed an order.
- **Expected Outcome**: Only orders matching that customer's name are visible.
- Verify status filter: Select "معلق" from status filter.
- **Expected Outcome**: Only pending orders are displayed.
- Click on an order row or details button.
- **Expected Outcome**: Modal/detail panel opens showing ordered perfumes, quantity, price, notes (if any), and shipping address.

### 4. Status Update Synchronization (DB & Google Sheets)
- Select an order and change its status to "تم التوصيل" (Delivered) or "تم الشحن" (Shipped) using the dropdown.
- Check the Google Sheet **Orders** page.
- **Expected Outcome**: The row matching this Order ID has its Status column updated to "تم التوصيل" (or the updated status) within 3 seconds.
- Check the local SQLite DB or reload the dashboard.
- **Expected Outcome**: The status remains updated.
- Log in to the customer's account associated with that order, or navigate to `/account` as that customer.
- **Expected Outcome**: The status on the customer's order history matches the updated status.
