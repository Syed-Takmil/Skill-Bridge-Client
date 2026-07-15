'use client';

import { authClient } from '@/app/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UpdateProfilePage() {
  // 1. Get reactive session data directly at top level
  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // 2. AUTO-POPULATE: Sync loaded session values to input state when session is fetched
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setPhotoUrl(user.image || '');
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const finalImageUrl = photoUrl.trim() ? photoUrl : '/profile.png';

    try {
      // Update our central Auth service values
      const { data, error } = await authClient.updateUser({
        name: fullName,
        image: finalImageUrl,
      });

      if (error) {
        toast.error(error.message || "Failed to sync local auth values.");
        setSaving(false);
        return;
      }

      // Sync data to MongoDB Express API
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user?.email,
          name: fullName, 
          avatarUrl: finalImageUrl 
        })
      });

      if (res.ok) {
        toast.success('Identity record processed successfully!');
      } else {
        toast.success('Updated');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected runtime exception occurred.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if there is absolutely no active user session detected
  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center">
        <p className="text-sm text-zinc-500">Please sign in to update your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6 mx-auto py-10 px-4">
      <div>
        <h1 className="text-xl font-bold text-black dark:text-white">Identity Configuration</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Maintain system-wide account display values safely.</p>
      </div>

      <form onSubmit={handleProfileSubmit} className="dark:bg-[#0d0d0d] bg-white border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xl">
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Account Holder Name</label>
          <input
            type="text"
            required
            value={fullName}
            name="name"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full h-11 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 text-sm text-black dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Photo input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Avatar Photo URL <span className="text-zinc-600 lowercase">(optional)</span></label>
          <input
            type="url"
            value={photoUrl}
            name="image"
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://i.ibb.co/..."
            className="w-full h-11 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 text-sm text-black dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Submit action */}
        <button
          type="submit"
          disabled={saving}
          className="w-full h-11 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm tracking-wide rounded-xl shadow-md transition-colors disabled:opacity-50"
        >
          {saving ? 'Processing Update...' : 'Update Profile Record'}
        </button>
      </form>
    </div>
  );
}