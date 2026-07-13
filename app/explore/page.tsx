'use client';

import React, { useState, useMemo, useEffect } from 'react';
import SkillCard from '../Components/SkillCard';
import SkeletonCard from '../Components/SkeletonCard';

const DUMMY_SKILLS: SkillCardProps[] = [
  { id: 1, title: 'React Development', category: 'Programming', instructor: { name: 'John Doe', avatar: '👨‍💻' }, rating: 4.9, reviewsCount: 120, level: 'Expert', availability: 'Anytime', status: 'Online', icon: '⚛️' },
  { id: 2, title: 'UI/UX Design', category: 'Design', instructor: { name: 'Sarah Smith', avatar: '👩‍🎨' }, rating: 4.8, reviewsCount: 95, level: 'Intermediate', availability: 'Weekends', status: 'Online', icon: '🎨' },
  { id: 3, title: 'Python Programming', category: 'Programming', instructor: { name: 'Mike Johnson', avatar: '👨‍💻' }, rating: 4.9, reviewsCount: 150, level: 'Expert', availability: 'Anytime', status: 'Online', icon: '🐍' },
  { id: 4, title: 'English Speaking', category: 'Language', instructor: { name: 'Emma Brown', avatar: '👩‍🏫' }, rating: 4.7, reviewsCount: 80, level: 'Expert', availability: 'Weekdays', status: 'Offline', icon: '🗣️' },
  { id: 5, title: 'Digital Marketing', category: 'Marketing', instructor: { name: 'Emily Davis', avatar: '👩‍💼' }, rating: 4.7, reviewsCount: 60, level: 'Expert', availability: 'Weekdays', status: 'Online', icon: '📢' },
  { id: 6, title: 'Figma Design', category: 'Design', instructor: { name: 'David Wilson', avatar: '👨‍🎨' }, rating: 4.8, reviewsCount: 70, level: 'Intermediate', availability: 'Anytime', status: 'Online', icon: '📐' },
];

const CATEGORIES = ['All Categories', 'Programming', 'Design', 'Marketing', 'Language', 'Music', 'Business', 'Fitness', 'Photography'];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [availability, setAvailability] = useState('Anytime');
  const [experienceLevel, setExperienceLevel] = useState('Any Level');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 5;

  // Simulate loading state for presentation purposes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, availability, experienceLevel, sortBy]);

  const filteredAndSortedSkills = useMemo(() => {
    let result = [...DUMMY_SKILLS];

    if (selectedCategory !== 'All Categories') {
      result = result.filter(skill => skill.category === selectedCategory);
    }
    if (availability !== 'Anytime') {
      result = result.filter(skill => skill.availability === availability);
    }
    if (experienceLevel !== 'Any Level') {
      result = result.filter(skill => skill.level === experienceLevel);
    }
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, availability, experienceLevel, sortBy]);

  const totalResults = filteredAndSortedSkills.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredAndSortedSkills.slice(startIndex, startIndex + itemsPerPage);

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setAvailability('Anytime');
    setExperienceLevel('Any Level');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="flex flex-col gap-8 lg:col-span-1">
          <div>
            <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Categories</h2>
            <ul className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <li key={cat} className="shrink-0">
                  <button
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); setIsLoading(true); }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Filters</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); setIsLoading(true); }}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                >
                  <option value="Anytime">Anytime</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => { setExperienceLevel(e.target.value); setCurrentPage(1); setIsLoading(true); }}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                >
                  <option value="Any Level">Any Level</option>
                  <option value="Expert">Expert</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-left mt-2 self-start"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* ================= RIGHT MAIN AREA ================= */}
        <main className="lg:col-span-3 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Explore Skills</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Find and connect with people who can teach what you want to learn.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label className="text-xs font-medium text-gray-400 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setIsLoading(true); }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          {/* Cards Display Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
            ) : paginatedSkills.length > 0 ? (
              paginatedSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
            ) : (
              <div className="col-span-full text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 font-medium">No skills match your current filters.</p>
              </div>
            )}
          </div>

          {/* ================= PAGINATION CONTROLS ================= */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 mt-12 pt-6">
              <span className="text-xs sm:text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800 dark:text-white">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {Math.min(startIndex + itemsPerPage, totalResults)}
                </span>{' '}
                of <span className="font-semibold text-gray-800 dark:text-white">{totalResults}</span> results
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 transition-colors"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-40 transition-colors"
                >
                  &rsaquo;
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}