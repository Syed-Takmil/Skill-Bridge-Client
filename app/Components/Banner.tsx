import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="w-full min-h-[calc(100vh-5rem)] bg-white dark:bg-gray-950 flex items-center justify-center py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT SIDE: Content */}
        <div className="flex flex-col items-start gap-6 lg:col-span-6 xl:col-span-7">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-400">
            <span className="text-green-500 font-bold">🌱</span> Learn. Teach. Grow Together.
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Exchange Skills, <br />
            <span className="text-indigo-600 dark:text-indigo-400">Build Connections</span>
          </h1>

          {/* Subheading Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            SkillBridge is a community where people teach what they know and learn what they love.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mt-2">
            <Link 
              href="/explore" 
              className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium text-base px-6 py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none"
            >
              Explore Skills
            </Link>
            <a
              href="#how-it-works" 
              className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-medium text-base px-6 py-3.5 rounded-xl transition-all shadow-sm"
            >
              {/* Play Icon */}
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              How it Works
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Visual Graphics */}
        <div className="relative w-full h-[400px] sm:h-[480px] lg:col-span-6 xl:col-span-5 flex items-center justify-center">
          
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/30 to-purple-100/20 dark:from-indigo-950/20 dark:to-transparent rounded-full filter blur-3xl scale-75 -z-10" />

          {/* 1. TOP PROFILE CARD (The Teacher) */}
          <div className="absolute top-4 left-4 sm:left-12 xl:left-4 z-20 animate-fade-in">
            <div className="relative p-1 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full w-36 h-36 sm:w-44 sm:h-44 shadow-xl">
              <div className="w-full h-full rounded-full bg-pink-100 overflow-hidden relative">
                {/* Replace src with your dynamic/static avatar path */}
                <Image 
                  src="/avatar-female.png" 
                  alt="Teacher Profile" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* "I can teach Figma" Tag */}
            <div className="absolute top-6 -right-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-3 flex flex-col gap-0.5 pointer-events-none min-w-[100px]">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">I can teach</span>
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Figma</span>
            </div>
          </div>

          {/* 2. BOTTOM PROFILE CARD (The Learner) */}
          <div className="absolute bottom-4 right-4 sm:right-12 xl:right-4 z-10">
            <div className="relative p-1 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full w-40 h-40 sm:w-48 sm:h-48 shadow-xl">
              <div className="w-full h-full rounded-full bg-teal-100 overflow-hidden relative">
                {/* Replace src with your dynamic/static avatar path */}
                <Image 
                  src="/avatar-male.png" 
                  alt="Learner Profile" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* "I want to learn React" Tag */}
            <div className="absolute bottom-10 -left-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-3 flex flex-col gap-0.5 pointer-events-none min-w-[110px]">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">I want to learn</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">React</span>
            </div>
          </div>

          {/* Decorator SVG Lines & Elements mimicking connecting loops */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="currentColor">
              {/* Curved path representing data/skill flow connecting the profiles */}
              <path d="M180,140 Q 250,180 230,240" strokeWidth="2" strokeDasharray="4 4" className="text-indigo-400" />
              <path d="M220,120 Q 300,100 320,160" strokeWidth="1.5" className="text-purple-400" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}