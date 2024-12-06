import Hero from "@/components/Hero";
import JobOffers from "@/components/JobOffers";
import FilterTest from "./filter/form";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <JobOffers />
      <FilterTest />
    </div>
  );
}
