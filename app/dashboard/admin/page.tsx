'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface UserData {
  _id: string;
  role?: string;
  [key: string]: any;
}

export default function AdminOverviewPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || 'Admin';

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate real metrics from the API data
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === 'admin').length;
  const standardUsers = totalUsers - adminUsers;

  const realMetrics = [
    { label: 'Total Accounts', count: totalUsers.toString() },
    { label: 'Admin Accounts', count: adminUsers.toString() },
    { label: 'Standard Users', count: standardUsers.toString() },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Global metrics tracking live platform statistics.
        </p>
        <p className="mt-2 text-sm font-medium text-orange-500">Welcome, {userName}!</p>
      </div>

      {/* Admin Stats Grid - Populated by Real API Data */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-3 text-sm text-gray-400">Loading live metrics...</div>
        ) : (
          realMetrics.map((card, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-2"
            >
              <span className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-500">
                {card.label}
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight">
                {card.count}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-sm text-gray-400 shadow-sm">
        Dashboard is live and synced with the database.
      </div>
    </div>
  );
}