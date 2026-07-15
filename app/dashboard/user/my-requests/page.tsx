'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface ExchangeRequest {
  _id: string;
  skillId?: string;
  customId?: number;
  skillTitle?: string;
  instructorName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await authClient.getSession();
        const user = data?.user;

        // If the user isn't fully loaded yet, do not perform the fetch
        if (!user || !user.email) {
          throw new Error('Please log in to view your requested swaps.');
        }

        const response = await fetch(`${API_BASE_URL}/requests?requesterEmail=${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          throw new Error('Could not fetch your outgoing requests.');
        }
        
        const dataJson = await response.json();
        setRequests(dataJson);
      } catch (err: any) {
        console.error('Sent requests fetch error:', err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6 min-h-screen">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">My Requests</h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 mt-0.5">
          Track the live status of exchange proposals you sent to other instructors.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl p-8 text-center text-rose-500">
          ⚠️ {error}
        </div>
      ) : requests.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-gray-150 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                  <th className="p-4 px-6">Instructor</th>
                  <th className="p-4 px-6">Requested Asset</th>
                  <th className="p-4 px-6">Sent On</th>
                  <th className="p-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/45 transition-colors">
                    <td className="p-4 px-6 font-bold">{req.instructorName}</td>
                    <td className="p-4 px-6 text-indigo-650 dark:text-indigo-400 font-medium">
                      {req.skillTitle || `Skill reference ID: #${req.customId || (req.skillId ? req.skillId.slice(-6) : 'N/A')}`}
                    </td>
                    <td className="p-4 px-6 text-gray-500 text-xs">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="p-4 px-6 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        req.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                        req.status === 'Rejected' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                        'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}>
                        {req.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-12 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
          <span className="text-2xl">📬</span>
          <p className="font-medium text-gray-550">No outgoing requests sent yet.</p>
        </div>
      )}
    </div>
  );
}