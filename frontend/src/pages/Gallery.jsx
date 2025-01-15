import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch photos from the backend and group by category
  useEffect(() => {
    const fetchGallery = async () => {
      try { 
        //const response = await axios.get('http://localhost:3001/galleries'); 
        const response = await axios.get( `${import.meta.env.VITE_API_URL}/galleries`);
        const photos = response.data;

        // Group photos by category
        const groupedCategories = photos.reduce((acc, photo) => {
          const { category } = photo;
          if (!acc[category]) acc[category] = [];
          acc[category].push(photo);
          return acc;
        }, {});

        setCategories(Object.entries(groupedCategories));
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  // Navigate to the category details page
  const handleCategoryClick = (category) => {
    navigate(`/Gallery/${category}`);
  };

  return (
    <div className="container mx-auto m-12 text-center">
      <h1 className="text-m lg:text-2xl font-bold text-BgFont mb-12">You can see all picture from our Gallery about different Categories you need!</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([category, photos]) => (
          <div
            key={category}
            className="card bg-gray-100 shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="text-m lg:text-xl font-semibold text-BgFont mb-4">{category}</h2>
            <img
              src={`${photos[0].imagePath}`}
              alt={category}
              className="w-full h-72 object-cover rounded"
            />
            <p className="text-sm lg:text-m text-BgFont mt-2">{photos.length} photos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
