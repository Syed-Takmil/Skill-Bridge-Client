'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- NEW: Demo Login Auto-Fill Helper ---
  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@user.com',
      password: '123456789',
    });
    toast.info('Demo credentials loaded! Click Sign In to log in.', {
      autoClose: 2000,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. Attempt Sign In
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true,
    });  

    if (error) {
      toast.error(`Error Logging In: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    // 2. Fetch current session programmatically
    const { data: sessionData } = await authClient.getSession();
    const role = (sessionData?.user as any)?.role || "user"; // Fallback to "user" if missing

    
    toast.success('Logged in successfully!');
    
    // 3. Small timeout ensures the browser writes the cookie before redirecting
    setTimeout(() => {
      if (role === "user") {
        router.push("/dashboard/user");
      } else {
        router.push("/dashboard/admin");
      }
    }, 100);

  } catch (err) {
    toast.error("An unexpected error occurred.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl mb-4">
            SB
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Log in to continue swapping skills
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </button>

          {/* ================= NEW: DEMO AUTO-FILL ACTION BUTTON ================= */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-950 border border-gray-150 dark:border-gray-800 text-gray-750 dark:text-gray-300 font-bold text-xs py-2 px-4 rounded-xl transition-all active:scale-[0.99] disabled:opacity-50"
          >
            🔑 Autofill Demo Credentials
          </button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
