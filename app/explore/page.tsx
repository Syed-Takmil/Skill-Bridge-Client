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
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 8; // Increased to 8 to neatly fill two full rows of 4 cards

  // --- FETCH SKILLS FROM BACKEND ---
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

  // Reset pagination to page 1 whenever active search query or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearch, sortBy]);

  // Handle explicit form submissions for the search button
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedSkills = useMemo(() => {
    let result = [...skills];

    // Filter by search query match (searches across title, category, and instructor name)
    if (activeSearch.trim() !== '') {
      const query = activeSearch.toLowerCase();
      result = result.filter(
        skill =>
          skill.title.toLowerCase().includes(query) ||
          skill.category.toLowerCase().includes(query) ||
          skill.instructor.name.toLowerCase().includes(query)
      );
    }
    
    // Sort logic
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [skills, activeSearch, sortBy]);

  const totalResults = filteredAndSortedSkills.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredAndSortedSkills.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
        
        {/* ================= HEADER SECTIONS ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Explore Skills</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find and connect with people who can teach what you want to learn.
            </p>
          </div>
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <label className="text-xs font-medium text-gray-400 whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* ================= SEARCH INPUT ELEMENT BAR ================= */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xl">
          <input
            type="text"
            placeholder="Search skills, categories, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {/* ================= 4-CARDS IN A ROW DISPLAY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-20 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-dashed border-red-200 dark:border-red-900/50">
              <p className="text-red-500 dark:text-red-400 font-medium font-mono">⚠️ {error}</p>
            </div>
          ) : paginatedSkills.length > 0 ? (
            paginatedSkills.map((skill) => <SkillCard key={skill._id} skill={skill} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">No skills match your search terms.</p>
            </div>
          )}
        </div>

        {/* ================= PAGINATION CONTROLS ================= */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
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

      </div>
    </div>
  );
}