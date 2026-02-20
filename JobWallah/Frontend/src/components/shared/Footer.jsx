import React from "react";
import { FaDiscord, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-900 py-8 mt-5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Brand + Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-black">Job<span className="text-red-500">Wallah</span></h2>
          <p className="text-sm">© 2026 Ayush Jha. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0 text-xl">
          <a
            href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition"
          >
            <FaDiscord />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:ayushsjha2008@gmail.com"
            className="hover:text-red-600 transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;