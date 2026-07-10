import Image from "next/image";
import HeroBanner from "./Components/Banner";
import StatsBar from "./Components/StatsBar";
import HowItWorks from "./Components/HowItWorks";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <StatsBar/>
      <HowItWorks/>
    </div>
  );
}
