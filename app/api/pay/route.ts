import { NextResponse } from "next/server";
import { createCashfreeClient } from "@/utils/cashfree";

export async function POST() {
  const cashfree = createCashfreeClient();
  const orderId = "order_" + Date.now();
  const customerId = "customer_" + Date.now();
  
  try {
    // Create order request payload
    const orderRequest = {
      order_id: orderId,
      order_amount: 749,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_phone: "9999999999"
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium-success?order_id=${orderId}`
      }
    };

    // Call the API with proper type assertion
    const response = await (cashfree as any).PGCreateOrder("2023-08-01", orderRequest);

    return NextResponse.json({
      success: true,
      data: response.data
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    const errorMessage = error.response?.data?.message || 'Failed to create order';
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: error.response?.status || 500 }
    );
  }
}
