import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const {
    selectedCity,
    searchTerm,
    setSelectedCity,
    setSearchTerm,
    hoveredDropdown,
    setHoveredDropdown,
    clearHoveredDropdown,
  } = useAppContext();

  const cities = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'];

  const handleSearch = () => {
    console.log('Search for:', selectedCity, searchTerm);
  };

  return (
    <header
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://i.postimg.cc/SK1M5PmW/5be520cf22459c5f7dad2b10f22d91e4-5d273d28-1000.jpg)',
      }}
    >
      <nav className="absolute top-0 left-0 w-full bg-opacity-70 text-white">
        <div className="container mx-auto flex items-center justify-between px-10 py-4">
          <ul className="flex font-bold items-center space-x-12">
            <li className="text-2xl font-bold mr-20">I Said Yes!</li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setHoveredDropdown('facilities')}
              onMouseLeave={clearHoveredDropdown}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <span>Facilities</span>
                <span>{hoveredDropdown === 'facilities' ? '▲' : '▼'}</span>
              </div>
              <div
                className={`absolute top-full pl-4 w-[400px] h-[200px] bg-white text-black shadow-lg transition-all duration-500 ${
                  hoveredDropdown === 'facilities'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4'
                }`}
              >
                <ul className="flex flex-col items-start justify-center h-full space-y-4">
                <li className="text-lg hover:underline">
                    <Link to="/facilities/Venue">Venue</Link>
                  </li>
                  <li className="text-lg hover:underline">
                    <Link to="/facilities/Catering">Catering</Link>
                  </li>
                  <li className="text-lg hover:underline">
                    <Link to="/facilities/photography">Photography</Link>
                  </li>
                  <li className="text-lg hover:underline">
                    <Link to="/facilities/Makeup">Makeup, Hair, Wedding Dress</Link>
                  </li>
                  <li className="text-lg hover:underline">
                    <Link to="/facilities/music">Music Band</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50">
        <p className="text-xl font-light mb-4">
          Welcome to our amazing platform! Explore everything we have to offer.
        </p>
        <div className="w-full text-gray">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter City..."
              className="w-full md:w-[400px] px-4 py-2 border rounded-md bg-transparent"
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full md:w-[200px] px-4 py-2 border rounded-md bg-transparent"
            >
              <option value="All Cities">All Cities</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-btnLight text-white px-4 py-2 rounded-md flex items-center hover:bg-btnDark transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;