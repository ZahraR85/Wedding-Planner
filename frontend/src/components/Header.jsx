import { useAppContext } from "../context/AppContext";

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

  const cities = ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"];

  const handleSearch = () => {
    console.log("Search for:", selectedCity, searchTerm);
    // Add your search logic here
  };

  return (
    <header
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/SK1M5PmW/5be520cf22459c5f7dad2b10f22d91e4-5d273d28-1000.jpg)",
      }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-opacity-70 text-white">
        <div className="container mx-auto flex items-center justify-between px-10 py-4">
          {/* Links */}
          <ul className="flex font-bold items-center space-x-12">
            <li className="text-2xl font-bold mr-20">I Said Yes!</li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            {/* Price Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setHoveredDropdown("price")}
              onMouseLeave={clearHoveredDropdown}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <span>Price</span>
                <span>{hoveredDropdown === "price" ? "▲" : "▼"}</span>
              </div>
              <div
                className={`absolute top-full pl-4 w-[400px] h-[200px] bg-white text-black shadow-lg transition-all duration-500 ${
                  hoveredDropdown === "price"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <ul className="flex flex-col items-start justify-center h-full space-y-4">
                  <li className="text-lg hover:underline">
                    <a href="/packages">Visit Our Packages</a>
                  </li>
                  <li className="text-lg hover:underline">
                    <a href="/favorites">Choose Your Favorites</a>
                  </li>
                </ul>
              </div>
            </li>
            {/* Facilities Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setHoveredDropdown("facilities")}
              onMouseLeave={clearHoveredDropdown}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <span>Facilities</span>
                <span>{hoveredDropdown === "facilities" ? "▲" : "▼"}</span>
              </div>
              <div
                className={`absolute top-full pl-4 w-[400px] h-[200px] bg-white text-black shadow-lg transition-all duration-500 ${
                  hoveredDropdown === "facilities"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <ul className="flex flex-col items-start justify-center h-full space-y-4">
                  <li className="text-lg hover:underline">
                    <a href="/facilities/food">Food</a>
                  </li>
                  <li className="text-lg hover:underline">
                    <a href="/facilities/photography">Photography</a>
                  </li>
                  <li className="text-lg hover:underline">
                    <a href="/facilities/music">Music</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
          </ul>
          {/* Login/Register */}
          <div className="font-bold">
            <button className="hover:underline focus:outline-none">
              Login | Register
            </button>
            <button className="ml-4 font-bold px-6 py-3 bg-btnLight rounded hover:bg-btnDark">
          Let’s Start
        </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50">
        <p className="text-xl font-light mb-4">
          Welcome to our amazing platform! Explore everything we have to offer.
        </p>
       {/* Search Section */}
        <div className="w-full text-gray">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter City..."
              className="w-full md:w-[400px] px-4 py-2 border rounded-md bg-transparent"
            />
            {/* City Dropdown */}
              <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full md:w-[200px] px-4 py-2 border rounded-md bg-transparent"
            >
              <option value="All Cities" >All Cities</option>
              {cities.map((city, index) => (
                <option key={index} value={city}  className="text-gray-500 bg-transparent" >
                  {city}
                </option>
              ))}
            </select>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-btnLight text-white px-4 py-2 rounded-md flex items-center hover:bg-btnDark transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
              Search
            </button>
          </div>
          </div>
      </div>

    </header>
  );
};

export default Header;
