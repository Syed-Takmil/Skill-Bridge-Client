'use client';

import React, { useState, useMemo, useEffect } from 'react';
import SkillCard from '../Components/SkillCard';
import SkeletonCard from '../Components/SkeletonCard';

interface SkillCardProps {
  _id: string;
  id: number;
  title: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
  };
  rating: number;
  reviewsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  availability: 'Anytime' | 'Weekdays' | 'Weekends';
  status: 'Online' | 'Offline';
  icon: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ExplorePage() {
  const [skills, setSkills] = useState<SkillCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  
  // --- FILTER STATES (NEW: 2-field filtering system) ---
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 8; // Neatly fills two rows of 4 cards

  // --- FETCH SKILLS ---
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/skills`);
        if (!response.ok) {
          throw new Error('Failed to fetch skills from server.');
        }
        
        const data = await response.json();
        setSkills(data);
      } catch (err: any) {
        console.error('Error loading skills:', err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Generate dynamic categories list from current database listings
  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set(skills.map((skill) => skill.category));
    return ['All', ...Array.from(categoriesSet)];
  }, [skills]);

  // Reset pagination on search, filter, or sort updates
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearch, selectedCategory, selectedLevel, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  // --- FILTER & SORT ENGINE ---
  const filteredAndSortedSkills = useMemo(() => {
    let result = [...skills];

    // 1. Text Search query matching
    if (activeSearch.trim() !== '') {
      const query = activeSearch.toLowerCase();
      result = result.filter(
        skill =>
          skill.title.toLowerCase().includes(query) ||
          skill.category.toLowerCase().includes(query) ||
          skill.instructor.name.toLowerCase().includes(query)
      );
    }

    // 2. Field Filter 1: Category Selection
    if (selectedCategory !== 'All') {
      result = result.filter(
        skill => skill.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Field Filter 2: Difficulty Level
    if (selectedLevel !== 'All') {
      result = result.filter(
        skill => skill.level === selectedLevel
      );
    }
    
    // 4. Sorting Logic
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [skills, activeSearch, selectedCategory, selectedLevel, sortBy]);

  const totalResults = filteredAndSortedSkills.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredAndSortedSkills.slice(startIndex, startIndex + itemsPerPage);

  // Helper to quickly reset all active filter states
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveSearch('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-6">
        
        {/* ================= HEADER SECTIONS ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-900 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Explore Skills</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find and connect with people who can teach what you want to learn.
            </p>
          </div>
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white font-medium outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* ================= SEARCH & INTERACTIVE FILTERS BAR ================= */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white dark:bg-gray-900 p-4 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search skills, categories, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
            >
              Search
            </button>
          </form>

          {/* Filtering Fields (Category & Level) */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Filter 1: Category */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-850 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Difficulty Level */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-850 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Clear All Filters Button */}
            {(activeSearch !== '' || selectedCategory !== 'All' || selectedLevel !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline px-2 py-1"
              >
                Clear Filters ×
              </button>
            )}
          </div>
        </div>

        {/* ================= 4-COLUMN DISPLAY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-20 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-dashed border-red-200 dark:border-red-900/50">
              <p className="text-red-500 dark:text-red-400 font-semibold">⚠️ {error}</p>
            </div>
          ) : paginatedSkills.length > 0 ? (
            paginatedSkills.map((skill) => <SkillCard key={skill._id} skill={skill} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-150 dark:border-gray-800 flex flex-col items-center gap-3">
              <span className="text-3xl">🔍</span>
              <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm">No skills match your specific filter criteria.</p>
              <button
                onClick={handleClearFilters}
                className="mt-1 text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* ================= PAGINATION CONTROLS ================= */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-850 mt-6 pt-6">
            <span className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-800 dark:text-white">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-gray-800 dark:text-white">
                {Math.min(startIndex + itemsPerPage, totalResults)}
              </span>{' '}
              of <span className="font-bold text-gray-800 dark:text-white">{totalResults}</span> skills
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-bold hover:bg-gray-150 dark:hover:bg-gray-900 disabled:opacity-40 transition-all"
              >
                ‹ Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'hover:bg-gray-150 dark:hover:bg-gray-900 text-gray-650 dark:text-gray-450'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-bold hover:bg-gray-150 dark:hover:bg-gray-900 disabled:opacity-40 transition-all"
              >
                Next ›
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}