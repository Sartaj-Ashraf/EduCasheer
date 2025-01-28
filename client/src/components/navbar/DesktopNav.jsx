import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaUserCircle } from "react-icons/fa";

const DesktopNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const studyMaterials = [
    {
      title: "Mathematics",
      link: "https://github.com/Musavirkhaliq/lecture-notes/tree/main/Mathematics",
    },
    {
      title: "Solved Previous Year Questions",
      link: "https://github.com/Musavirkhaliq/lecture-notes/tree/main/Solved%20Previous%20Papers",
    },
    {
      title: "ML-Study-Guide",
      link: "https://github.com/Musavirkhaliq/ML-Study-Guide",
    },
    {
      title: "Statistics",
      link: "https://github.com/Musavirkhaliq/lecture-notes/tree/main/Statistics",
    },
  ];

  const categories = [
    { title: "Advanced Python Programs", link: "#" },
    { title: "Math's Calculus Programs", link: "#" },
    { title: "AI and ML Programs", link: "#" },
    { title: "Popular Libraries Program", link: "#" },
  ];

  return (
    <header className="hidden lg:flex  py-2 h-20 w-full z-50 sticky top-0 bg-[var(--light)]">
      <nav className="container mx-auto px-4 flex ">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/api/placeholder/150/40"
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#6c6c6c] hover:text-[#00bcd4] transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/home/courses"
              className="text-[#6c6c6c] hover:text-[#00bcd4] transition-colors duration-300"
            >
              Courses
            </Link>

            {/* Study Material Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[#6c6c6c] hover:text-[#00bcd4] transition-colors duration-300">
                <span>Study Material</span>
                <FaAngleDown className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block pt-2">
                <div className="bg-white rounded-lg shadow-lg border border-[#f0f0f0] w-64">
                  <ul className="py-2">
                    {studyMaterials.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block px-4 py-2 text-[#6c6c6c] hover:bg-[#f0f0f0] hover:text-[#00bcd4] transition-colors duration-300"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[#6c6c6c] hover:text-[#00bcd4] transition-colors duration-300">
                <span>Categories</span>
                <FaAngleDown className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block pt-2">
                <div className="bg-white rounded-lg shadow-lg border border-[#f0f0f0] w-64">
                  <ul className="py-2">
                    {categories.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="block px-4 py-2 text-[#6c6c6c] hover:bg-[#f0f0f0] hover:text-[#00bcd4] transition-colors duration-300"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href="#contact-us"
              className="text-[#6c6c6c] hover:text-[#00bcd4] transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button className="p-2 rounded-full hover:bg-[#f0f0f0] transition-colors duration-300">
                <FaUserCircle className="text-2xl text-[#00bcd4]" />
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-[#00bcd4] text-white px-6 py-2 rounded-lg hover:bg-[#01427a] transition-colors duration-300"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="border-2 border-[#00bcd4] text-[#00bcd4] px-6 py-2 rounded-lg hover:bg-[#00bcd4] hover:text-white transition-colors duration-300"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopNav;
