'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  // Interactive active state to swap modes dynamically
  const [activeMode, setActiveMode] = useState<'learn' | 'teach'>('learn');

  const scrollToNextSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById('how-it-works');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full min-h-[65vh] bg-white dark:bg-gray-950 flex flex-col items-center justify-center pt-12 pb-8 px-6 md:px-12 lg:px-20 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center flex-1">
        
        {/* LEFT SIDE: Content */}
        <div className="flex flex-col items-start gap-5 lg:col-span-6 xl:col-span-7 z-10">
          
          {/* Interactive Mode Toggle Selector */}
          <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex items-center gap-1 border border-gray-200/60 dark:border-gray-800 text-xs font-bold shadow-inner">
            <button
              onClick={() => setActiveMode('learn')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMode === 'learn'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              🔍 Find a Skill
            </button>
            <button
              onClick={() => setActiveMode('teach')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMode === 'teach'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              📢 Share Your Expertise
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Exchange Skills, <br />
            <span className="text-indigo-600 dark:text-indigo-400">Build Connections</span>
          </h1>

          {/* Subheading Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            SkillBridge is a decentralized community engine where individuals swap specialized training, mentorship pipelines, and creative insights seamlessly.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mt-1">
            <Link 
              href="/explore" 
              className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none active:scale-[0.98]"
            >
              Explore Skills
            </Link>
            <button
              onClick={scrollToNextSection}
              className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Visual Graphics */}
        <div className="relative w-full h-[320px] sm:h-[380px] lg:col-span-6 xl:col-span-5 flex items-center justify-center mt-6 lg:mt-0">
          
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/30 to-purple-100/20 dark:from-indigo-950/20 dark:to-transparent rounded-full filter blur-3xl scale-75 -z-10" />

          {/* 1. TOP PROFILE CARD (The Teacher) */}
          <div className={`absolute top-2 left-6 sm:left-14 xl:left-4 z-20 transition-all duration-500 transform ${
            activeMode === 'teach' ? 'scale-110 rotate-1 shadow-2xl' : 'scale-95 opacity-80 -rotate-2'
          }`}>
            <div className="relative p-1 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full w-28 h-28 sm:w-36 sm:h-36 shadow-lg">
              <div className="w-full h-full rounded-full bg-pink-100 overflow-hidden relative">
                <Image 
                  src="/avatar-female.png" 
                  alt="Teacher Profile" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Dynamic Label Tag */}
            <div className="absolute -top-2 -right-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-md rounded-xl p-2.5 flex flex-col gap-0.5 pointer-events-none min-w-[90px]">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">
                {activeMode === 'teach' ? 'Hosting Session' : 'Instructor'}
              </span>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">Figma Design</span>
            </div>
          </div>

          {/* 2. BOTTOM PROFILE CARD (The Learner) */}
          <div className={`absolute bottom-2 right-6 sm:right-14 xl:right-4 z-10 transition-all duration-500 transform ${
            activeMode === 'learn' ? 'scale-110 -rotate-1 shadow-2xl' : 'scale-95 opacity-80 rotate-2'
          }`}>
            <div className="relative p-1 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full w-32 h-32 sm:w-40 sm:h-40 shadow-lg">
              <div className="w-full h-full rounded-full bg-teal-100 overflow-hidden relative">
                <Image 
                  src="/avatar-male.png" 
                  alt="Learner Profile" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Dynamic Label Tag */}
            <div className="absolute -bottom-2 -left-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-md rounded-xl p-2.5 flex flex-col gap-0.5 pointer-events-none min-w-[100px]">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">
                {activeMode === 'learn' ? 'Looking For' : 'Student'}
              </span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">React Core</span>
            </div>
          </div>

          {/* Decorator SVG Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="currentColor">
              <path d="M160,130 Q 240,170 220,230" strokeWidth="2" strokeDasharray="4 4" className="text-indigo-400" />
              <path d="M200,110 Q 280,90 300,150" strokeWidth="1.5" className="text-purple-400" />
            </svg>
          </div>

        </div>
      </div>

      {/* FOOTER ACTION: Visual Flow Anchor pointing to Next Content Container */}
      <div className="w-full flex justify-center mt-4">
        <button 
          onClick={scrollToNextSection}
          className="text-gray-400 dark:text-gray-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors animate-bounce focus:outline-none"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}