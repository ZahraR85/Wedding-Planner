import { useState } from "react";
import {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SignOut from '../Auth/SignOut';
import logo from '../images/logo8.jpg';
import { FaHome } from 'react-icons/fa'; // Home icon
import { FaUser } from 'react-icons/fa'; // User icon for Sign-in
import { FaShoppingCart } from 'react-icons/fa'; // Shopping cart icon

const Navbar = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  //const navigate = useNavigate();
  const { setAuth } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDropdownOpen, setDropdownOpen, isAuthenticated, role, signOut } = useAppContext();
  const location = useLocation();

  const isHomepage = location.pathname === '/';
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated, 'role:', role);
  }, [isAuthenticated, role]); // Log when these values change

  const handleSignIn = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:3001/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
      // Set authentication context and store user info in localStorage
      setAuth(true, data.userId, data.role);  // Set authentication context
      //localStorage.setItem('role', data.role);  // Store user role
      //localStorage.setItem('token', data.token);  // Store token
        navigate('/');
      } else {
        const message = await response.text();
        setError(message || 'Invalid login credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to sign in. Please try again later.');
    }
  };
  return (
    <nav className="border-b bg-BgKhaki shadow-md">
      {/* First Row */}
      <div className="flex items-center justify-between px-4 py-2 md:px-8">
        <button
          className="text-lg font-semibold"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
        <div>
        <ul className="flex font-bold items-center space-x-12">
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
          <ul className="flex font-bold items-center space-x-12">
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
          <Link to="/cart" className="flex items-center space-x-1 hover:underline">
            <FaShoppingCart className="text-xl" />
            <span>Shopping Cart</span>
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
      <div className="hidden items-center justify-between bg-gray-100 px-4 py-2 text-sm md:flex">
      <ul className="flex font-bold items-center space-x-12">
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
      <div className="block px-4 py-2 md:hidden">
        <input
          type="text"
          placeholder="Suchbegriff eingeben"
          className="w-full rounded border px-4 py-2"
        />
      </div>

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white shadow-lg">
            <button
              className="p-4 text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Schließen
            </button>
            <hr />
            <div className="flex flex-col gap-2 p-4">
              <a href="/userinfo" className="hover:text-red-500">User Information</a>
              <a href="/Guests" className="hover:text-red-500">Invitation of Guests</a>
              <a href="/VenueSelections" className="hover:text-red-500">Book your Venue</a>
              <a href="/Catering" className="hover:text-red-500">Catering</a>
              <a href="/photography" className="hover:text-red-500">Photography</a>
              <a href="/Makeup" className="hover:text-red-500">Makeup, Wedding Dress</a>
              <a href="/Musics" className="hover:text-red-500">Music Band</a>

            </div>
            <hr />
            <br />
            <Link to="/signin" className="flex items-center ml-4 space-x-1 hover:underline focus:outline-none">
                <FaUser className="text-xl" />
                <span>Signin | Register</span>  
            </Link>
            <div>
          <button
            onClick={handleSignIn}
            className="bg-BgPinkMiddle text-BgFont py-2 text-lg font-bold hover:bg-BgPinkDark rounded w-full"
          >
            Sign In
          </button>
          </div>
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
