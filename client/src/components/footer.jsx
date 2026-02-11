import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between">
        <p>© All Rights Reserved 2026.</p>

        <div className="flex items-center gap-4 justify-center text-2xl text-secondary-100">
          <a href="#" className="hover:text-primary-100 transition-colors duration-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-primary-100 transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-primary-100 transition-colors duration-300">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
