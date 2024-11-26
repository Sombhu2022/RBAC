import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo and Branding */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-500">CodeCanvas</h2>
          <p className="text-gray-400 mt-2">
            Share your coding journey, connect with like-minded developers, and inspire the community.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 mb-6">
          <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="#blogs" className="hover:text-indigo-400 transition-colors">Blogs</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          <a href="#terms" className="hover:text-indigo-400 transition-colors">Terms of Use</a>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-6 mb-6">
          <a
            href="https://x.com/Sombhudas2023?t=ms9j_bbn6H4Wj_GO_lJlGQ&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sombhu-das-21176823a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-700 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Sombhu2022"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CodeCanvas by Sombhu Das. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
