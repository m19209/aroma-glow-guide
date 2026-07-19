export async function authenticatePaymob(): Promise<string> {
  const apiKey = process.env.PAYMOB_API_KEY;
  if (!apiKey) throw new Error("Paymob API key is missing");

  const res = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey }),
  });
  
  if (!res.ok) throw new Error("Failed to authenticate with Paymob");
  const data = await res.json();
  return data.token;
}

export async function registerPaymobOrder(
  authToken: string,
  merchantOrderId: string,
  amountCents: number,
  currency: string = "EGP"
): Promise<number> {
  const res = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: authToken,
      delivery_needed: "false",
      amount_cents: amountCents.toString(),
      currency,
      merchant_order_id: merchantOrderId,
      items: [], // we can leave items empty for simplicity
    }),
  });

  if (!res.ok) throw new Error("Failed to register order with Paymob");
  const data = await res.json();
  return data.id; // paymob's internal order id
}

export async function getPaymentKey(
  authToken: string,
  paymobOrderId: number,
  amountCents: number,
  billingData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    city: string;
    street: string;
    building: string;
    country: string;
  },
  currency: string = "EGP"
): Promise<string> {
  const integrationId = process.env.PAYMOB_WALLET_INTEGRATION_ID;
  if (!integrationId) throw new Error("Paymob Wallet Integration ID missing");

  const res = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: authToken,
      amount_cents: amountCents.toString(),
      expiration: 3600,
      order_id: paymobOrderId.toString(),
      billing_data: {
        apartment: "NA",
        floor: "NA",
        postal_code: "NA",
        state: "NA",
        ...billingData
      },
      currency,
      integration_id: parseInt(integrationId, 10),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Paymob payment key error:", data);
    throw new Error("Failed to get Paymob payment key");
  }
  return data.token;
}

export async function requestWalletPayment(
  paymentKey: string,
  walletNumber: string
): Promise<string> {
  const res = await fetch("https://accept.paymob.com/api/acceptance/payments/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: {
        identifier: walletNumber,
        subtype: "WALLET",
      },
      payment_token: paymentKey,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Paymob wallet payment failed:", err);
    throw new Error("Failed to trigger wallet payment");
  }

  const data = await res.json();
  // Paymob usually returns redirect_url or iframe_redirection_url for wallets
  return data.iframe_redirection_url || data.redirect_url;
}
