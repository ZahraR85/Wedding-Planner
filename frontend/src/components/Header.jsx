import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';
//import Navbar1 from './Navbar1';
const Header = () => {
  const {
    selectedCity,
    searchTerm,
    setSelectedCity,
    setSearchTerm,
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
     {/* Navbar Component */}
      {/* <Navbar1 /> */}

      {/* Hero Section search */}

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
              className="bg-BgPinkMiddle text-white px-4 py-2 rounded-md flex items-center hover:bg-BgPinkDark transition"
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
