import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "@/components/FeaturesSection";
import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatisticsSection } from "@/components/StatisticsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
