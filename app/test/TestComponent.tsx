'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SAMPLE_TEXT = `In the heart of a restless city, where skyscrapers brushed the clouds and neon lights breathed color into the night, a quiet librarian named Maya kept her tiny library alive. Tucked between a coffee shop and an old antique store, her library was a warm secret — a place where she believed the magic of stories still whispered through the shelves.

One rainy afternoon, an elderly man walked in, moving with the familiarity of someone revisiting an old dream. His name was Professor Alistair, a historian who had spent decades chasing legends of lost civilizations. While searching for a rare manuscript, he pulled down a dusty book — and a small, ornate key slipped out, shimmering with strange engravings. The professor froze. It was the key from a legend he had followed for years: a hidden library beneath the city where forgotten stories were said to sleep.

Guided by old clues, cryptic notes, and passages concealed in the margins of ancient books, Maya and the professor set out on a quiet adventure. They discovered hidden rooms, met strangers who guarded fragments of the same myth, and slowly assembled the path toward the underground library — a place said to hold every story the world had misplaced.

When they finally found it, shelves stretched into the dark like forests of memory, and books glowed faintly as though lit from within. Maya felt something unlock inside her — the certainty that stories weren’t just words but living worlds. She became the guardian of this forgotten place, and the professor, after a lifetime of searching, found the answers he never knew he needed.

In the years that followed, whenever people asked Maya how she discovered such a wondrous library, she simply smiled and said, “All I wanted was a good book — and the stories led the way.`

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
  const [testComplete, setTestComplete] = useState(false);
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
