import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { isDropdownOpen, setDropdownOpen } = useAppContext();
  const location = useLocation();

  // Check if the current route is the homepage
  const isHomepage = location.pathname === '/';

  return (
    <nav
      className={`${
        isHomepage
          ? 'absolute top-0 left-0 w-full bg-opacity-70'
          : 'sticky top-0 bg-btnLight shadow-md'
      } text-white`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-10 py-4 ${
          isHomepage ? '' : 'text-black'
        }`}
      >
        <ul className="flex font-bold items-center space-x-12">
          <li className="text-2xl font-bold mr-20">I Said Yes!</li>
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/userinfo" className="hover:underline">
              UserInfo
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
                <ul className="flex flex-col items-start p-4 space-y-2">
                  <li className="hover:underline">
                    <Link to="/Guests">invitation of Guests</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/Venues">VenueAdmin</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/VenueSelections">VenueSelection</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/Catering">Catering</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/photography">Photography</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/Makeup">Makeup, Hair, Wedding Dress</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to="/Musics">Music Band</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to="/cart" className="hover:underline">
              Shopping Cart
            </Link>
          </li>
        </ul>
        <div className="font-bold">
          <Link to="/signin" className="hover:underline focus:outline-none">
            Signin | Register
          </Link>
          <button className="ml-4 font-bold px-6 py-3 bg-btnLight rounded hover:bg-btnDark">
            Let’s Start
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
