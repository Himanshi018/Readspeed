export function createCashfreeClient() {
  return {
    loadCheckout: async ({ orderToken }: { orderToken: string }) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js";
        script.onload = () => {
          const cashfree = new (window as any).Cashfree({
            mode: "sandbox",
          });
          resolve(
            cashfree.checkout({
              paymentSessionId: orderToken,
            })
          );
        };
        document.body.appendChild(script);
      });
    },
  };
}
