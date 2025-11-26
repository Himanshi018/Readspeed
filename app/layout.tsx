import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';

const title = 'ReadSpeed — Reading Speed Test in 60 Seconds';
const description =
  'Discover your reading speed, track progress, and prep for comprehension goals with a fast, modern experience powered by Supabase.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  icons: {
    icon: '/favicon.ico.png',
    shortcut: '/favicon.ico.png',
    apple: '/favicon.ico.png'
  },
  openGraph: {
    title: title,
    description: description
  }
};

// EN: Root layout component - sets up the entire app structure | HI: Yeh root layout hai jo poore app ka structure set karta hai
export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      {/* EN: Body with peach-cream gradient background for entire app | HI: Body mein peach-cream gradient background hai */}
      <body className="bg-gradient-to-b from-[#fff1f0] to-[#ffe4e1] text-[#2f1e1a]">
        {/* EN: Navigation header with logo and premium button | HI: Navigation header jisme logo aur premium button hai */}
        <Navbar />
        {/* EN: Main content area with proper min-height for full page | HI: Main content area jo full page ke liye proper height rakhta hai */}
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>
        {/* EN: Footer with copyright and premium info | HI: Footer jisme copyright aur premium info hai */}
        <Footer />
        {/* EN: Toast notifications for user feedback | HI: Toast notifications user feedback ke liye */}
        <Suspense>
          <Toaster />
        </Suspense>
        <script
          src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js"
          async
        ></script>
      </body>
    </html>
  );
}
