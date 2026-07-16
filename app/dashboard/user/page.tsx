'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useEffect, useState } from 'react';

// --- TS INTERFACES MATCHING BACKEND STRUCTS ---
interface SkillItem {
  _id: string;
  id: number;
  title: string;
  category: string;
  instructor: {
    name: string;
    email: string;
    avatar?: string;
  };
}

interface RequestItem {
  _id: string;
  requesterEmail: string;
  instructorEmail: string;
  skillTitle: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  requesterName?: string;
  requesterAvatar?: string;
}

export default function DashboardPage() {
  // Fixed: Correct React Hook usage for the client component session retrieval
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  // Data State
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [requestsSent, setRequestsSent] = useState<RequestItem[]>([]);
  const [requestsReceived, setRequestsReceived] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define API Base URL (Change to match your backend port/domain)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (sessionLoading || !session?.user?.email) return;

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const userEmail = session.user.email;

        // 1. Fetch skills registered by this specific user
        const skillsRes = await fetch(`${API_BASE_URL}/skills?email=${encodeURIComponent(userEmail)}`);
        const skillsData = await skillsRes.json();
        setSkills(Array.isArray(skillsData) ? skillsData : []);

        // 2. Fetch requests sent BY this user
        const sentRes = await fetch(`${API_BASE_URL}/requests?requesterEmail=${encodeURIComponent(userEmail)}`);
        const sentData = await sentRes.json();
        setRequestsSent(Array.isArray(sentData) ? sentData : []);

        // 3. Fetch requests received BY this user as an instructor
        const receivedRes = await fetch(`${API_BASE_URL}/requests?instructorEmail=${encodeURIComponent(userEmail)}`);
        const receivedData = await receivedRes.json();
        setRequestsReceived(Array.isArray(receivedData) ? receivedData : []);

      } catch (error) {
        console.error("Failed to aggregate dashboard metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, sessionLoading, API_BASE_URL]);

  // Handle Loading States
  if (sessionLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-sm font-semibold text-gray-400 animate-pulse">Loading workspace analytics...</span>
      </div>
    );
  }

  // Calculate live numeric metric items based on database queries
  const totalCompleted = [
    ...requestsSent, 
    ...requestsReceived
  ].filter(req => req.status === 'Approved').length;

  const metrics = [
    { label: 'My Registered Skills', count: skills.length },
    { label: 'Requests Sent', count: requestsSent.length },
    { label: 'Requests Received', count: requestsReceived.length },
    { label: 'Approved Exchanges', count: totalCompleted },
  ];

  // Combine and sort total incoming/outgoing logs to build the chronological list feed
  const allRecentRequests = [...requestsSent, ...requestsReceived]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5); // Limit down to top 5 initial display view items

  // Category mapping tracker logic for the visual chart breakdown
  const categoryCounts: Record<string, number> = {};
  skills.forEach(skill => {
    if (skill.category) {
      categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
    }
  });

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 overflow-y-auto">
      
      {/* Workspace Top Header Utility */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, <span className="font-bold text-gray-800 dark:text-white">{session?.user?.name || 'User'}! 👋</span></p>
        </div>

        {/* Quick Profile Actions Dropdown Badge */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg hover:bg-gray-50 shadow-sm relative">
            🔔
            {requestsReceived.some(r => r.status === 'Pending') && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </button>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 border border-gray-200 dark:border-gray-800 overflow-hidden relative flex items-center justify-center font-bold text-sm">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>👨‍💻</span>
            )}
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
            <h2 className="font-extrabold text-base tracking-tight">Requests Volume Overview</h2>
          </div>
          <div className="w-full h-48 relative mt-2 flex items-end justify-center">
            {allRecentRequests.length === 0 ? (
              <span className="text-xs text-gray-400 mb-20 font-medium">No system database volume logs recorded yet.</span>
            ) : (
              <svg className="w-full h-full text-indigo-500" viewBox="0 0 500 200" fill="none" preserveAspectRatio="none">
                <path d="M 0 160 Q 50 190 100 130 T 200 140 T 300 120 T 400 80 T 500 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0 160 Q 50 190 100 130 T 200 140 T 300 120 T 400 80 T 500 40 L 500 200 L 0 200 Z" fill="currentColor" fillOpacity="0.04" />
              </svg>
            )}
          </div>
        </div>

        {/* Categories Dynamic Segment Grid Mapping List */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:col-span-5 shadow-sm flex flex-col justify-between gap-4">
          <h2 className="font-extrabold text-base tracking-tight">Your Skill Categories Breakdown</h2>
          <div className="flex flex-col justify-center gap-2 h-full py-2">
            {Object.keys(categoryCounts).length === 0 ? (
              <span className="text-xs text-gray-400 font-medium self-center">Register skills to initialize category tracking matrices.</span>
            ) : (
              Object.entries(categoryCounts).map(([category, count], idx) => (
                <div key={category} className="flex items-center justify-between text-xs font-semibold border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-none">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      idx % 3 === 0 ? 'bg-purple-500' : idx % 3 === 1 ? 'bg-indigo-500' : 'bg-teal-400'
                    }`} />
                    <span className="text-gray-600 dark:text-gray-400 truncate">{category}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-bold">{count} {count === 1 ? 'skill' : 'skills'}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Bottom Table List: Live System Request Rows */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-base tracking-tight">Recent Live Activity Stream</h2>
        </div>

        <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800/60">
          {allRecentRequests.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-400 font-medium">
              No recent requests matching your active account identities.
            </div>
          ) : (
            allRecentRequests.map((req) => {
              // Fixed: Using optional chaining safe access navigation syntax to satisfy compiler guards
              const isIncoming = req.instructorEmail === session?.user?.email;
              return (
                <div key={req._id} className="flex items-center justify-between py-4 first:pt-1 last:pb-1 text-sm font-semibold">
                  {/* Participant Information mapping */}
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center shadow-inner">
                      {isIncoming ? '📥' : '📤'}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-gray-900 dark:text-white font-bold truncate max-w-[150px] sm:max-w-none">
                        {isIncoming ? `From: ${req.requesterEmail}` : `To: ${req.instructorEmail}`}
                      </span>
                    </div>
                  </div>

                  {/* Targeted exchange asset parameter title */}
                  <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[180px]">
                    {req.skillTitle || "Skill Exchange Request"}
                  </span>

                  {/* Context Color Status Flags mapping */}
                  <div className="flex items-center gap-6">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                      'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                    }`}>
                      {req.status === 'Approved' ? 'Accepted' : req.status}
                    </span>
                    <span className="text-xs text-gray-400 font-normal whitespace-nowrap min-w-[50px] text-right">
                      {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </main>
  );
}