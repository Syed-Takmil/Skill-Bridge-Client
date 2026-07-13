'use client';

import React from 'react';
import Link from 'next/link';

export interface SkillCardProps {
  id: number;
  title: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
  };
  rating: number;
  reviewsCount: number;
  level: 'Expert' | 'Intermediate' | 'Beginner';
  availability: 'Anytime' | 'Weekends' | 'Weekdays';
  status: 'Online' | 'Offline';
  icon: string;
}

export default function SkillCard({ skill }: { skill: SkillCardProps }) {
  return (
    <Link 
      href={`/explore/skills/${skill.id}`}
      className="group block h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-all flex flex-col justify-between h-full gap-6">
        
        {/* Top: Icon Box */}
        <div className="w-full h-32 bg-slate-50 dark:bg-gray-950/60 rounded-xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-[1.01] transition-transform">
          {skill.icon}
        </div>

        {/* Mid Content */}
        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {skill.title}
          </h3>
          
          {/* Instructor Details */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg select-none">{skill.instructor.avatar}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {skill.instructor.name}
            </span>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="border-t border-gray-50 dark:border-gray-800/60 pt-4 flex items-center justify-between text-xs font-semibold mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500">
            <span>★</span>
            <span className="text-gray-900 dark:text-white">{skill.rating}</span>
            <span className="text-gray-400 font-normal">({skill.reviewsCount})</span>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
              skill.status === 'Online' 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {skill.status}
            </span>
            <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase">
              {skill.level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}