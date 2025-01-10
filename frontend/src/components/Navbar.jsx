import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../images/logo8.jpg';
import { FaHome, FaUser, FaShoppingCart, FaTimes, FaBars} from 'react-icons/fa'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId, isDropdownOpen, setDropdownOpen, isAuthenticated, role, signOut, shoppingCardCount, setHoveredDropdown, clearHoveredDropdown } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Log changes for debugging
    console.log("isAuthenticated:", isAuthenticated, "role:", role);
  }, [isAuthenticated, role]);

  const handleMouseEnter = () => {
    setHoveredDropdown("adminPanel"); // Set the hovered dropdown when the user hovers over it
  };

  const handleMouseLeave = () => {
    clearHoveredDropdown(); // Clear the hovered dropdown when the user stops hovering
  };

  return (
    <nav className="border-b bg-BgKhaki shadow-md sticky top-0 z-50">
      {/* First Row */}
      <div className="flex items-center text-BgFont justify-between px-4 py-2 md:px-8">
        <button
          className="text-BgFont lg:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="text-2xl" />
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
              <Link to="/Gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline hidden lg:block">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="hidden lg:block">
          <img src={logo} alt="Logo" className="h-16" />
        </Link>
        <ul className="flex font-bold text-BgFont items-center space-x-12">
          {isAuthenticated && role === "admin" && (
            <li
              className="relative"
              onMouseEnter={handleMouseEnter} // Trigger on hover
              onMouseLeave={handleMouseLeave} // Clear hover when mouse leaves
            >
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="hidden lg:block hover:underline focus:outline-none"
              >
                Admin Panel {isDropdownOpen ? "▲" : "▼"}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-[200px] bg-white text-black shadow-lg mt-2">
                  <ul className="flex flex-col items-start space-y-2">
                    <li className="hover:underline">
                      <Link to="/GalleryManagement">Manage Gallery</Link>
                    </li>
                    <li className="hover:underline">
                      <Link to="/Admin/Venue">Manage Venue</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
          <li>
            <Link
              to="/ShoppingCard"
              className="flex items-center space-x-1 hover:underline"
            >
              <FaShoppingCart className="text-xl" />
              <span className="text-sm md:text-base whitespace-nowrap">Shopping Card</span>
              {shoppingCardCount > 0 && (
                <span className="ml-2 mb-4 text-lg text-red-600">
                  {shoppingCardCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button className= "hidden lg:block " onClick={signOut}>Sign Out</button>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:flex items-center space-x-1 hover:underline focus:outline-none"
              >
                <FaUser className="text-xl" />
                <span>Signin | Register</span>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Second Row */}
      <div className="hidden text-BgFont items-center justify-around bg-gray-100 px-4 py-2 text-sm md:flex">
        <ul className="flex font-bold items-center justify-around space-x-12 text-sm">
          <li className="hover:underline">
            <Link to="/userinfo">User Information</Link>
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

      {/* Side Menu for Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-BgKhaki shadow-lg">
            <div className="flex items-center justify-between p-4">
              <span className="text-BgFont text-xl font-semibold">I Said Yes!</span>
              <button
                className="text-lg font-semibold text-BgFont focus:outline-none"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <hr />
            <div className="flex flex-col gap-4 p-6">
              <Link to="/dashboard" className="text-BgFont hover:text-red-500 hover:underline">
                Dashboard
              </Link>
              <Link to="/userinfo" className="text-BgFont hover:text-red-500 hover:underline">
                User Information
              </Link>
              <Link to="/Guests" className="text-BgFont hover:text-red-500 hover:underline">
                Invitation of Guests
              </Link>
              <Link to="/VenueSelections" className="text-BgFont hover:text-red-500 hover:underline">
                Book your Venue
              </Link>
              <Link to="/Catering" className="text-BgFont hover:text-red-500 hover:underline">
                Catering
              </Link>
              <Link to="/photography" className="text-BgFont hover:text-red-500 hover:underline">
                Photography
              </Link>
              <Link to="/Makeup" className="text-BgFont hover:text-red-500 hover:underline">
                Makeup, Wedding Dress
              </Link>
              <Link to="/Musics" className="text-BgFont hover:text-red-500 hover:underline">
                Music Band
              </Link>
            </div>
            <hr />
            <br />
            {isAuthenticated ? (
              <button className="flex ml-4 text-BgFont items-center space-x-1 hover:text-red-500 hover:underline focus:outline-none" onClick={signOut}>Sign Out</button>
            ) : (
              <Link
                to="/signin"
                className="flex ml-4 text-BgFont items-center space-x-1 hover:text-red-500 hover:underline focus:outline-none"
              >
                <FaUser className="text-xl text-BgFont" />
                <span>Signin | Register</span>
              </Link>
            )}

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
