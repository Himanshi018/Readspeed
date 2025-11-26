// Premium features temporarily disabled
import Link from "next/link";

export default function Home() {
  // EN: Landing page hero uses peach palette + floating glass card | HI: Yeh hero section peach rang ka istemal karta hai aur hawa mein tairti card jaisa feel deta hai
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff1f0] via-[#ffe9e4] to-[#ffe4e1] px-4 py-16 text-[#4a2b2b]">
      {/* EN: Subtle blobs for premium depth | HI: Halke gradients se premium gehraai milti hai */}
      <div className="pointer-events-none absolute -top-32 left-10 h-80 w-80 rounded-full bg-[#ffd1c1]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-[#ff6b6b]/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        {/* EN: Floating card effect for premium look | HI: Card ko hawa mein tairta dikhane ke liye shadow + border use ki */}
        <div className="group relative w-full overflow-hidden rounded-[32px] border border-white/40 bg-white/70 p-10 shadow-[0_40px_120px_rgba(255,107,107,0.2)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_50px_150px_rgba(255,107,107,0.25)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#ffe4e1]/80 opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative space-y-8">
            <p className="text-sm uppercase tracking-[0.4em] text-[#ff6b6b]">ReadSpeed</p>
            <h1 className="text-5xl font-semibold leading-tight text-[#4a1f1f] sm:text-6xl lg:text-7xl">
              Discover Your Reading Speed in 60 Seconds
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[#7a4b46] sm:text-xl">
              Free test • Instant results • Personalized tips crafted to help you fall in love with reading again.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/test"
                className="rounded-full bg-[#ff6b6b] px-10 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,107,107,0.35)] transition-all hover:scale-105 hover:shadow-[0_25px_60px_rgba(255,107,107,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6b6b]/40 sm:text-xl"
              >
                Start Test Now
              </Link>
              <p className="text-sm text-[#a96763]">No login • Completely free test</p>
            </div>
          </div>
        </div>

        {/* Premium features temporarily disabled */}
      </div>

      <footer className="mt-12 text-xs text-[#a36860]">
        © 2025 ReadSpeed – Built by Himanshi
      </footer>
    </main>
  );
}
