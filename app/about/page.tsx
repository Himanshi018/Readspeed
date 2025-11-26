import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 sm:p-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#9f1239] mb-4">About ReadBoost</h1>
          <div className="w-24 h-1.5 bg-[#fda4af] mx-auto rounded-full"></div>
        </div>

        {/* Main Description */}
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            ReadBoost is a simple tool designed to measure your reading speed accurately. It runs a clean reading test, 
            tracks your Words-Per-Minute score, and gives you clear results without distractions.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#9f1239] mb-4 flex items-center">
            <span className="w-2 h-6 bg-[#fda4af] mr-3 rounded-full"></span>
            How it works
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Start the test, read the passage at your normal pace, and submit when you're done. 
            The app calculates your speed automatically and shows your result instantly.
          </p>
        </section>

        {/* Why it exists */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#9f1239] mb-4 flex items-center">
            <span className="w-2 h-6 bg-[#fda4af] mr-3 rounded-full"></span>
            Why it exists
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Most people never check their real reading speed. ReadBoost makes it quick, accessible, 
            and useful for students, professionals, and anyone who wants to understand or improve their reading efficiency.
          </p>
        </section>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link 
            href="/test"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#9f1239] hover:bg-[#831530] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9f1239] transition-colors"
          >
            Start Reading Test
          </Link>
        </div>
      </div>
    </div>
  );
}
