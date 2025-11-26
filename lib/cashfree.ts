export async function openCashfreeCheckout() {
  if (typeof window === 'undefined') return;

  const cashfree = new (window as any).Cashfree({
    mode: "sandbox",
  });

  const order = await fetch("/api/cashfree/create-order")
    .then(res => res.json());

  const result = await cashfree.checkout({
    paymentSessionId: order.paymentSessionId,
    redirectTarget: "_self",
  });

  if (result?.payment_status === "SUCCESS") {
    window.location.href = "/premium-success";
  }

  return result;
}
