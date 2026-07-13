'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Admin exclusive navigation items
  const adminNavItems = [
    { name: 'Admin Overview', icon: '📈', href: '/dashboard/admin' },
    { name: 'Manage Users', icon: '👥', href: '/dashboard/admin/users' },
    { name: 'Verify Skills', icon: '🛡️', href: '/dashboard/admin/verify-skills' },
    { name: 'Platform Dispute', icon: '⚖️', href: '/dashboard/admin/disputes' },
    { name: 'System Settings', icon: '⚙️', href: '/dashboard/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white flex transition-colors duration-300">
      
      {/* ================= LEFT ADMIN SIDEBAR PANEL ================= */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-6 gap-8 shrink-0 sticky top-0 h-screen">
        
        {/* Brand Header with Admin Tag */}
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">SB</div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">SkillBridge</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400 mt-1 px-0.5">
            Administration Panel
          </span>
        </div>

        {/* Navigation Map */}
        <nav className="flex flex-col gap-1 flex-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link 
                href={item.href} 
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold'
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
          <span>🚪</span> Exit Panel
        </button>
      </aside>

      {/* ================= MAIN ADM WORKSPACE CONTAINER ================= */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}