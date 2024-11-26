// components/TestimonialsSection.tsx
import React from "react";

const testimonials = [
  {
    name: "Jane Doe",
    company: "Tech Solutions",
    feedback:
      "The platform is intuitive and helped us find the right candidates quickly and effectively.",
  },
  {
    name: "John Smith",
    company: "Construction Inc.",
    feedback:
      "The filtering options are fantastic. We saved hours by narrowing down the perfect candidates.",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        What Employers Are Saying
      </h2>
      <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
            <h4 className="font-semibold text-gray-800">
              {testimonial.name}, {testimonial.company}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};
