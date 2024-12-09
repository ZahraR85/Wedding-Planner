import { useState } from "react";

const Header = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const handleHover = (type) => setHoveredDropdown(type);
  const handleLeave = () => setHoveredDropdown(null);

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
              onMouseEnter={() => handleHover("price")}
              onMouseLeave={handleLeave}
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
              onMouseEnter={() => handleHover("facilities")}
              onMouseLeave={handleLeave}
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
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50">
        <p className="text-xl font-light mb-4">
          Welcome to our amazing platform! Explore everything we have to offer.
        </p>
        <button className="px-6 py-3 bg-btnLight rounded hover:bg-btnDark">
          Let’s Start
        </button>
      </div>
    </header>
  );
};

export default Header;
