import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';
import { useState } from 'react';

const Header1 = () => {
  const { selectedCity, searchTerm, setSelectedCity, setSearchTerm } =
    useAppContext();

  const cities = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'];

  const handleSearch = () => {
    console.log('Search for:', selectedCity, searchTerm);
  };

  // Slider images
  const sliderImages = [


    'https://i.postimg.cc/wMB8VqcC/Makeup18.jpg',
    'https://i.postimg.cc/1XS45qSp/bridemaids2.jpg',
    'https://i.postimg.cc/D0Rqv49P/makeup1.jpg',
    'https://i.postimg.cc/d3Fh4mcX/makeup2.png',
    'https://i.postimg.cc/gJTMhj9n/music1.png',
    'https://i.postimg.cc/2SC8M8Jq/photo1.jpg',
    'https://i.postimg.cc/FKdtnM9d/photo2.jpg',
    'https://i.postimg.cc/BvWN4kT1/photo3.webp',
    'https://i.postimg.cc/T1Wpd7qp/photo5.jpg',
    'https://i.postimg.cc/1XS45qSp/bridemaids2.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <header className="relative h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Slider */}
      <div className="relative h-full">
        <img
          src={sliderImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-BgPinkMiddle text-white p-3 rounded-full hover:bg-BgPinkDark z-10"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-BgPinkMiddle text-white p-3 rounded-full hover:bg-BgPinkDark z-10"
        >
          &#8594;
        </button>

        {/* Dots for Current Image */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? 'bg-white' : 'bg-BgPinkDark'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Hero Section Search */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
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

export default Header1;
