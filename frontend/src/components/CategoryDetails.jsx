import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const { category } = useParams(); // Get category from the URL
  const [photos, setPhotos] = useState([]); // Store photos
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 6; // Number of items per page

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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(photos.length / itemsPerPage);

  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">{category} Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPhotos.length > 0 ? (
          currentPhotos.map((photo) => (
            <img
              key={photo._id}
              src={photo.imageUrl}
              alt={photo.imageName}
              className="w-full h-48 object-cover rounded"
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No photos found for this category.</p>
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
