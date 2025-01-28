import React, { useState } from "react";
import { FaSearch, FaGraduationCap, FaUsers, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: FaGraduationCap, count: "10,000+", label: "Courses" },
    { icon: FaUsers, count: "500,000+", label: "Students" },
    { icon: FaStar, count: "95%", label: "Satisfaction" },
  ];

  return (
    <div className=" bg-[#fefefe]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  items-center py-12 px-4">
        {/* Left Section - Visual */}
        <div className="relative order-2 lg:order-1 items-start">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="https://cdn.prod.website-files.com/5f46c318c843828732a6f8e2/6502da06dd3676099cf24de0_Top-educational-software.webp"
              alt="Learning Environment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01427a]/80 to-[#00bcd4]/40" />

            {/* Floating Badges */}
            <div className="absolute top-6 left-6">
              <span className="bg-[#00bcd4]/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                Learn Anytime, Anywhere
              </span>
            </div>
            <div className="absolute top-20 left-10">
              <span className="bg-[#01427a]/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                10,000+ Videos Available
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0c0c0d]">
              Empowering You to Learn and Succeed
            </h1>
            <p className="text-lg text-[#6c6c6c]">
              Explore expertly curated educational videos on diverse topics from
              industry leaders and educators.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border border-[#f0f0f0] focus:outline-none focus:ring-2 focus:ring-[#00bcd4] pl-12"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6c6c6c]" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#00bcd4] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#01427a] transition-colors duration-300">
              Start Learning Now
            </button>
            <button className="border border-[#00bcd4] text-[#00bcd4] px-8 py-3 rounded-lg font-medium hover:bg-[#00bcd4] hover:text-white transition-colors duration-300">
              Browse Free Resources
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto text-2xl text-[#00bcd4] mb-2" />
                <div className="font-bold text-xl text-[#01427a]">
                  {stat.count}
                </div>
                <div className="text-sm text-[#6c6c6c]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
