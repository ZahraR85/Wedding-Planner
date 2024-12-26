import { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Assume you have a way to check if the user is an admin

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('http://localhost:3001/galleries');
      setImages(response.data);
    };

    fetchImages();
    
    // Check if the user is an admin
    const userRole = localStorage.getItem('userRole'); // Assuming you store the user role in local storage
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleAddImage = async () => {
    const token = localStorage.getItem('token'); // Assuming you store the JWT in local storage
    await axios.post('http://localhost:3001/galleries', { imageUrl, description }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setImageUrl('');
    setDescription('');
    // Refresh the gallery after adding an image
    const response = await axios.get('http://localhost:3001/galleries');
    setImages(response.data);
  };

  const handleDeleteImage = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3001/galleries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Refresh the gallery after deleting an image
    const response = await axios.get('http://localhost:3001/galleries');
    setImages(response.data);
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.imageUrl} alt={image.description} />
            <p>{image.description}</p>
            {isAdmin && (
              <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      {isAdmin && (
        <div>
          <h2>Add Image</h2>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddImage}>Add Image</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;