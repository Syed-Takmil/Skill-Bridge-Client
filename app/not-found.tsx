'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-gray-900 dark:text-white transition-colors duration-200">
      
      {/* Decorative Blur Background Element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Large Status Code */}
        <div className="relative">
          <h1 className="text-9xl font-black tracking-tighter text-indigo-650 dark:text-indigo-500 opacity-20 select-none">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold tracking-tight mt-4">
            Page Not Found
          </span>
        </div>

        {/* Informative Message */}
        <div className="flex flex-col gap-2">
          <p className="text-base text-gray-650 dark:text-gray-400 font-medium">
            Oops! The page you are looking for doesn't exist or has been moved to another URL.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-550 italic">
            Double check your link destination or return safely below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
          <Link
            href="/"
            className="inline-flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-700/20 active:scale-[0.98] transition-all"
          >
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex justify-center items-center bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm px-6 py-2.5 rounded-xl active:scale-[0.98] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}