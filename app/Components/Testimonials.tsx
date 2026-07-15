export default function Testimonials() {
  const testimonials = [
    {
      quote: "I taught Sarah React development, and in exchange, she refined my startup's marketing copy. The exchange was fluid, completely free, and we both built assets we needed!",
      author: "Alex Rivers",
      role: "Frontend Engineer",
      avatar: "💻",
      swap: "React ⇄ Copywriting"
    },
    {
      quote: "Finding high-quality French conversational practice can be expensive. SkillBridge connected me with a native speaker who wanted UI design critiques. An absolutely genius concept.",
      author: "Chloe Dubois",
      role: "Product Designer",
      avatar: "🎨",
      swap: "UI Design ⇄ French"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            See how peer-to-peer barter exchanges are enabling real-world professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-slate-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl relative flex flex-col justify-between"
            >
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 text-5xl font-serif absolute top-4 left-4 opacity-10">“</span>
                <p className="text-gray-600 dark:text-gray-300 italic text-base leading-relaxed relative z-10">
                  {t.quote}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t border-gray-200/50 dark:border-gray-800/80 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-white dark:bg-gray-950 rounded-full">{t.avatar}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t.author}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 font-bold px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                  {t.swap}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}