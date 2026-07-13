'use client';

import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6 animate-pulse select-none">
      
      {/* Top: Icon Placeholder Box */}
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />

      {/* Mid Content */}
      <div className="flex flex-col gap-3">
        {/* Title Lines */}
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2" />
        
        {/* Instructor Metadata */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-md w-24" />
        </div>
      </div>

      {/* Bottom Stats Meta */}
      <div className="border-t border-gray-50 dark:border-gray-800/60 pt-4 flex items-center justify-between">
        {/* Rating info */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 dark:bg-gray-800 rounded-sm" />
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-md w-8" />
        </div>

        {/* Badge details */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-12" />
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-16" />
        </div>
      </div>

    </div>
  );
}