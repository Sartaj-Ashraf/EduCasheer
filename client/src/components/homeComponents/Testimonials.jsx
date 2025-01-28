import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "This platform transformed my career path!",
      author: "John D.",
    },
    {
      text: "The video lessons are easy to follow and comprehensive!",
      author: "Sarah W.",
    },
    { text: "Best investment in my education journey!", author: "Mike R." },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      {/* Testimonials */}
      <div className="bg-[#f0f0f0] rounded-lg p-6">
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="opacity-0 animate-fadeIn"
              style={{
                animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s forwards`,
              }}
            >
              <p className="text-[#6c6c6c] italic">"{testimonial.text}"</p>
              <p className="text-[#01427a] font-medium mt-2">
                – {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#f0f0f0] rounded-lg p-6">
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="opacity-0 animate-fadeIn"
              style={{
                animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s forwards`,
              }}
            >
              <p className="text-[#6c6c6c] italic">"{testimonial.text}"</p>
              <p className="text-[#01427a] font-medium mt-2">
                – {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
