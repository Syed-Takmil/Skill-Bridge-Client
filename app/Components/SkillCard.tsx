'use client';

import React from 'react';
import Link from 'next/link';

export interface SkillCardProps {
  id: number;
  title: string;
  category: string;
  description?: string; // Added to fit requested instructions
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
  date?: string;     // Meta info
  location?: string; // Meta info
}

export default function SkillCard({ skill }: { skill: SkillCardProps }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all flex flex-col justify-between h-[420px] w-full overflow-hidden group">
      
      {/* 1. IMAGE CONTAINER (The Icon Box) */}
      <div className="relative w-full h-40 bg-slate-50 dark:bg-gray-950/60 flex items-center justify-center text-5xl shadow-inner group-hover:scale-[1.02] transition-transform duration-300 shrink-0">
        {skill.icon}
        {/* Float Status Badge Over Image */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-sm ${
          skill.status === 'Online' 
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {skill.status}
        </span>
      </div>

      {/* 2. BODY CONTENT (Title, Description & Core Meta) */}
      <div className="p-5 flex flex-col flex-1 min-h-0 justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
            {skill.category}
          </span>
          <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {skill.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {skill.description || `Learn ${skill.title} step-by-step with ${skill.instructor.name}. Perfect for accelerating your personal learning goals.`}
          </p>
        </div>

        {/* 3. META INFO row (Date, Location, Rating, Instructor) */}
        <div className="flex flex-col gap-2 border-t border-gray-50 dark:border-gray-800/60 pt-3">
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            {/* Instructor */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm select-none">{skill.instructor.avatar}</span>
              <span className="font-medium truncate max-w-[90px]">{skill.instructor.name}</span>
            </div>
            {/* Date/Availability metadata */}
            <span className="font-medium">📅 {skill.availability}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            {/* Rating */}
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <span>★</span>
              <span className="text-gray-900 dark:text-white ml-0.5">{skill.rating}</span>
              <span className="text-gray-400 font-normal">({skill.reviewsCount})</span>
            </div>
            {/* Location or Level */}
            <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
              {skill.level}
            </span>
          </div>
        </div>

        {/* 4. ACTION BUTTON */}
        <Link 
          href={`/explore/skills/${skill.id}`}
          className="w-full text-center bg-gray-50 hover:bg-indigo-600 dark:bg-gray-800/50 dark:hover:bg-indigo-600 text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}