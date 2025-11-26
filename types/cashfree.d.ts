interface CashfreePaymentOptions {
  paymentSessionId: string;
  returnUrl: string;
  redirectTarget?: string;
  theme: {
    color: string;
    backgroundColor: string;
    titleFontColor: string;
    buttonColor: string;
  };
}

declare global {
  interface Window {
    Cashfree: {
      payment: (options: CashfreePaymentOptions) => {
        redirect: () => void;
      };
    };
  }
}

export {};
