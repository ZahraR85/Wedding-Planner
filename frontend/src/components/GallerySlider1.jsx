import { useState } from 'react';
import img1 from "../images/images_4.jpg";
import img2 from "../images/Makeup18.jpg";
import img3 from "../images/R (1).jpg";
import img4 from "../images/bridemaids1.jpg";
import img5 from "../images/cake11.jpg";
import img6 from "../images/w5.jpg";
import img7 from "../images/w6.jpg";
const GallerySlider1 = () => {
  const photos = [
    { imagePath: img1, imageName: 'Photo 1' },
    { imagePath: img2, imageName: 'Photo 2' },
    { imagePath: img3, imageName: 'Photo 3' },
    { imagePath: img4, imageName: 'Photo 4' },
    { imagePath: img5, imageName: 'Photo 5' },
    { imagePath: img6, imageName: 'Photo 6' },
    { imagePath: img7, imageName: 'Photo 7' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Set current index via dots
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-with rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={photos[currentIndex].imagePath}
        alt={photos[currentIndex].imageName}
        className="w-full h-[1000px] object-cover"
      />

      {/* Navigation Buttons */}
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

      {/* Dots for Current Image */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default GallerySlider1;
