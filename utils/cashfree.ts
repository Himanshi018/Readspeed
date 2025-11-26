import { Cashfree, CFEnvironment } from "cashfree-pg";

export const createCashfreeClient = () => {
  const isProduction = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'PRODUCTION';
  
  // Initialize Cashfree with environment and credentials
  const cashfree = new Cashfree(
    isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
    process.env.CASHFREE_SECRET!
  );

  return cashfree;
};
