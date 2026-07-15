'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import SkillCard,{ SkillCardProps } from '@/app/Components/SkillCard';

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
  level: 'Expert' | 'Intermediate' | 'Beginner';
  availability: 'Anytime' | 'Weekends' | 'Weekdays';
  status: 'Online' | 'Offline';
  experience?: string;
  languages?: string;
  location?: string;
  curriculum?: string[];
  description: string;
  icon?: string;
  media?: string[]; // Array of image URLs/Placeholders
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

  // States for Media Gallery
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  // States for Exchange Request
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // States for dynamic Reviews & Related Items
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(false);
  const [relatedSkills, setRelatedSkills] = useState<SkillCardProps[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState<boolean>(false);

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
        
        // Setup mock media images if the database does not provide them
        const fallbackMedia = [
          data.icon || '⚛️',
          '📚',
          '💻',
          '🚀'
        ];

        setSkillData({
          ...data,
          media: data.media || fallbackMedia
        });
      } catch (err: any) {
        console.error('Error fetching skill detail:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillDetail();
  }, [id]);

  // --- FETCH REVIEWS ON-DEMAND ---
  useEffect(() => {
    if (activeTab !== 'reviews' || !id) return;

    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await fetch(`${API_BASE_URL}/skills/${id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.warn('Failed to fetch reviews:', err);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [activeTab, id]);

  // --- FETCH RELATED SKILLS ON-DEMAND ---
  useEffect(() => {
    if (activeTab !== 'related' || !skillData) return;

    const fetchRelated = async () => {
      try {
        setIsLoadingRelated(true);
        const response = await fetch(`${API_BASE_URL}/skills?category=${encodeURIComponent(skillData.category)}`);
        if (response.ok) {
          const data = await response.json();
          // Filter out the currently viewed skill card
          const filtered = data.filter((item: any) => String(item.id) !== String(id)).slice(0, 4);
          setRelatedSkills(filtered);
        }
      } catch (err) {
        console.warn('Failed to fetch related skills:', err);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [activeTab, skillData, id]);

  // --- POST EXCHANGE REQUEST ---
  const handleExchangeRequest = async () => {
    if (!skillData) return;
    try {
      setIsRequesting(true);
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: skillData._id,
          customId: skillData.id,
          instructorName: skillData.instructor.name,
          requesterId: "current_user_123" 
        }),
      });

      if (!response.ok) throw new Error('Failed to send exchange request.');
      setRequestSent(true);
    } catch (err: any) {
      alert(err.message || 'Error processing your request.');
    } finally {
      setIsRequesting(false);
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading skill details...</p>
        </div>
      </div>
    );
  }

  if (error || !skillData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-6">
        <div className="max-w-md text-center flex flex-col items-center gap-6 py-12 px-8 bg-red-50 dark:bg-red-950/10 border border-dashed border-red-200 dark:border-red-900/45 rounded-2xl">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Unable to load Skill</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error || 'This skill is not registered.'}</p>
          <Link href="/explore" className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors">
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline self-start">
          <span>←</span> Back to Explore
        </Link>

        {/* ================= SECTION 1: HEADER & MEDIA GALLERY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Media Gallery Container */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="w-full h-80 sm:h-96 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl flex items-center justify-center text-7xl shadow-sm relative overflow-hidden">
              {/* Main Media Preview */}
              <span className="select-none transition-transform duration-300 transform hover:scale-105">
                {skillData.media?.[activeMediaIndex] || skillData.icon}
              </span>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {skillData.media?.map((mediaItem, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMediaIndex(index)}
                  className={`w-16 h-16 rounded-xl bg-white dark:bg-gray-900 border flex items-center justify-center text-2xl transition-all ${
                    activeMediaIndex === index
                      ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/10 scale-95'
                      : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  {mediaItem}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Primary Call-to-Action & Summary */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {skillData.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 leading-snug">
                {skillData.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-50 dark:border-gray-800/80 pb-4">
              <span className="text-lg">👤</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{skillData.instructor.name}</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">{skillData.level} Level</span>
              </div>
            </div>

            {/* Key Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-gray-950/50 rounded-xl p-3 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Class Type</span>
                <span className="text-sm font-semibold">{skillData.status}</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-950/50 rounded-xl p-3 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Average Rating</span>
                <span className="text-sm font-semibold text-amber-500">★ {skillData.rating}</span>
              </div>
            </div>

            {/* CTA Action Bar */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleExchangeRequest}
                disabled={isRequesting || requestSent}
                className={`w-full font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 ${
                  requestSent
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white disabled:opacity-50'
                }`}
              >
                {isRequesting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Request...
                  </>
                ) : requestSent ? (
                  'Request Sent ✓'
                ) : (
                  'Send Exchange Request'
                )}
              </button>

            </div>
          </div>
        </div>

        {/* ================= SECTION 2: DESCRIPTION & SPECIFICATIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Left Area: Detail tabs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Tabs Selector Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-800 flex items-center gap-8 text-sm font-bold">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 transition-all relative ${
                  activeTab === 'about'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-all relative ${
                  activeTab === 'reviews'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                Reviews ({skillData.reviewsCount})
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`pb-3 transition-all relative ${
                  activeTab === 'related'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                Related Skills
              </button>
            </div>

            {/* Tab Viewport Contents */}
            <div className="min-h-[250px]">
              
              {/* TAB 1: ABOUT / DESCRIPTION & CURRICULUM */}
              {activeTab === 'about' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-extrabold text-lg">Course Description</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {skillData.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <h3 className="font-extrabold text-lg">Curriculum Syllabus</h3>
                    {skillData.curriculum && skillData.curriculum.length > 0 ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {skillData.curriculum.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-3 rounded-xl">
                            <span className="text-indigo-600 dark:text-indigo-400 select-none font-bold">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Curriculum syllabus not provided.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="flex flex-col gap-6">
                  {isLoadingReviews ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : reviews.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {reviews.map((review) => (
                        <div key={review._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl flex flex-col gap-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-gray-800 dark:text-gray-200">{review.reviewerName}</span>
                            <span className="text-amber-500 font-bold">★ {review.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-150 dark:border-gray-800">
                      <span className="text-3xl block mb-2">✨</span>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No community reviews listed yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: RELATED ITEMS IN A 4-COLUMN GRID */}
              {activeTab === 'related' && (
                <div>
                  {isLoadingRelated ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : relatedSkills.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                      {relatedSkills.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-150 dark:border-gray-800">
                      <span className="text-3xl block mb-2">💡</span>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No related class matches found.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Right Area: Key Information / Specifications Grid */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">
                Specifications
              </h3>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/80 pb-3">
                  <span className="text-gray-400 font-medium">Availability</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skillData.availability}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/80 pb-3">
                  <span className="text-gray-400 font-medium">Experience</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skillData.experience || 'Not Specified'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/80 pb-3">
                  <span className="text-gray-400 font-medium">Languages</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skillData.languages || 'English'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/80 pb-3">
                  <span className="text-gray-400 font-medium">Location</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skillData.location || 'Remote'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Level</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skillData.level}</span>
                </div>
              </div>
            </div>

            {/* Instructor Quick Card panel */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">The Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden relative flex items-center justify-center text-xl shrink-0">
                  {skillData.instructor.avatarUrl ? (
                    <Image src={skillData.instructor.avatarUrl} alt="Instructor Pic" fill className="object-cover" />
                  ) : (
                    <span>{skillData.instructor.avatar || '👤'}</span>
                  )}
                </div>
                <div>
                  <span className="font-extrabold text-sm block">{skillData.instructor.name}</span>
                  <span className="text-[11px] text-gray-400 block leading-tight">{skillData.instructor.role || 'Verified Coach'}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {skillData.instructor.bio || 'This instructor has not written a custom bio yet.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}