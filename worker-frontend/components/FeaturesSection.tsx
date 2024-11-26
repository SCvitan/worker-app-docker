// components/FeaturesSection.tsx
import React from "react";

const features = [
  {
    title: "Advanced Profile Filtering",
    description:
      "Find the right talent with custom filters tailored to specific industries and skill sets.",
  },
  {
    title: "Secure Messaging",
    description:
      "Contact candidates securely through our in-platform messaging system.",
  },
  {
    title: "Flexible Payment Options",
    description:
      "Only pay when you're ready to connect, with transparent, affordable pricing.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Why Choose Our Platform
      </h2>
      <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
