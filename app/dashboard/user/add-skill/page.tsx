'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    // Transforming values into strict alignment with your explicit MongoDB layout schema
    const databasePayload = {
      id: Math.floor(Math.random() * 1000000), // Generates a unique numeric custom id matching schema requirement
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
        name: "Verified Instructor", 
        avatarUrl: formData.imageUrl || '',
        role: `${formData.experienceLevel} ${formData.category} Consultant`
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(databasePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to register the skill listing onto the database.');
      }

      alert('Skill registered successfully!');
      router.push('/explore');
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
        
        {/* Form Header */}
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

        {/* Form Body */}
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
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all"
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

          {/* Core Select Parameters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Experience Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Level
              </label>
              <select
                name="experienceLevel"
                required
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300 transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Availability
              </label>
              <select
                name="availability"
                required
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300 transition-all"
              >
                <option value="Anytime">Anytime</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Language
              </label>
              <select
                name="language"
                required
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300 transition-all"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

          </div>

          {/* Optional Meta Row fields */}
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
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all"
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
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Submit Action Button */}
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