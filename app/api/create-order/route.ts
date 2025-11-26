import { NextResponse } from "next/server";

export async function POST() {
  const orderId = "TEST_ORDER_" + Date.now();
  const orderToken = "TEST_TOKEN_" + Date.now();

  return NextResponse.json({
    success: true,
    orderId,
    orderToken,
  });
}
