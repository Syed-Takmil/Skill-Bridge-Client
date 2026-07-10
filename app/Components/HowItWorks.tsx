import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Create Profile',
      description: 'Sign up and tell us what skills you have to offer.',
    },
    {
      number: 2,
      title: 'Add Your Skills',
      description: 'Add the skills you can teach and the skills you want to learn.',
    },
    {
      number: 3,
      title: 'Send Request',
      description: 'Find someone with the skill you want and send an exchange request.',
    },
    {
      number: 4,
      title: 'Start Learning',
      description: 'Once accepted, start learning and teaching together!',
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="w-full bg-white dark:bg-gray-950 py-20 px-6 md:px-12 lg:px-20 border-t border-gray-50 dark:border-gray-900/50 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            How SkillBridge Works
          </h2>
        </div>

        {/* 4-Column Grid Setup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="bg-[#f8fafc] dark:bg-gray-900/40 border border-gray-100/50 dark:border-gray-800/40 rounded-2xl p-8 flex flex-col items-start gap-4 transition-all hover:shadow-md hover:shadow-gray-100/50 dark:hover:shadow-none"
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center shadow-sm shadow-indigo-200 dark:shadow-none">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                {step.title}
              </h3>

              {/* Description Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}