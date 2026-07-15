'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';
import { Power } from '@gravity-ui/icons';

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router=useRouter();
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  // Sidebar navigation configuration with full route matching strings
  const navItems = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard/user' },
    { name: 'Add Skill', icon: '➕', href: '/dashboard/user/add-skill' },
    { name: 'Manage Skills', icon: '📝', href: '/dashboard/user/manage-skills' },
    { name: 'My Requests', icon: '💼', href: '/dashboard/user/my-requests' },
    { name: 'Received Requests', icon: '📥', href: '/dashboard/user/received-requests' },
    { name: 'Profile', icon: '👤', href: '/dashboard/user/profile' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white flex transition-colors duration-300">
      
      {/* ================= SIDEBAR PANEL ================= */}
      {/* Responsive adjustments: w-16 and small padding for mobile, w-64 and original padding for md+ */}
      <aside className="w-16 md:w-64 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-3 md:p-6 gap-8 shrink-0 sticky top-0 h-screen transition-all duration-300">
        
        {/* Dynamic Navigation Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            // Evaluates exact matches for subroutes
            const isActive = pathname === item.href;

            return (
              <Link 
                href={item.href} 
                key={item.name}
                title={item.name} // Native HTML tooltip on hover for icon-only mode
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 md:px-4 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                <span className="text-lg filter grayscale dark:grayscale-0 select-none shrink-0">
                  {item.icon}
                </span>
                {/* Text labels hide on small devices, show on md+ screens */}
                <span className="hidden md:inline truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Panel Actions */}
        <button 
          title="Logout"
          className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 md:px-4 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all mt-auto border-t border-gray-50 dark:border-gray-800 pt-4"
        >
          <span className="text-lg ">
            <Power/>
          </span>
          <span  onClick={handleSignOut} className="hidden cursor-pointer md:inline">Logout</span>
        </button>
      </aside>

      {/* ================= MAIN CONTENT INJECTION CONTAINER ================= */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}