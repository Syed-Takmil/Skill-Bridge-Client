import Link from 'next/link';

const categories = [
  { name: 'Programming & Tech', icon: '💻', count: '120+ Skills', color: 'from-blue-500/10 to-indigo-500/10' },
  { name: 'Marketing & SEO', icon: '🚀', count: '85+ Skills', color: 'from-purple-500/10 to-pink-500/10' },
  { name: 'Design & Creative', icon: '🎨', count: '94+ Skills', color: 'from-amber-500/10 to-orange-500/10' },
  { name: 'Languages & Writing', icon: '🗣️', count: '62+ Skills', color: 'from-emerald-500/10 to-teal-500/10' },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore Popular Categories
          </h2>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Find the exact field you want to dive into. Swap expertise, build portfolios, and level up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={`/explore?category=${cat.name.split(' ')[0]}`}
              className="group block p-6 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/80 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl p-3 rounded-xl bg-white dark:bg-slate-950 shadow-sm group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cat.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}