'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '15,000+' },
    { label: 'Skills Swapped', value: '45k+' },
    { label: 'Success Rate', value: '98.4%' },
  ];

  const values = [
    {
      title: 'Community First',
      description: 'We believe knowledge shouldn’t sit behind a paywall. By sharing what you know, you empower someone else to grow.',
    },
    {
      title: 'True Reciprocity',
      description: 'Every interaction is a mutual trade. You teach your superpower, and you learn a brand-new skill in return.',
    },
    {
      title: 'Growth Mindset',
      description: 'Whether you’re a professional developer or an amateur baker, there’s always something new to learn here.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-2xl mb-6 shadow-md">
            SB
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Our Mission: Make Learning Collaborative
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to the Skill Swapping community. We built this platform to connect curious minds, eliminating financial barriers to personal and professional growth.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 sm:p-10 shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">The Story Behind the Platform</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Traditional education can be expensive and rigid. Meanwhile, millions of talented individuals possess incredible real-world skills they’d love to share, while simultaneously wishing they knew how to code, paint, speak a language, or manage finances.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We wondered: *What if we traded skills instead of money?* That single question turned into this vibrant community ecosystem. Here, your knowledge is your currency.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-center mb-8">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white rounded-2xl p-8 shadow-md">
          <h3 className="text-xl font-bold mb-2">Ready to trade your first skill?</h3>
          <p className="text-sm text-indigo-100 mb-6 max-w-md mx-auto">Join thousands of members giving and receiving direct mentorship every day.</p>
          <Link href="/signup" className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow-md transition-transform active:scale-95 hover:bg-slate-50 text-sm">
            Get Started Free
          </Link>
        </div>

      </div>
    </div>
  );
}