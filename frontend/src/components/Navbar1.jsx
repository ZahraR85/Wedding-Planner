import { useState } from "react";
import {useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../images/logo8.jpg';
import { FaHome,FaUser, FaShoppingCart, FaTimes, FaBars} from 'react-icons/fa'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDropdownOpen, setDropdownOpen, isAuthenticated, role, signOut, shoppingCardCount} = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated, 'role:', role);
  }, [isAuthenticated, role]); // Log when these values change

  return (
    <nav className="border-b bg-BgKhaki shadow-md">
      {/* First Row */}
      <div className="flex items-center text-BgFont justify-between px-4 py-2 md:px-8 ">
        <button
          className=" text-BgFont lg:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="text-BgFont text-2xl" />  
        </button>
        <div>
        <ul className="flex font-bold text-BgFont items-center space-x-12">
          <li>
          <Link to="/" className="flex items-center space-x-1 hover:underline">
              <FaHome className="text-xl" />
              <span>Home</span>
          </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Gallery" className="hover:underline">
              Gallery
            </Link>
          </li>
          </ul>
        </div>
        <Link to="/" className="block">
            <img src={logo} alt="Logo" className="h-16"/>
          </Link>
         {/* Right side: Links */}
          <ul className="flex font-bold text-BgFont items-center space-x-12">
          {isAuthenticated && role === 'admin' && (
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="hover:underline focus:outline-none"
              >
                Admin Pannel {isDropdownOpen ? '▲' : '▼'}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-[200px] bg-white text-black shadow-lg mt-2">
                  <ul className="flex flex-col items-start space-y-2">
                    <li className="hover:underline">
                      <Link to="/GalleryManagement">Manage Gallery</Link>
                    </li>
                    <li className="hover:underline">
                      <Link to="/venues">Manage Venue</Link>
                    </li>
                  {/* <li className="hover:underline"><Link to="/">Gallery Settings</Link></li>*/}
                  </ul>
                </div>
              )}
            </li>
          )}
          <li>
        {/* Shopping Cart with Item Count */}
        <Link to="/ShoppingCard" className="flex items-center space-x-1 hover:underline">
          <FaShoppingCart className="text-xl" />
          <span>Shopping Card</span>
          {/* Display the shopping cart count */}
          {shoppingCardCount > 0 && (
            <span className="ml-2 text-sm text-red-600">{shoppingCardCount}</span>
          )}
        </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <Link to="/signin" className="flex items-center space-x-1 hover:underline focus:outline-none">
                <FaUser className="text-xl" />
                <span>Signin | Register</span>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Second Row */}
      <div className="hidden text-BgFont items-center justify-around bg-gray-100 px-4 py-2 text-sm md:flex">
      <ul className="flex font-bold items-center justify-around space-x-12">
        <li className="hover:underline">
          <Link to="/userinfo"> UserInformation </Link>
        </li>
        <li className="hover:underline">
          <Link to="/Guests">Invitation of Guests</Link>
        </li>
        <li className="hover:underline">
          <Link to="/VenueSelections">Book your Venue</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Catering">Catering</Link>
        </li>
        <li className="hover:underline">
          <Link to="/photography">Photography</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Makeup">Makeup, Wedding Dress</Link>
        </li>
        <li className="hover:underline">
          <Link to="/Musics">Music Band</Link>
        </li>
        </ul>
    </div>
      {/* Mobile Searchbar */}
    {/*  <div className="block px-4 py-2 md:hidden"> <input type="text" placeholder="Search" */}
    {/* className="w-full rounded border px-4 py-2" /> </div> */}

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 my-4 bg-BgKhaki shadow-lg">
            <span className="p-6 text-xl text-BgFont font-semibold">I said yes!</span>
            <button
              className="text-lg font-semibold ml-20 text-BgFont border-2 rounded-full focus:outline-none"
              onClick={() => setMenuOpen(false)}
            ><FaTimes className="w-6 h-6 text-BgFont" />
            </button>
            <br />
            <hr />
            <div className="flex flex-col text-m gap-4 p-6">
              <a href="/userinfo" className="text-BgFont hover:text-red-500 hover:underline">User Information</a>
              <a href="/Guests" className="text-BgFont hover:text-red-500 hover:underline">Invitation of Guests</a>
              <a href="/VenueSelections" className="text-BgFont hover:text-red-500 hover:underline">Book your Venue</a>
              <a href="/Catering" className="text-BgFont hover:text-red-500 hover:underline">Catering</a>
              <a href="/photography" className="text-BgFont hover:text-red-500 hover:underline">Photography</a>
              <a href="/Makeup" className="text-BgFont hover:text-red-500 hover:underline">Makeup, Wedding Dress</a>
              <a href="/Musics" className="text-BgFont hover:text-red-500 hover:underline">Music Band</a>

            </div>
            <hr />
            <br />
            <Link to="/signin" className="flex items-center text-BgFont ml-4 space-x-1 hover:underline focus:outline-none">
                <FaUser className="text-xl" />
                <span>Signin | Register</span>  
            </Link>

          </div>

          <div
            className="flex-1 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
