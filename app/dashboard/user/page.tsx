'use client';

import Link from 'next/link';
import React, { useState } from 'react';

// --- TS INTERFACES ---
interface StatCardProps {
  label: string;
  count: number;
}

interface RequestItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  skill: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  timeAgo: string;
}

export default function DashboardPage() {
 

  // Mock analytical card metric data
  const metrics: StatCardProps[] = [
    { label: 'My Skills', count: 12 },
    { label: 'Requests Sent', count: 8 },
    { label: 'Requests Received', count: 15 },
    { label: 'Completed', count: 6 },
  ];

  // Recent request rows mock state data
  const recentRequests: RequestItem[] = [
    { id: 1, user: { name: 'Sarah Smith', avatar: '👩‍🎨' }, skill: 'UI/UX Design', status: 'Pending', timeAgo: '2h ago' },
    { id: 2, user: { name: 'Mike Johnson', avatar: '👨‍💻' }, skill: 'Python Programming', status: 'Accepted', timeAgo: '1d ago' },
    { id: 3, user: { name: 'Emma Brown', avatar: '👩‍🏫' }, skill: 'English Speaking', status: 'Rejected', timeAgo: '2d ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white flex transition-colors duration-300">
      
     

      {/* ================= RIGHT WORKSPACE DASHBOARD ================= */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 overflow-y-auto">
        
        {/* Workspace Top Header Utility */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, <span className="font-bold text-gray-800 dark:text-white">John! 👋</span></p>
          </div>

          {/* Quick Profile Actions Dropdown Badge */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg hover:bg-gray-50 shadow-sm relative">
              🔔
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 border border-gray-200 dark:border-gray-800 overflow-hidden relative flex items-center justify-center font-bold text-sm">
              👨‍💻
            </div>
          </div>
        </div>

        {/* 1. Analytic Summary Cards Grid Layer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-2">
              <span className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-500">{card.label}</span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight">{card.count}</span>
            </div>
          ))}
        </div>

        {/* 2. Visual Charts Container Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Requests Overview Data Trend Vector Canvas Box */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:col-span-7 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base tracking-tight">Requests Overview</h2>
              <select className="bg-slate-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-lg text-xs font-semibold px-2 py-1 text-gray-500">
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            {/* SVG Visual Data Line Vector representation mockup */}
            <div className="w-full h-48 relative mt-2 flex items-end">
              <svg className="w-full h-full text-indigo-500" viewBox="0 0 500 200" fill="none" preserveAspectRatio="none">
                <path d="M 0 160 Q 50 190 100 130 T 200 140 T 300 120 T 400 80 T 500 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0 160 Q 50 190 100 130 T 200 140 T 300 120 T 400 80 T 500 40 L 500 200 L 0 200 Z" fill="currentColor" fillOpacity="0.04" />
              </svg>
              {/* Bottom Scale Markers */}
              <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] font-bold text-gray-400 px-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>
          </div>

          {/* Top Categories Donut Segment Visual Canvas Block */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:col-span-5 shadow-sm flex flex-col justify-between gap-4">
            <h2 className="font-extrabold text-base tracking-tight">Top Categories</h2>
            <div className="flex flex-row items-center justify-between gap-4 h-full py-2">
              {/* Mock Donut Ring Layout using modern CSS Gradient masking properties */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full relative flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-teal-400 flex-shrink-0">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white dark:bg-gray-900" />
              </div>
              {/* Colored Key Metrics Indicators Legend */}
              <div className="flex flex-col gap-2 w-full max-w-[140px]">
                <div className="flex items-center gap-2 text-xs font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" /><span className="text-gray-600 dark:text-gray-400 truncate">Programming</span></div>
                <div className="flex items-center gap-2 text-xs font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" /><span className="text-gray-600 dark:text-gray-400 truncate">Design</span></div>
                <div className="flex items-center gap-2 text-xs font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0" /><span className="text-gray-600 dark:text-gray-400 truncate">Marketing</span></div>
                <div className="flex items-center gap-2 text-xs font-semibold"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" /><span className="text-gray-600 dark:text-gray-400 truncate">Language</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Table List: Recent Requests Status Board */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base tracking-tight">Recent Requests</h2>
            <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View all requests →</button>
          </div>

          <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/60">
            {recentRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between py-4 first:pt-1 last:pb-1 text-sm font-semibold">
                {/* User Data Group */}
                <div className="flex items-center gap-3">
                  <span className="text-xl w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center shadow-inner">{req.user.avatar}</span>
                  <div className="flex flex-col">
                    <span className="text-gray-900 dark:text-white font-bold">{req.user.name}</span>
                  </div>
                </div>

                {/* Selected Skill Title */}
                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[180px]">{req.skill}</span>

                {/* Status Badge + Temporal Meta fields mapping */}
                <div className="flex items-center gap-6">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                    req.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                    req.status === 'Pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                    'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                  }`}>
                    {req.status}
                  </span>
                  <span className="text-xs text-gray-400 font-normal whitespace-nowrap min-w-[50px] text-right">{req.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}