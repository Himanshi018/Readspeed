'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SAMPLE_TEXT = `In the heart of a bustling city, where skyscrapers touched the clouds and neon signs painted the night sky, there lived a young librarian named Maya. Her small, cozy library was tucked away between a coffee shop and an antique bookstore, a hidden gem that few people knew about. Maya had always believed that books held magic within their pages, stories that could transport readers to distant lands and forgotten times.

One rainy Tuesday afternoon, as thunder rumbled overhead and rain tapped gently against the windows, an elderly man with kind eyes and a worn leather satchel entered the library. He moved slowly, his fingers tracing the spines of books as if greeting old friends. Maya watched him with curiosity, noticing how he seemed to know exactly where each book belonged, even though he had never visited before.

The man introduced himself as Professor Alistair, a retired historian who had spent his life studying ancient civilizations. He had come to the library seeking a rare manuscript about lost cities, but what he found instead was something far more extraordinary. As he pulled a dusty volume from the highest shelf, a small, ornate key fell to the floor with a soft clink.

Maya picked up the key, noticing intricate engravings that seemed to shimmer in the dim light. Professor Alistair's eyes widened with recognition. He explained that the key was part of a legend he had been researching for decades—a story about a hidden library beneath the city, a place where all forgotten stories were preserved, waiting for the right person to discover them.

Together, Maya and Professor Alistair embarked on an adventure that would change their lives forever. They followed clues hidden in old books, deciphered cryptic messages written in margins, and discovered secret passages that had been sealed for centuries. Along the way, they met other book lovers who had also stumbled upon fragments of the legend, each person adding a piece to the puzzle.

The journey taught Maya that libraries were not just buildings filled with books, but gateways to infinite worlds. She learned that every story, no matter how small or forgotten, had the power to connect people across time and space. And when they finally found the hidden library, with its towering shelves reaching into darkness and books that seemed to glow with inner light, Maya understood that she had found her true calling.

The hidden library became a sanctuary for stories that the world had nearly forgotten—tales of courage, love, adventure, and hope. Maya became its guardian, ensuring that these precious narratives would never be lost again. And Professor Alistair, with tears of joy in his eyes, finally found the answers he had been seeking his entire life, not in dusty archives, but in the living, breathing stories that surrounded them.

