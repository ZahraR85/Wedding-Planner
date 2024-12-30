import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from "../context/AppContext";

const GalleryManagement = () => {
  const [allImages, setAllImages] = useState([]); // Store all fetched images
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 10; // Number of images per page

  const [imageName, setImageName] = useState('');
  const [imagePath, setImagePath] = useState(null); // Track the uploaded image file
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingImageId, setEditingImageId] = useState(null);
  const { userId } = useAppContext();

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/galleries');
      console.log('Fetched images:', response.data); // Log the fetched images
      setAllImages(response.data); // Update the state with the fetched images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const currentImages = allImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddImage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        throw new Error('No token found in localStorage');
      }
  
      if (!userId || !category || !imagePath) {
        alert('User ID, category, and image are required to add an image');
        return;
      }
  
      const formData = new FormData();
      formData.append('imageName', imageName);
      formData.append('image', imagePath); // Ensure `imagePath` is a file object from an input
      formData.append('description', description);
      formData.append('category', category);
      formData.append('userId', userId);
  
      await axios.post('http://localhost:3001/galleries', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Image added successfully');
      fetchImages();
      setImageName('');
      setImagePath(null);
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Failed to add image');
    }
  };
  
  const handleUpdateImage = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      if (!userId || !category) {
        alert('User ID and category are required to update an image');
        return;
      }
  
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('imageName', imageName);
      formData.append('description', description);
      formData.append('category', category);
  
      if (imagePath) {
        formData.append('image', imagePath);
      } else {
        formData.append('keepExistingImage', true); // Tell backend to keep the current image
      }
  
      await axios.put(`http://localhost:3001/galleries/${editingImageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert('Image updated successfully');
      fetchImages(); // Reload images after updating
      setImageName('');
      setImagePath(null);
      setDescription('');
      setCategory('');
      setEditingImageId(null); // Clear editing state
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };  
  
  const handleDeleteImage = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/galleries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages(); // Reload images after deleting
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleEditClick = (image) => {
    setEditingImageId(image._id);
    setImageName(image.imageName);
    setDescription(image.description);
    setCategory(image.category);
    setImagePath(null); // Clear file input on edit
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative min-h-screen bg-cover bg-center p-20 bg-[url('https://i.postimg.cc/qMRwT2zF/gallery3.jpg')]">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative mx-auto w-full max-w-[calc(45%-100px)] bg-opacity-80 shadow-md rounded-lg p-5 mt-40 space-y-4">
          <h2 className="text-2xl font-bold text-BgFont mb-12 text-center">
            Add / Edit Images in Gallery
          </h2>
          <input
            type="text"
            placeholder="Image Name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="w-full mb-4 p-2 border border-BgKhaki rounded focus:outline-none focus:ring focus:ring-BgKhaki"
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log(file); // Log the selected file to see if it's being captured
              setImagePath(file); // Set the selected file to state
            }}
            className="w-full mb-4 p-2 border border-BgKhaki rounded focus:outline-none focus:ring focus:ring-BgKhaki"
          />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-2 border border-BgKhaki rounded focus:outline-none focus:ring focus:ring-BgKhaki"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 p-2 border border-BgKhaki rounded focus:outline-none focus:ring focus:ring-BgKhaki"
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="Venue">Venue</option>
            <option value="Makeup">Makeup</option>
            <option value="Photography">Photography</option>
            <option value="Wedding-dress">Wedding-dress</option>
            <option value="Musician">Musician</option>
            <option value="Cake">Cake</option>
          </select>
          {editingImageId ? (
            <button
              onClick={handleUpdateImage}
              className="w-full bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark hover:text-xl p-4 rounded"
            >
              Update Image
            </button>
          ) : (
            <button
              onClick={handleAddImage}
              className="w-full bg-BgPinkMiddle text-BgFont font-bold hover:bg-BgPinkDark hover:text-xl p-4 rounded"
            >
              Add Image
            </button>
          )}
        </div>
      </div>
      <div className="w-full p-6 bg-customBg1 shadow-lg rounded-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {currentImages.map((image) => (
            <div
              key={image._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out"
            >
              <img src={`http://localhost:3001${image.imagePath}`} alt={image.description} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-BgFont font-bold">{image.imageName}</p>
                <p className="text-BgFont">{image.description}</p>
                <button
                  onClick={() => handleEditClick(image)}
                  className="mt-4 px-4 py-2 bg-BgPinkMiddle text-BgFont font-bold rounded hover:bg-BgPinkDark"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="mt-4 ml-2 px-4 py-2 bg-BgPinkMiddle text-BgFont font-bold rounded hover:bg-BgPinkDark"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-BgPinkMiddle hover:bg-BgPinkDark text-white'}`}
          >
            Previous
          </button>
          <span className="text-BgFont font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-BgPinkMiddle hover:bg-BgPinkDark text-white'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;
