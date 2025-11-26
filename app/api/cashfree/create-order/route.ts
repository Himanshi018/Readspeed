import { NextResponse } from 'next/server';

export async function POST() {
  const resp = await fetch("https://sandbox.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID!,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
    },
    body: JSON.stringify({
      order_amount: 749,
      order_currency: "INR",
      customer_details: {
        customer_id: "test_user",
        customer_email: "test@example.com",
      },
    }),
  });

  const data = await resp.json();
  return NextResponse.json(data);
}