Years later, when people asked Maya how she had discovered such a remarkable place, she would simply smile and say, "Sometimes the greatest adventures begin when you're simply looking for a good book to read." The library continued to grow, its shelves expanding with every story that needed a home, and Maya knew that as long as there were stories to tell, there would always be a place for them in her magical library.`;

const WORDS_COUNT = SAMPLE_TEXT.split(/\s+/).length;

type TestPhase = 'ready' | 'reading' | 'finished';

function getSpeedMessage(wpm: number): string {
  if (wpm >= 400) {
    return "You're basically The Flash with words! ⚡";
  } else if (wpm >= 300) {
    return "Speed reader extraordinaire! You devour books like snacks! 📚";
  } else if (wpm >= 250) {
    return "Impressive! You're reading at lightning speed! 🌟";
  } else if (wpm >= 200) {
    return "Great pace! You're faster than most readers! 🚀";
  } else if (wpm >= 150) {
    return "Solid reading speed! Keep it up! 💪";
  } else if (wpm >= 100) {
    return "Good pace! You're reading comfortably! 📖";
  } else {
    return "Take your time! Reading is about enjoyment, not speed! 😊";
  }
}

function getPercentile(wpm: number): number {
  if (wpm >= 400) return 98;
  if (wpm >= 350) return 95;
  if (wpm >= 300) return 90;
  if (wpm >= 250) return 80;
  if (wpm >= 200) return 65;
  if (wpm >= 150) return 45;
  if (wpm >= 100) return 25;
  return 10;
}

export default function TestComponent() {
  const [phase, setPhase] = useState<TestPhase>('ready');
  const [timeLeft, setTimeLeft] = useState(60);
  const [wordsRead, setWordsRead] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [finalWpm, setFinalWpm] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== 'reading') return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    wpmIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedMinutes = Math.max((Date.now() - startTimeRef.current) / 60000, 1 / 60);
        setWpm(Math.round(wordsRead / elapsedMinutes));
      }
    }, 300);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [phase, wordsRead]);

  const handleStart = () => {
    setPhase('reading');
    setTimeLeft(60);
    setWordsRead(0);
    setWpm(0);
    startTimeRef.current = Date.now();
  };

  const handleTestComplete = () => {
    if (phase !== 'reading') return;
    const elapsedMinutes =
      startTimeRef.current !== null ? Math.max((Date.now() - startTimeRef.current) / 60000, 1 / 60) : 1;
    setFinalWpm(Math.round(wordsRead / elapsedMinutes));
    setPhase('finished');
    setShowConfetti(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
  };

  const handleRestart = () => {
    setPhase('ready');
    setTimeLeft(60);
    setWordsRead(0);
    setWpm(0);
    setFinalWpm(0);
    setShowConfetti(false);
    startTimeRef.current = null;
  };

  useEffect(() => {
    if (phase !== 'reading' || !textContainerRef.current) return;

    const handleScroll = () => {
      const container = textContainerRef.current;
      if (!container) return;
      const progress = Math.min(
        container.scrollTop / Math.max(container.scrollHeight - container.clientHeight, 1),
        1
      );
      setWordsRead(Math.min(Math.round(WORDS_COUNT * progress), WORDS_COUNT));
    };

    const container = textContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    const interval = setInterval(handleScroll, 400);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [phase]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff1f0] via-[#ffe9e4] to-[#ffe4e1] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[32px] border border-white/40 bg-white/80 p-6 shadow-[0_40px_120px_rgba(255,107,107,0.18)] backdrop-blur-2xl sm:p-10">
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#ff6b6b]">Guided Test</p>
            <h1 className="text-4xl font-semibold text-[#4a1f1f] sm:text-5xl">Reading Speed Test</h1>
            <p className="text-base text-[#8b4d46] sm:text-lg">
              Scroll the peach story, tap start, and follow the 60-sec countdown with live WPM.
            </p>
          </div>

          {phase === 'ready' && (
            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-[#ffd1c1]/60 bg-[#fff7f5] p-6 text-base leading-relaxed text-[#5d2f2f] shadow-inner sm:text-lg">
                <p className="whitespace-pre-wrap">{SAMPLE_TEXT}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleStart}
                  className="w-full rounded-2xl bg-[#ff6b6b] px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,107,107,0.25)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6b6b]/40 sm:w-auto sm:px-12 sm:text-xl"
                >
                  Start Reading
                </button>
                <p className="text-xs uppercase tracking-[0.4em] text-[#a76a62]">
                  60-sec timer • Live WPM • Fun results
                </p>
              </div>
            </div>
          )}

          {phase === 'reading' && (
            <div className="mt-10 space-y-6">
              <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-[#ffe1dd] to-[#ffd5cf] p-6 text-center sm:flex-row sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#b1564d]">Timer</p>
                  <div className="text-6xl font-bold text-[#ff6b6b] sm:text-7xl">{timeLeft}</div>
                  <p className="mt-1 text-sm text-[#a96763]">seconds left</p>
                </div>
                <div className="hidden h-16 w-px bg-white/50 sm:block sm:h-24" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#b1564d]">Live WPM</p>
                  <div className="text-4xl font-semibold text-[#d94862] sm:text-5xl">{wpm}</div>
                  <p className="mt-1 text-sm text-[#a96763]">words per minute</p>
                </div>
              </div>

              <div
                ref={textContainerRef}
                className="max-h-96 overflow-y-auto rounded-3xl border border-[#ffd1c1]/80 bg-white/70 p-6 text-base leading-relaxed text-[#4a2b2b] shadow-inner sm:text-lg"
              >
                <p className="whitespace-pre-wrap select-text">{SAMPLE_TEXT}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleTestComplete}
                  className="w-full rounded-2xl bg-[#4a1f1f] px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(74,31,31,0.3)] transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4a1f1f]/40 sm:w-auto sm:px-12 sm:text-xl"
                >
                  I'm Done
                </button>
              </div>
            </div>
          )}

          {phase === 'finished' && (
            <div className="mt-10 space-y-8">
              {showConfetti && (
                <div className="pointer-events-none fixed inset-0 z-50">
                  {[...Array(90)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-confetti"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                        backgroundColor: ['#ff6b6b', '#ffd166', '#f78fb3', '#f97316', '#facc15'][
                          Math.floor(Math.random() * 5)
                        ]
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="rounded-3xl border border-[#ffd1c1]/80 bg-[#fff7f5] p-8 text-center shadow-inner">
                <p className="text-xs uppercase tracking-[0.4em] text-[#ff6b6b]">Results</p>
                <div className="mt-4 text-5xl font-semibold text-[#4a1f1f] sm:text-6xl">
                  Your speed: {finalWpm} WPM
                </div>
                <p className="mt-2 text-xl text-[#8b4d46] sm:text-2xl">
                  Faster than {getPercentile(finalWpm)}% of people!
                </p>
                <p className="mt-4 text-lg text-[#b1564d] sm:text-xl">{getSpeedMessage(finalWpm)}</p>
                <p className="mt-2 text-sm text-[#a96763]">Words tracked: {wordsRead}</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={handleRestart}
                  className="w-full rounded-2xl bg-[#ff6b6b] px-8 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,107,107,0.25)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff6b6b]/40 sm:w-auto sm:px-10"
                >
                  Restart Test
                </button>
                <Link
                  href="/"
                  className="w-full rounded-2xl border border-[#ffd1c1]/70 bg-white/80 px-8 py-4 text-center text-lg font-semibold text-[#4a1f1f] shadow-[0_15px_40px_rgba(255,209,193,0.4)] transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd1c1]/60 sm:w-auto sm:px-10"
                >
                  Back to Home
                </Link>
              </div>

              <button
                type="button"
                className="w-full rounded-2xl border border-[#ff6b6b]/40 bg-white px-6 py-4 text-base font-semibold text-[#ff6b6b] shadow-[0_15px_60px_rgba(255,107,107,0.2)] transition hover:-translate-y-1 sm:w-auto"
              >
                Remove watermark + Save history – $9 one-time
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          width: 10px;
          height: 16px;
          position: absolute;
          top: -10px;
          border-radius: 4px;
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
