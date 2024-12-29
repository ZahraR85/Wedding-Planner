import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin } from "react-icons/fa";
import logo from '../images/logo6.png';


const Footer = () => {
  return (
    <footer className="bg-BgKhaki text-BgFont py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Menu Section */}
        <div>
          <h3 className="text-3xl font-bold mb-6">MENU</h3>
          <ul className="space-y-3">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#weddings" className="hover:underline">Weddings</a></li>
            <li><a href="#process" className="hover:underline">Our Process</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Center Section (Logo or Branding) */}
        <div className="border-t border-BgKhakiDark md:border-t-0 md:border-l md:border-r md:px-6 flex flex-col items-center">
          <img src={logo} alt="I Said Yes Logo" className="w-32 h-auto mb-4" />
          <p className="text-sm mb-4">
            Your ultimate wedding planner to make your big day unforgettable.
          </p>
          <p className="text-xs">© 2023 I SAID YES. All Rights Reserved.</p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-3xl font-bold mb-6">CONTACT</h3>
          <p className="mb-2">
            Email: <a href="mailto:info@isaidyes.com" className="hover:underline">info@isaidyes.com</a>
          </p>
          <p className="mb-6">Phone: +1 (555) 123-4567</p>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a href="#" className="hover:text-BgPinkDark"><FaInstagram /></a>
            <a href="#" className="hover:text-BgPinkDark"><FaFacebook /></a>
            <a href="#" className="hover:text-BgPinkDark"><FaPinterest /></a>
            <a href="#" className="hover:text-BgPinkDark"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-12 text-center text-sm border-t border-BgKhakiDark pt-6">
        <a href="#impressum" className="hover:underline mx-4">Impressum</a>
        <a href="#privacy" className="hover:underline mx-4">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
