import {useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
//import SignOut from '../Auth/SignOut';
import logo from '../images/logo8.jpg';
import { FaHome } from 'react-icons/fa'; // Home icon
import { FaUser } from 'react-icons/fa'; // User icon for Sign-in
import { FaShoppingCart } from 'react-icons/fa'; // Shopping cart icon

const Navbar = () => {
  const { isDropdownOpen, setDropdownOpen, isAuthenticated, role, signOut } = useAppContext();
  const location = useLocation();

  const isHomepage = location.pathname === '/';
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated, 'role:', role);
  }, [isAuthenticated, role]); // Log when these values change

  return (
    <nav
      className={`${
        isHomepage
          ? 'absolute top-0 left-0 w-full bg-opacity-70'
          : 'sticky top-0 z-50 bg-BgKhaki shadow-md'
      } text-white`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-10 py-4 ${
          isHomepage ? '' : 'text-black'
        }`}
      >
        {/* Left side: Links */}
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
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <span>Facilities</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-[200px] bg-white text-black shadow-lg mt-2">
                <ul className="flex flex-col items-start  space-y-2">
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
            )}
          </li>
        </ul>

        {/* Middle: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block">
            <img
              src={logo} // Adjust this path if necessary
              alt="Logo"
              className="h-16"
            />
          </Link>
        </div>

        {/* Right side: Links */}

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
    </nav>
  );
};

export default Navbar;