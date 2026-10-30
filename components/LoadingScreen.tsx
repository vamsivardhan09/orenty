'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasLoaded = sessionStorage.getItem('orenty_intro_played');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('orenty_intro_played', 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#03050c] overflow-hidden"
        >
          {/* Subtle ambient light burst */}
          <div className="absolute h-96 w-96 rounded-full bg-violet-600/20 blur-[100px] pointer-events-none animate-pulse-slow" />

          {/* Precision Drawing Mark */}
          <div className="relative z-10 flex flex-col items-center">
            <svg
              width="90"
              height="80"
              viewBox="0 0 200 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_25px_rgba(167,139,250,0.6)]"
            >
              {/* Outer stroke path drawing */}
              <motion.path
                d="M37.773 11.555C25.103 14.626 15.454 21.773 10.845 31.5l-2.843 6-.001 51.281c-.001 58.645-.362 56.47 7.895 47.597 5.023-5.398 60.824-65.933 92.354-100.19C119.112 24.387 128 14.373 128 13.937c0-.437-.707-1.501-1.571-2.366-1.38-1.379-6.53-1.561-42.25-1.488-31.053.064-42.034.412-46.406 1.472m100.977-.475c-3.47 2.021-2.18 6.611 3.583 12.744 2.933 3.122 14.252 15.801 25.154 28.176s20.461 22.652 21.242 22.838 2.286-.447 3.345-1.405c1.799-1.628 1.925-3.301 1.904-25.338-.019-20.799-.241-24.069-1.868-27.595-2.136-4.628-5.422-7.917-9.425-9.433-3.653-1.384-41.556-1.373-43.935.013m-1.436 81.61c-6.497 5.33-23.289 19.589-37.314 31.688a48014 48014 0 0 1-34.75 29.954c-14.774 12.708-18.154 11.787 42 11.453l51.25-.285 7.82-3.734c10.227-4.883 19.531-13.689 23.959-22.676l3.221-6.536.31-19.926c.332-21.417-.121-24.154-4.58-27.662-2.284-1.796-4.122-1.966-21.3-1.966h-18.801z"
                stroke="#c4b5fd"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
              />

              {/* Infill reveal once traced */}
              <motion.path
                d="M37.773 11.555C25.103 14.626 15.454 21.773 10.845 31.5l-2.843 6-.001 51.281c-.001 58.645-.362 56.47 7.895 47.597 5.023-5.398 60.824-65.933 92.354-100.19C119.112 24.387 128 14.373 128 13.937c0-.437-.707-1.501-1.571-2.366-1.38-1.379-6.53-1.561-42.25-1.488-31.053.064-42.034.412-46.406 1.472m100.977-.475c-3.47 2.021-2.18 6.611 3.583 12.744 2.933 3.122 14.252 15.801 25.154 28.176s20.461 22.652 21.242 22.838 2.286-.447 3.345-1.405c1.799-1.628 1.925-3.301 1.904-25.338-.019-20.799-.241-24.069-1.868-27.595-2.136-4.628-5.422-7.917-9.425-9.433-3.653-1.384-41.556-1.373-43.935.013m-1.436 81.61c-6.497 5.33-23.289 19.589-37.314 31.688a48014 48014 0 0 1-34.75 29.954c-14.774 12.708-18.154 11.787 42 11.453l51.25-.285 7.82-3.734c10.227-4.883 19.531-13.689 23.959-22.676l3.221-6.536.31-19.926c.332-21.417-.121-24.154-4.58-27.662-2.284-1.796-4.122-1.966-21.3-1.966h-18.801z"
                fill="#ffffff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </svg>

            {/* Glowing Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 flex flex-col items-center text-center"
            >
              <span className="font-display tracking-[0.35em] text-sm text-slate-100 font-semibold">
                ORENTY
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-violet-400/80 uppercase">
                SYSTEM INITIALIZING
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
