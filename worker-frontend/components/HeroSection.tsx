// components/HeroSection.tsx
import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center py-20 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Connect with Top Talent or Your Next Opportunity
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl">
        Discover a streamlined platform for employers and employees to connect.
        Search profiles, filter candidates, and build meaningful professional
        relationships.
      </p>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4">
          Get Started
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg">
          Learn More
        </button>
      </div>
    </section>
  );
};
