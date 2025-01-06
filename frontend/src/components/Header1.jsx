import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";






const Header1 = ({ onScrollToSearchVenues }) => {
  const { selectedCity, setSelectedCity } = useAppContext();
  const [cities, setCities] = useState([]);
  // const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get("http://localhost:3001/venues/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    fetchCities();
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    navigate("/searchvenues"); // Navigate to the searchvenues page
  };


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
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-BgPinkDark'
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

          <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                onScrollToSearchVenues(); // Trigger scroll to Searchvenues
              }}
              className="w-full md:w-[300px] bg-BgPinkDark px-4 py-2 border rounded-md bg-transparent"
            >
              <option value="All Cities" className="text-gray-500">
                All Cities
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city} className="text-red-500">
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
