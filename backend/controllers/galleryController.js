import Gallery from '../models/Gallery.js';

// Get all gallery images
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().populate('userId', 'name');
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new image to the gallery
export const addGalleryImage = async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { imageName, imageUrl, description, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User  ID is required' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const newImage = new Gallery({
      userId, // Use the authenticated user's ID
      imageName,
      imageUrl,
      description,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an image from the gallery
export const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const deletedImage = await Gallery.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};