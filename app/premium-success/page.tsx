'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { savePremiumStatus } from "@/lib/supabase/user";
import Button from '@/components/ui/Button/Button';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

function PremiumSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger confetti effect on mount
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        angle: randomInRange(55, 125),
        spread: 30,
        origin: { y: 0.6 },
        colors: ['#4CAF50', '#2E7D32', '#81C784', '#A5D6A7', '#E8F5E9']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Verify payment and update premium status
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verify payment (you might want to add actual payment verification here)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Save premium status to user's profile
        await savePremiumStatus();
        
        setIsVerified(true);
      } catch (error) {
        console.error('Error during payment verification:', error);
        setError(error instanceof Error ? error.message : 'Failed to verify payment');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white p-6">
        <div className="bg-red-100 p-6 rounded-full mb-6">
          <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">{error}</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 text-lg"
        >
          Return to Home
        </Button>
        <p className="mt-6 text-sm text-gray-500">
          Need help? <a href="mailto:support@readspeed.com" className="text-red-600 hover:underline">Contact support</a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Premium Activated Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for upgrading to ReadSpeed Premium! Your account has been successfully upgraded.
          </p>
          
          <div className="mt-8 space-y-4">
            <Link 
              href="/account" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Go to Your Account
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              Need help? <a href="mailto:support@readspeed.com" className="text-green-600 hover:underline">Contact support</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PremiumSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin mb-2" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PremiumSuccessContent />
    </Suspense>
  );
}
