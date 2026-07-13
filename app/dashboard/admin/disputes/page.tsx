'use client';

import React from 'react';

export default function AdminDisputesPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Platform Disputes</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Moderate reports regarding missed sessions or poor conduct behavior.</p>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center text-sm text-gray-400">
        Open user tickets and resolution boards dashboard.
      </div>
    </div>
  );
}