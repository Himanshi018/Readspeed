'use client';

// EN: Client component for navbar links and premium button | HI: Navbar links aur premium button ke liye client component
import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  // EN: Router for client-side navigation | HI: Client-side navigation ke liye router
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      {/* EN: Left side - Logo and "ReadSpeed" text with navigation links | HI: Left side - Logo aur "ReadSpeed" text navigation links ke saath */}
      <div className="flex items-center flex-1">
        <Link href="/" className="flex items-center space-x-2" aria-label="Logo">
          <span className={s.logo}>
            <img 
              src="/favicon.ico.png" 
              alt="ReadSpeed Logo" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
          </span>
          {/* EN: ReadSpeed text logo | HI: ReadSpeed text logo */}
          <span className="text-xl font-bold text-[#9f1239] hidden sm:inline-block">
            ReadSpeed
          </span>
        </Link>
        {/* EN: Navigation links - hidden on mobile, shown on desktop | HI: Navigation links - mobile pe hidden, desktop pe dikhte hain */}
        <nav className="hidden ml-6 space-x-2 md:flex">
          <Link href="/" className={s.link}>
            Home
          </Link>
          <Link href="/test" className={s.link}>
            Test
          </Link>
          <Link href="/about" className={s.link}>
            About
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      
      {/* Premium features temporarily disabled */}
    </div>
  );
}
