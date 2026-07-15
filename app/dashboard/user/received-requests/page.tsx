'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface ExchangeRequest {
  _id: string;
  skillId?: string; 
  customId?: number;
  skillTitle?: string;
  requesterName?: string;
  requesterEmail: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ReceivedRequestsPage() {
  const [incomingRequests, setIncomingRequests] = useState<ExchangeRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      try {
        setIsLoading(true);
        const { data } = await authClient.getSession();
        const user = data?.user;

        if (!user || !user.email) {
          throw new Error('Please log in to view received requests.');
        }

        const response = await fetch(`${API_BASE_URL}/requests?instructorEmail=${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          throw new Error('Failed to load incoming proposals.');
        }
        
        const incoming = await response.json();
        setIncomingRequests(incoming);
      } catch (err: any) {
        console.error('Fetch requests error:', err);
        toast.error(err.message || 'Error loading received proposals.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncomingRequests();
  }, []);

  const handleStatusUpdate = async (requestId: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update request decision.');
      }

      toast.success(`Request successfully ${newStatus}!`);
      
      setIncomingRequests(prev => 
        prev.map(req => req._id === requestId ? { ...req, status: newStatus } : req)
      );
    } catch (err: any) {
      console.error('Status update error:', err);
      toast.error(err.message || 'Error updating status.');
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6 min-h-screen text-gray-900 dark:text-white">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Received Requests</h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 mt-0.5">
          Approve or reject incoming swap requests from users who want to learn your skills.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : incomingRequests.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-gray-150 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-xs">
                  <th className="p-4 px-6">Requester</th>
                  <th className="p-4 px-6">Your Skill Requested</th>
                  <th className="p-4 px-6">Received On</th>
                  <th className="p-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                {incomingRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/45 transition-colors">
                    <td className="p-4 px-6 font-bold">
                      {req.requesterName || 'Interested User'}
                      <span className="block text-[10px] text-gray-400 font-normal">{req.requesterEmail}</span>
                    </td>
                    <td className="p-4 px-6 text-indigo-650 dark:text-indigo-400 font-medium">
                      {req.skillTitle || `Skill reference ID: #${req.customId || (req.skillId ? req.skillId.slice(-6) : 'N/A')}`}
                    </td>
                    <td className="p-4 px-6 text-gray-500 text-xs">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="p-4 px-6 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'Approved')}
                            className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                            className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          req.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                          'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-12 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
          <span className="text-2xl">📥</span>
          <p className="font-medium text-gray-550">No incoming exchange requests yet.</p>
        </div>
      )}
    </div>
  );
}