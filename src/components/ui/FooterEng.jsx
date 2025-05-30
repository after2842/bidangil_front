import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="relative bg-black text-gray-400 px-4 py-6 md:px-8 md:py-6 
                 flex flex-col md:flex-row items-center justify-between
                 space-y-4 md:space-y-0 border-t border-gray-800"
    >
      {/* Left Section */}
      <div className="text-sm">
        <span className="mr-1">&copy; {currentYear} Bidangil.</span>
        <span className="hidden sm:inline">All rights reserved.</span>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-6">
        <span className="text-[14px]">
          Address: 2F, 47 GangnamDaero 112Gil, GangnamGu, Seoul{" "}
          <span className="hidden md:block md:inline">
            | Business ID: 790-66-00467
          </span>
        </span>
        {/* Policy Links */}
        <a
          href="mailto:support@bidangil.co"
          className="hover:text-gray-200 transition-colors text-sm hidden md:block"
        >
          IR Inquiry
        </a>
        <a
          href="mailto:support@bidangil.co"
          className="hover:text-gray-200 transition-colors text-sm hidden md:block"
        >
          PR Inquiry
        </a>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#linkedin" className="hover:text-white transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a
            href="#instagram"
            className="hover:text-white transition-colors"
            onClick={() =>
              window.open(
                "https://www.instagram.com/bidangil.co/?utm_source=ig_web_button_share_sheet",
                "_blank"
              )
            }
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 text-sm">
        <span>Made by Samuel Choi</span>
      </div>
    </footer>
  );
};

export default Footer;
