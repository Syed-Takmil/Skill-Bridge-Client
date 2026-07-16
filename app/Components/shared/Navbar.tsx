'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import NavLink from "../NavLink";
import { authClient } from '@/app/lib/auth-client';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Get real-time session status using your auth framework's client hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isAdmin = (user as any)?.role === 'admin';

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close avatar dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Base routes accessible to everyone
  const baseLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // 3. Conditional routes appended dynamically based on User Role
  const authLinks = user 
    ? isAdmin
      ? [
          { name: 'Dashboard', href: '/dashboard/admin' },
          { name: 'Manage Users', href: '/dashboard/admin/users' }
        ]
      : [
          { name: 'Dashboard', href: '/dashboard/user' },
          { name: 'Update Profile', href: '/dashboard/user/profile' }
        ]
    : [];

  const navLinks = [...baseLinks, ...authLinks];

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      
      // Clear out the manual user-role tracking cookie completely
      document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
      
      toast.success('Signed out successfully');
      setIsDropdownOpen(false);
      setIsOpen(false);
      
      // Force a complete layout check reload to the login route
      window.location.href = '/login';
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="w-full h-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      
      {/* LEFT: Brand Logo */}
      <div className="flex items-center gap-2 z-50">
        <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
          SB
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          SkillBridge
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/50 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20 ml-1">
          Beta
        </span>
      </div>

      {/* CENTER: Navigation Routes */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        {navLinks.map((link) => (
          <li key={link.name} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <NavLink href={link.href}>{link.name}</NavLink>
          </li>
        ))}
      </ul>

      {/* RIGHT: Auth Actions or Profile Dropdown */}
      <div className="hidden lg:flex items-center gap-4">
        {isPending ? (
          <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-full" />
        ) : user ? (
          /* Profile Image & Dropdown Menu */
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="User menu"
            >
              <img width={50} height={50}
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5F7wTf4YmnGpgjo2wGWTlxO7ZKOfbqg2M_viqzSWnQ&s"} 
                alt={user.name || "User Avatar"} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-800"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Logged in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center gap-2 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Public Guest Auth Links */
          <>
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* HAMBURGER BUTTON */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none z-50"
        aria-label="Toggle Menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* MOBILE DRAWER OVERLAY */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-950 z-40 flex flex-col justify-between p-6 pt-28 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Mobile Links */}
        <ul className="flex flex-col gap-5 text-xl font-semibold text-gray-800 dark:text-gray-200">
          {navLinks.map((link) => (
            <li key={link.name} onClick={() => setIsOpen(false)}>
              <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 block py-2">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Actions Container */}
        <div className="flex flex-col gap-4 mb-8">
          {!isPending && user ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-3 w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <img 
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5F7wTf4YmnGpgjo2wGWTlxO7ZKOfbqg2M_viqzSWnQ&s"} 
                  alt={user.name || "User Avatar"} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.name || 'Profile'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="w-full text-center py-3 text-base font-semibold rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          ) : !isPending && (
            <>
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>

    </nav>
  );
}