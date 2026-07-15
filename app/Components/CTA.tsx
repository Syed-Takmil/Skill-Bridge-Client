import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-slate-55 dark:bg-gray-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-950 dark:to-purple-950 rounded-3xl p-10 md:p-16 text-center shadow-xl border border-indigo-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready to swap your first skill?
          </h2>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Join thousands of professionals bartering knowledge today. Register your unique skills, outline your curriculum, and establish clean exchange terms.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/explore" 
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-indigo-700 font-bold px-8 py-3.5 rounded-xl shadow-sm transition-colors text-center"
            >
              Find Partners
            </Link>
            <Link 
              href="/add-skill" 
              className="w-full sm:w-auto bg-indigo-500/30 hover:bg-indigo-500/40 text-white font-bold px-8 py-3.5 rounded-xl border border-white/20 transition-all text-center"
            >
              Register a Skill
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}