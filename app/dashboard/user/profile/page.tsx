'use client';

import React from 'react';

export default function ProfilePage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Public Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your public bio, avatar imagery, and general expertise descriptors.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-sm text-gray-400">
        User profile mutation settings window.
      </div>
    </div>
  );
}