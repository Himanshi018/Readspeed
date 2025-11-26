'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { savePremiumStatus } from "@/lib/supabase/user";
import Button from '@/components/ui/Button/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function PremiumSuccess() {
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
        // First verify the payment (you might want to add actual payment verification here)
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


  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log('Downloading PDF...');
    // You can use a library like jsPDF or html2canvas to generate a PDF
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-700 p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-300 border-t-green-100 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-green-100">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-red-700 p-6 text-center">
        <div className="bg-red-100 p-6 rounded-full mb-6">
          <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment Verification Failed</h1>
        <p className="text-xl text-red-100 max-w-md mb-8">{error}</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-white text-red-700 hover:bg-red-50 px-8 py-3 text-lg"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 to-green-700 p-6">
      <div className="text-center max-w-2xl">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/10">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"> Premium Unlocked!</h1>
          
          <p className="text-xl text-green-100 mb-8 max-w-md mx-auto">
            Thank you for your payment. Enjoy unlimited premium features forever.
          </p>
          
          <div className="space-y-4 max-w-sm mx-auto">
            <div className="flex items-center space-x-3 text-green-100">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span>Ad-free experience</span>
            </div>
            <div className="flex items-center space-x-3 text-green-100">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span>Unlimited reading tests</span>
            </div>
            <div className="flex items-center space-x-3 text-green-100">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span>Advanced analytics</span>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/test"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors"
            >
              Take a Test <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Go to Dashboard
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-green-200">
            Having issues? <a href="mailto:support@readspeed.com" className="underline hover:text-white">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
