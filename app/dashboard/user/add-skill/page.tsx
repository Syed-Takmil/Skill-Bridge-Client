'use client';

import React, { useState } from 'react';

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

export default function AddSkillPage() {
  const [formData, setFormData] = useState<SkillFormState>({
    title: '',
    category: '',
    description: '',
    experienceLevel: '',
    availability: '',
    language: '',
    location: '',
    imageUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // API integration goes here later
    console.log('Skill Form Data Submitted:', formData);
    
    // Simulate API network latency
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Skill submitted successfully!');
    }, 1000);
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
            Share your skill with the community
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* 1. Skill Title */}
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
              placeholder="e.g. React Development"
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
            />
          </div>

          {/* 2. Category Dropdown */}
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
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Language">Language</option>
              <option value="Music">Music</option>
            </select>
          </div>

          {/* 3. Description Textarea */}
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
              placeholder="Describe your skill, experience and what you will teach..."
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-all"
            />
          </div>

          {/* 4. Three-Column Group: Experience, Availability, Language */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Experience Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                required
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-300 transition-all"
              >
                <option value="" disabled hidden>Select level</option>
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
                <option value="" disabled hidden>Select availability</option>
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
                <option value="" disabled hidden>Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

          </div>

          {/* 5. Dual Row: Location & Image URL (Optional fields) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location <span className="text-xs text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, USA"
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Image URL <span className="text-xs text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
              />
            </div>

          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-base py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? 'Submitting Skill...' : 'Submit Skill'}
          </button>

        </form>

      </div>
    </div>
  );
}