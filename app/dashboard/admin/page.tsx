'use client';

import { authClient } from '@/app/lib/auth-client';
import React from 'react';

export default function AdminOverviewPage() {
  const adminMetrics = [
    { label: 'Total Accounts', count: '1,240', change: '+12% this week' },
    { label: 'Active Swaps', count: '432', change: '+8% this week' },
    { label: 'Pending Verifications', count: '28', change: '-4% down' },
    { label: 'Flagged Disputes', count: '3', change: 'Requires review' },
  ];
const  {data:session}=authClient.useSession();
const userName=session?.user?.name;
  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Admin DashBoard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Global metrics tracking community growth and content flags.
        </p>
        <p>Welcome, {userName}!</p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {adminMetrics.map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-500">{card.label}</span>
            <span className="text-2xl sm:text-3xl font-black tracking-tight">{card.count}</span>
            <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">{card.change}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-sm text-gray-400 shadow-sm">
        System activities and site analytics visualizations stream container.
      </div>
    </div>
  );
}