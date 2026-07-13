'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API call 
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-10">
        
        {/* Contact Info Panel (4 Columns) */}
        <div className="md:col-span-5 flex flex-col justify-between bg-indigo-50 dark:bg-slate-900 border border-indigo-100/50 dark:border-gray-800 p-6 sm:p-8 rounded-2xl">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Get in Touch</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Have questions about skill swapping, feature requests, or partnerships? Drop us a line.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Support Hours</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">Monday - Friday, 9am - 5pm EST</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Direct Email</p>
                <a href="mailto:support@skillswap.com" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                  support@skillswap.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-100 dark:border-gray-800 text-xs text-gray-400">
            Typically responds within 24 business hours.
          </div>
        </div>

        {/* Form Panel (7 Columns) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit about what's on your mind..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>

      </div>
    </div>
  );
}