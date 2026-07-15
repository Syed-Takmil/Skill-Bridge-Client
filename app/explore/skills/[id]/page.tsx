'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// --- TYPES ---
interface SkillDetail {
  _id: string; // MongoDB Hex ID
  id: number;  // Custom numeric ID
  title: string;
  category: string;
  instructor: {
    name: string;
    avatarUrl?: string; 
    avatar?: string;    
    role?: string;
    bio?: string;
  };
  rating: number;
  reviewsCount: number;
  level: string;
  availability: string;
  experience?: string;
  languages?: string;
  location?: string;
  curriculum?: string[];
  description: string;
  icon?: string;
}

interface Review {
  _id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function SkillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [skillData, setSkillData] = useState<SkillDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'related'>('about');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // States for Exchange Request
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // States for dynamic Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(false);

  // --- FETCH SKILL DETAILS ---
  useEffect(() => {
    if (!id) return;

    const fetchSkillDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/skills/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Skill not found in database.');
          }
          throw new Error('Failed to retrieve skill details.');
        }

        const data = await response.json();
        setSkillData(data);
      } catch (err: any) {
        console.error('Error fetching skill detail:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillDetail();
  }, [id]);

  // --- FETCH REVIEWS ON-DEMAND WHEN TAB IS ACTIVE ---
  useEffect(() => {
    if (activeTab !== 'reviews' || !id) return;

    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        // Assuming your backend route is GET /skills/:id/reviews
        const response = await fetch(`${API_BASE_URL}/skills/${id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.warn('Failed to fetch reviews (endpoint may not exist yet):', err);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [activeTab, id]);

  // --- POST EXCHANGE REQUEST ---
  const handleExchangeRequest = async () => {
    if (!skillData) return;
    try {
      setIsRequesting(true);
      
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillId: skillData._id,
          customId: skillData.id,
          instructorName: skillData.instructor.name,
          // Replace with real authenticated User ID when Auth is hooked up
          requesterId: "current_user_123" 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send exchange request.');
      }

      setRequestSent(true);
    } catch (err: any) {
      alert(err.message || 'Error processing your request.');
    } finally {
      setIsRequesting(false);
    }
  };

  // --- NAVIGATE TO MESSAGES CHANNEL ---
  const handleMessageRedirect = () => {
    if (!skillData) return;
    const cleanName = encodeURIComponent(skillData.instructor.name);
    router.push(`/messages?user=${cleanName}`);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center text-gray-900 dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading skill profile...</p>
        </div>
      </div>
    );
  }

  // Error/Fallback Screen
  if (error || !skillData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center text-gray-900 dark:text-white px-6">
        <div className="max-w-md text-center flex flex-col items-center gap-6 py-12 px-8 bg-red-50 dark:bg-red-950/10 border border-dashed border-red-200 dark:border-red-900/45 rounded-2xl">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Unable to load Skill</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error || 'This skill is not registered.'}</p>
          <Link 
            href="/explore" 
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

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
            {skillData.icon || '⚛️'}
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
              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <span>★</span>
                <span className="text-gray-900 dark:text-white">{skillData.rating}</span>
                <span className="text-gray-400 font-normal">({skillData.reviewsCount} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1.5 font-bold">
                <span className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wide">
                  {skillData.level}
                </span>
                <span className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wide">
                  {skillData.category}
                </span>
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
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.experience || 'Not Specified'}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">🌐 Languages</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.languages || 'English'}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:gap-16">
            <span className="text-gray-400 dark:text-gray-500 font-medium w-24">📍 Location</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{skillData.location || 'Remote'}</span>
          </div>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <button 
            onClick={handleExchangeRequest}
            disabled={isRequesting || requestSent}
            className={`font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 min-w-[180px] ${
              requestSent 
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white disabled:opacity-50'
            }`}
          >
            {isRequesting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : requestSent ? (
              'Request Sent ✓'
            ) : (
              'Send Exchange Request'
            )}
          </button>
          
          <button 
            onClick={handleMessageRedirect}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            💬 Message
          </button>
        </div>

        {/* Tab Group Navigation */}
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

        {/* Tab Body Contents */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
            
            {/* Left Box: Curriculum Checklists */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <h3 className="font-extrabold text-lg text-gray-950 dark:text-white">What you will learn</h3>
              {skillData.curriculum && skillData.curriculum.length > 0 ? (
                <ul className="flex flex-col gap-3">
                  {skillData.curriculum.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="text-indigo-600 dark:text-indigo-400 select-none">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Curriculum syllabus not provided.</p>
              )}
            </div>

            {/* Right Box: Bio Info Panel Card */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-900/60 rounded-2xl p-6 flex flex-col gap-4 self-start">
              <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">About the Instructor</h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden relative flex items-center justify-center text-xl">
                  {skillData.instructor.avatarUrl ? (
                    <Image 
                      src={skillData.instructor.avatarUrl} 
                      alt="Instructor Profile Pic" 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <span>{skillData.instructor.avatar || '👤'}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base">{skillData.instructor.name}</span>
                  <span className="text-xs text-gray-400">{skillData.instructor.role || 'Verified Instructor'}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {skillData.instructor.bio || 'This instructor has not written a custom bio yet.'}
              </p>

              <Link 
                href={`/profile/${skillData.instructor.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-1 self-start"
              >
                View Profile
              </Link>
            </div>

          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="py-6">
            {isLoadingReviews ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : reviews.length > 0 ? (
              <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-100 dark:border-gray-900 pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold">{review.reviewerName}</span>
                      <span className="text-amber-500 font-bold">★ {review.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{review.comment}</p>
                    <span className="text-xs text-gray-400 block mt-1">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 dark:bg-gray-900/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                <span className="text-2xl block mb-2">✨</span>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No reviews yet for this skill exchange.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'related' && (
          <div className="py-6 text-sm text-gray-500">Related category match listings will map here...</div>
        )}

      </div>
    </div>
  );
}