'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Sidebar navigation configuration with full route matching strings
  const navItems = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard/user' },
    { name: 'Add Skill', icon: '➕', href: '/dashboard/user/add-skill' },
    { name: 'Manage Skills', icon: '📝', href: '/dashboard/user/manage-skills' },
    { name: 'My Requests', icon: '💼', href: '/dashboard/user/my-requests' },
    { name: 'Received Requests', icon: '📥', href: '/dashboard/user/received-requests' },
    { name: 'Profile', icon: '👤', href: '/dashboard/user/profile' },
    { name: 'Settings', icon: '⚙️', href: '/dashboard/user/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white flex transition-colors duration-300">
      
      {/* ================= LEFT SIDEBAR PANEL ================= */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-6 gap-8 shrink-0 sticky top-0 h-screen">
        
       

        {/* Dynamic Navigation Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            // Evaluates exact matches for subroutes, or root fallback
            const isActive = pathname === item.href;

            return (
              <Link 
                href={item.href} 
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                <span className="text-base filter grayscale dark:grayscale-0 select-none">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Panel Actions */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all mt-auto border-t border-gray-50 dark:border-gray-800 pt-4">
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT INJECTION CONTAINER ================= */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}