import { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('http://localhost:3001/galleries');
      setImages(response.data);
    };

    fetchImages();
  }, []);

  const handleAddImage = async () => {
    try {
      await axios.post('http://localhost:3001/galleries', { imageName, imageUrl, description }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Image added successfully');
    } catch (error) {
      alert('Failed to add image');
    }
  };
  

  const handleDeleteImage = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3001/galleries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await axios.get('http://localhost:3001/galleries');
    setImages(response.data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img src={image.imageUrl} alt={image.description} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-gray-700">{image.description}</p>
              <button
                onClick={() => handleDeleteImage(image._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Image</h2>
        <input
          type="text"
          placeholder="imageName"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleAddImage}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add Image
        </button>
      </div>
    </div>
  );
};

export default Gallery;
