'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full h-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      
      {/* LEFT: Brand Logo & Components */}
      <div className="flex items-center gap-2 z-50">
        {/* Main Logo Icon */}
        <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
          S
        </div>
        
        {/* Brand Name */}
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          SkillBridge
        </span>
        
        {/* Secondary Logo Component / Accent */}
        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/50 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20 ml-1">
          Beta
        </span>
      </div>

      {/* CENTER: Navigation Routes (Desktop & Large Tablet) */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        {navLinks.map((link) => (
          <li key={link.name} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* RIGHT: Auth Actions (Desktop & Large Tablet) */}
      <div className="hidden lg:flex items-center gap-4">
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
      </div>

      {/* HAMBURGER BUTTON (Mobile & Tablet) */}
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

      {/* MOBILE & TABLET DRAWER OVERLAY */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-950 z-40 flex flex-col justify-between p-6 pt-28 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Mobile Navigation Links */}
        <ul className="flex flex-col gap-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
          {navLinks.map((link) => (
            <li key={link.name} onClick={() => setIsOpen(false)}>
              <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 block py-2">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Auth Actions */}
        <div className="flex flex-col gap-4 mb-8">
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
        </div>

      </div>

    </nav>
  );
}