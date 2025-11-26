import { NextResponse } from 'next/server';

// Test credentials - Replace with environment variables in production
const CASHFREE_APP_ID = 'YOUR_TEST_APP_ID';
const CASHFREE_SECRET_KEY = 'YOUR_TEST_SECRET_KEY';
const CASHFREE_BASE_URL = 'https://sandbox.cashfree.com/pg';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Fetch order details from Cashfree
    const response = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2022-01-01',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }

    const orderDetails = await response.json();
    
    // Return the payment status
    return NextResponse.json({
      status: orderDetails.order_status,
      orderId: orderDetails.order_id,
      orderAmount: orderDetails.order_amount,
      paymentStatus: orderDetails.payment_status,
      paymentTime: orderDetails.payment_time,
      paymentMessage: orderDetails.payment_message,
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
