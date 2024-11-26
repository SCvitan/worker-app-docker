// components/CTASection.tsx
import React from "react";

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-lg mb-6">
        Join thousands of employers and job seekers finding their perfect match.
      </p>
      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
        Sign Up Today
      </button>
    </section>
  );
};
