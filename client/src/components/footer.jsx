import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t mt-6">
      
      <div className="
        container mx-auto 
        px-4 py-4 
        flex flex-col gap-3 
        items-center 
        text-center 
        lg:flex-row lg:justify-between
      ">
        
        {/* Text */}
        <p className="text-sm sm:text-base text-gray-600">
          © All Rights Reserved 2026.
        </p>

        {/* Social Icons */}
        <div className="
          flex items-center gap-5 
          text-xl sm:text-2xl
        ">
          <a href="#" className="hover:text-blue-600 transition">
            <FaFacebook />
          </a>

          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;