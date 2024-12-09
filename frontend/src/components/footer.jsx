import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#DBD084] text-gray-900 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Menu Section */}
        <div>
          <h3 className="text-3xl font-bold mb-6">MENU</h3>
          <ul className="space-y-3">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#weddings" className="hover:underline">Weddings</a></li>
            <li><a href="#process" className="hover:underline">Our Process</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Center Section (Logo or Branding) */}
        <div className="border-t border-gray-600 md:border-t-0 md:border-l md:border-r md:px-6">
          <h3 className="text-4xl font-serif italic mb-4">The Wedding Company</h3>
          <p className="text-sm mb-4">
            Wedding planning, concept & coordination in Munich & worldwide
          </p>
          <p className="text-xs">
            © 2023 The Wedding Company. All Rights Reserved.
          </p>
          <p className="text-xs">
            Designed by <a href="#" className="hover:underline">Studio Blanche</a>
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-3xl font-bold mb-6">CONTACT</h3>
          <p className="mb-2">
            Email: <a href="mailto:info@theweddingcompany.de" className="hover:underline">info@theweddingcompany.de</a>
          </p>
          <p className="mb-6">Phone: +49 (0) 152 25257063</p>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
            <a href="#" className="hover:text-gray-400"><FaPinterest /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-12 text-center text-sm border-t border-gray-600 pt-6">
        <a href="#impressum" className="hover:underline mx-4">Impressum</a>
        <a href="#privacy" className="hover:underline mx-4">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;







