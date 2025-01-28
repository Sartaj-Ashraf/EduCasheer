import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaAngleUp,
} from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--footer)] text-[var(--pure)] pt-12 pb-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <img src="" alt="Company Logo" className="h-12 mb-4" />
            <p className="text-[var(--heaven)]  max-w-md text-center md:text-left ">
              Empowering learners worldwide with quality educational content and
              comprehensive study materials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-[var(--primary)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Home",
                "Study Material",
                "Courses",
                "Categories",
                "Road Maps",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-[#f0f0f0] hover:text-[var(--primary)] transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="md:col-span-3">
            <h3 className="text-[var(--primary)] mb-4">Connect With Us</h3>
            <ul className="space-y-3">
              {[
                { icon: FaFacebook, name: "Facebook" },
                { icon: FaTwitter, name: "Twitter" },
                { icon: FaLinkedin, name: "LinkedIn" },
                { icon: FaGithub, name: "GitHub" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-[#f0f0f0] hover:text-[#00bcd4] transition-colors duration-300"
                  >
                    <social.icon className="text-lg" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <h3 className="text-[var(--primary)] mb-4">Newsletter</h3>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-[#2a4452] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
              <button className="bg-[#00bcd4] text-white px-4 py-2 rounded-md text-sm hover:bg-[#01427a] transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-[#2a4452]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#6c6c6c] ">© 2024 All rights reserved</p>
            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 bg-[#2a4452] p-3 rounded-full hover:bg-[#00bcd4] transition-colors duration-300"
            >
              <FaAngleUp className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
