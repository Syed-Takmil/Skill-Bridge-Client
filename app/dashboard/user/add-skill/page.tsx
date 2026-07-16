'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/app/lib/auth-client';

interface SkillFormState {
  title: string;
  category: string;
  description: string;
  experienceLevel: string;
  availability: string;
  language: string;
  location: string;
  imageUrl: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AddSkillPage() {
  const router = useRouter();
  const [userSession, setUserSession] = useState<any>(null);
  
  const [formData, setFormData] = useState<SkillFormState>({
    title: '',
    category: '',
    description: '',
    experienceLevel: 'Intermediate',
    availability: 'Weekdays',
    language: 'English',
    location: '',
    imageUrl: '',
  });

  const [curriculum, setCurriculum] = useState<string[]>([]);
  const [currentChapter, setCurrentChapter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Fetch logged-in user on mount
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          setUserSession(data.user);
        }
      } catch (err) {
        console.error('Failed to get user session:', err);
      }
    };
    getSession();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChapter = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentChapter.trim() !== '') {
      setCurriculum((prev) => [...prev, currentChapter.trim()]);
      setCurrentChapter('');
    }
  };

  const handleRemoveChapter = (indexToRemove: number) => {
    setCurriculum((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmissionError(null);

    const databasePayload = {
      id: Math.floor(Math.random() * 1000000), 
      title: formData.title,
      category: formData.category,
      description: formData.description,
      level: formData.experienceLevel,
      availability: formData.availability,
      languages: formData.language,
      location: formData.location || 'Remote',
      rating: 5.0, 
      reviewsCount: 0, 
      status: 'Online',
      icon: formData.category === 'Marketing' ? '🚀' : '💻',
      instructor: {
        name: userSession?.name || "Verified Instructor", 
        email: userSession?.email || "", 
        avatarUrl: formData.imageUrl || userSession?.image || '',
        role: `${formData.experienceLevel} ${formData.category} Consultant`
      },
      curriculum: curriculum 
    };

    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(databasePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to register the skill listing onto the database.');
      }

      toast.success('Skill registered successfully!');
      router.push('/dashboard/user/manage-skills');
    } catch (err: any) {
      console.error(err);
      setSubmissionError(err.message || 'An unexpected server error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Add New Skill
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Share your skill profile with the community network
          </p>
        </div>

        {submissionError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl text-xs sm:text-sm border border-red-100 dark:border-red-900/40">
            ⚠️ {submissionError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Skill Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Skill Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. SEO Mastery for Modern Web Developers"
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-950 dark:text-white transition-all"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300 transition-all"
            >
              <option value="" disabled hidden>Select category</option>
              <option value="Marketing">Marketing</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Language">Language</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your workflows, toolkits and learning objectives..."
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none transition-all"
            />
          </div>

          {/* Interactive Curriculum */}
          <div className="flex flex-col gap-2 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl border border-gray-150 dark:border-gray-800/80">
            <label className="text-sm font-bold text-gray-800 dark:text-gray-200">
              Curriculum / Core Topics
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Add sequential modules, syllabus chapters, or milestones that you will teach.
            </p>

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={currentChapter}
                onChange={(e) => setCurrentChapter(e.target.value)}
                placeholder="e.g. Module 1: Anatomy of a Search Query"
                className="flex-1 bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-950 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddChapter}
                className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-2 rounded-xl transition-all border border-indigo-150 dark:border-indigo-900/50"
              >
                + Add Topic
              </button>
            </div>

            {curriculum.length > 0 && (
              <ul className="flex flex-col gap-2 mt-3 bg-white dark:bg-slate-950/80 p-3 rounded-lg border border-gray-200 dark:border-gray-800/60">
                {curriculum.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-slate-50 dark:bg-gray-900 px-3 py-2 rounded-md text-xs font-medium border border-gray-100 dark:border-gray-800"
                  >
                    <span className="text-gray-800 dark:text-gray-300">
                      {idx + 1}. {topic}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChapter(idx)}
                      className="text-red-500 hover:text-red-700 font-extrabold hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Parameters row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-medium">Level</label>
              <select
                name="experienceLevel"
                required
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-medium">Availability</label>
              <select
                name="availability"
                required
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="Anytime">Anytime</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-medium">Language</label>
              <select
                name="language"
                required
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location <span className="text-xs text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote"
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none text-gray-950 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Avatar Image URL <span className="text-xs text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.com/avatar.jpg"
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none text-gray-950 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-base py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing listing...' : 'Submit Skill'}
          </button>
        </form>
      </div>
    </div>
  );
}