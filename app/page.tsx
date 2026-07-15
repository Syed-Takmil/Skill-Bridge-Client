import Image from "next/image";
import HeroBanner from "./Components/Banner";
import StatsBar from "./Components/StatsBar";
import HowItWorks from "./Components/HowItWorks";
import Categories from "./Components/Categories";
import Features from "./Components/Features";
import CTA from "./Components/CTA";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
   <div className="min-h-screen bg-white dark:bg-gray-950 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <HeroBanner />
      <StatsBar />
      <HowItWorks />
      
      {/* Newly Added Sections */}
      <Categories/>
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
