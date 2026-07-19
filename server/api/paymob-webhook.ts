import { defineEventHandler, readBody, getQuery, getHeader } from 'h3';
import { db } from '../../src/lib/db';
import { orders } from '../../src/lib/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';

export default defineEventHandler(async (event) => {
  try {
    const hmacKey = process.env.PAYMOB_HMAC_SECRET;
    if (!hmacKey) throw new Error("Missing Paymob HMAC Secret");

    const query = getQuery(event);
    const hmacHeader = query.hmac || getHeader(event, 'hmac') || '';
    
    const body = await readBody(event);
    if (!body || !body.obj) {
      return { success: false, message: 'Invalid payload' };
    }

    const obj = body.obj;
    
    // Construct the HMAC string based on Paymob's documentation
    const hmacString = [
      obj.amount_cents,
      obj.created_at,
      obj.currency,
      obj.error_occured,
      obj.has_parent_transaction,
      obj.id,
      obj.integration_id,
      obj.is_3d_secure,
      obj.is_auth,
      obj.is_capture,
      obj.is_refunded,
      obj.is_standalone_payment,
      obj.is_voided,
      obj.order?.id,
      obj.owner,
      obj.pending,
      obj.source_data?.pan,
      obj.source_data?.sub_type,
      obj.source_data?.type,
      obj.success,
    ].join('');

    const calculatedHmac = crypto.createHmac('sha512', hmacKey).update(hmacString).digest('hex');

    if (obj.success === true && obj.is_voided === false && obj.error_occured === false) {
      const merchantOrderId = obj.order?.merchant_order_id;
      if (merchantOrderId) {
        await db.update(orders)
          .set({ status: 'processing', updatedAt: new Date() })
          .where(eq(orders.id, merchantOrderId));
        console.log(`Order ${merchantOrderId} marked as paid via Paymob`);
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error("Paymob Webhook error:", err);
    return { success: false, error: err.message };
  }
});
