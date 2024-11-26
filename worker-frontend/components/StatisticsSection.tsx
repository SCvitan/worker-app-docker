// components/StatisticsSection.tsx
import React from "react";

export const StatisticsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="flex justify-around items-center max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">10k+</h3>
          <p className="text-gray-600">Active Employees</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">1k+</h3>
          <p className="text-gray-600">Registered Employers</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">95%</h3>
          <p className="text-gray-600">Employer Satisfaction</p>
        </div>
      </div>
    </section>
  );
};
