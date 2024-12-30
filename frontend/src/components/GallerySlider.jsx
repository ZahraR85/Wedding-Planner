import { useState, useEffect } from 'react';
import axios from 'axios';

const GallerySlider = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all photos on component mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/galleries'); // Backend endpoint
        const allPhotos = response.data;
        setPhotos(allPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Auto-rotate images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex, photos]);

  // Show the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  // Show the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // Clean up
  }, [photos]);

  if (photos.length === 0) return <p>Loading photos...</p>;

  return (
    <div className="relative w-full h-[1000px] bg-customBg1 overflow-hidden">
      <h1 className="text-3xl font-bold text-center text-BgFont m-20">We use best services for you!</h1>
      {/* Image */}
      <img
        src={`http://localhost:3001${photos[currentIndex]?.imagePath}`}
        alt={photos[currentIndex]?.imageName || 'Gallery Image'}
        className="w-full h-full object-cover"
      />

      {/* Navigation */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
      >
        &#8594;
      </button>

      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
        {photos[currentIndex]?.imageName || 'Unnamed Photo'}
      </div>
    </div>
  );
};

export default GallerySlider;
