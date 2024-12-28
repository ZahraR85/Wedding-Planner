import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const { category } = useParams(); // Get category from the URL
  const [photos, setPhotos] = useState([]); // Store photos
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    // Fetch photos by category
    const fetchCategoryPhotos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/galleries/category/${category}` // Backend endpoint
        );
        setPhotos(response.data); // Update photos state
      } catch (error) {
        console.error('Error fetching category photos:', error);
      }
    };

    fetchCategoryPhotos();
  }, [category]);

  // Get the current photo based on the current page
  const currentPhoto = photos[currentPage - 1];

  const totalPages = Math.ceil(photos.length);

  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">{category} Photo</h1>
      <div className="flex justify-center mb-6">
        {currentPhoto ? (
          <img
            key={currentPhoto._id}
            src={currentPhoto.imageUrl}
            alt={currentPhoto.imageName}
            className="w-full h-112 object-cover rounded"
          />
        ) : (
          <p className="text-gray-500">No photos found for this category.</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryDetails;
