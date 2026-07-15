export default function Features() {
  const features = [
    {
      title: "1-on-1 Bartering System",
      description: "No subscription fees or paywalls. Trade hours, teach what you know, and learn directly from industry peers.",
      icon: "🤝"
    },
    {
      title: "Flexible Scheduling",
      description: "Coordinate exchange sessions directly through our live dashboard, fitting lessons around your active calendar.",
      icon: "⏰"
    },
    {
      title: "Verified Community Networks",
      description: "Learn with confidence using transparent student ratings, detailed curriculums, and feedback history.",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-900/40 transition-colors border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Designed for Collaborative Growth
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            SkillBridge removes the high cost barrier from learning. Experience a feature-packed trade engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-4xl block mb-6">{feature.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}