'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// --- TYPES ---
interface SkillDetail {
  id: string;
  title: string;
  category: string;
  instructor: {
    name: string;
    avatarUrl: string;
    role: string;
    bio: string;
  };
  rating: number;
  reviewsCount: number;
  tags: string[];
  description: string;
  availability: string;
  experience: string;
  languages: string;
  location: string;
  curriculum: string[];
}

// --- DUMMY DATA LOOKUP ---
const DUMMY_DETAILS_MAP: Record<string, SkillDetail> = {
  '1': {
    id: '1',
    title: 'React Development',
    category: 'Programming',
    instructor: {
      name: 'John Doe',
      avatarUrl: '/avatar-male.png',
      role: 'Full Stack Developer',
      bio: '5+ years of experience in web development. Passionate about teaching and mentoring.',
    },
    rating: 4.9,
    reviewsCount: 120,
    tags: ['Expert', 'Programming', 'Online'],
    description: 'Learn React from basics to advanced. I will teach you components, hooks, context API, state management, and real world projects.',
    availability: 'Weekends & Evenings',
    experience: '5+ Years',
    languages: 'English',
    location: 'New York, USA',
    curriculum: [
      'React Components',
      'Hooks (useState, useEffect)',
      'Context API',
      'React Router',
      'State Management (Redux)',
      'Real World Projects',
    ],
  },
};

export default function SkillDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'related'>('about');

  // Fallback to item 1 if dynamic route id doesn't match dummy dataset keys directly
  const skillData = DUMMY_DETAILS_MAP[id || '1'] || DUMMY_DETAILS_MAP['1'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
        
        {/* Back Link Nav */}
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 self-start transition-colors"
        >
          <span>←</span> Back to Explore
        </Link>

        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Logo / Asset Frame */}
          <div className="w-28 h-28 bg-slate-900 dark:bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
            ⚛️
          </div>
          
          {/* Main Titles */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {skillData.title}
            </h1>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs">👤</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{skillData.instructor.name}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-1">
              {/* Rating details */}
              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <span>★</span>
                <span className="text-gray-900 dark:text-white">{skillData.rating}</span>
                <span className="text-gray-400 font-normal">({skillData.reviewsCount} reviews)</span>
              </div>
              
              {/* Status Pill Meta Row */}
              <div className="flex items-center gap-1.5">
                {skillData.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Long Form Summary Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          {skillData.description}
        </p>

        {/* Grid Meta Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl border-y border-gray-100 dark:border-gray-900 py-6 text-sm">
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">Availability</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.availability}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">⚙️ Experience</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.experience}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">🌐 Languages</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.languages}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">📍 Location</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.location}</span>
          </div>
        </div>

        {/* Primary Call To Action Panel Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm active:scale-[0.99]">
            Send Exchange Request
          </button>
          <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
            💬 Message
          </button>
        </div>

        {/* Tab Row Group Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-800 mt-8 flex items-center gap-8 text-sm font-semibold">
          <button 
            onClick={() => setActiveTab('about')}
            className={`pb-3 transition-all relative ${activeTab === 'about' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
          >
            About
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-all relative ${activeTab === 'reviews' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
          >
            Reviews ({skillData.reviewsCount})
          </button>
          <button 
            onClick={() => setActiveTab('related')}
            className={`pb-3 transition-all relative ${activeTab === 'related' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
          >
            Related Skills
          </button>
        </div>

        {/* Tab Body Contents rendering dynamically */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
            
            {/* Left Box: Curriculum Checklists */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <h3 className="font-extrabold text-lg text-gray-950 dark:text-white">What you will learn</h3>
              <ul className="flex flex-col gap-3">
                {skillData.curriculum.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="text-indigo-600 dark:text-indigo-400 select-none">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Box: Bio Info Panel Card */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl p-6 flex flex-col gap-4 self-start">
              <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">About the Instructor</h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden relative">
                  <Image src={skillData.instructor.avatarUrl} alt="Instructor Pic" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base">{skillData.instructor.name}</span>
                  <span className="text-xs text-gray-400">{skillData.instructor.role}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {skillData.instructor.bio}
              </p>

              <Link 
                href={`/profile/${skillData.instructor.name.toLowerCase().replace(' ', '-')}`}
                className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-1 self-start"
              >
                View Profile
              </Link>
            </div>

          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="py-6 text-sm text-gray-500">Reviews feed module will populate here from API collections...</div>
        )}

        {activeTab === 'related' && (
          <div className="py-6 text-sm text-gray-500">Related category match listings will map here...</div>
        )}

      </div>
    </div>
  );
}