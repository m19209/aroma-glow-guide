# Feature Specification: Fix Telegram Governorate Field

## 1. Description
After a user completes an order, the Telegram notification message contains "undefined" in the governorate field (المحافظة). The goal of this change is to fix the checkout flow and order payload structure in Project M so that the selected governorate name is correctly transmitted from the checkout form, saved in the database, and formatted into the Telegram notification message.

## 2. User Scenarios
- **Scenario 1**: A customer adds items to the cart, opens the checkout drawer, fills in their details (including Governorate/المحافظة), selects Cash on Delivery, and completes the order.
- **Scenario 2**: The administrator receives a Telegram notification containing the complete order details. The governorate field (المحافظة) in the address section shows the actual governorate selected by the customer (e.g., "القاهرة" or "الجيزة") instead of "undefined".

## 3. Functional Requirements
- **Payload and Signature Alignment**:
  - The checkout function signature and caller in `src/routes/index.tsx` must be updated to accept and forward the `governorate` field.
  - The `createOrder` call payload must include `governorate` in its data structure matching the backend validator requirements.
- **Notification Formatting**:
  - The Telegram notification generator in `src/lib/auth-service.ts` must use the `governorate` field from the order data structure properly to display the correct Arabic value.

## 4. Success Criteria
- Placing a new order with a chosen governorate generates a Telegram message where the "المحافظة" line shows the correct governorate name.
- The governorate is correctly stored in the user profile/order address field.

## 5. Assumptions & Dependencies
- The `governorate` state is correctly updated and validated inside the `CartDrawer` form in `src/components/features.tsx`.
- The database schema for `users` supports storing the `governorate` column (which it does, as verified in `schema.ts`).
