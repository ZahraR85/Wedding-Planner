import Gallery from '../models/Gallery.js';
import path from 'path';

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
  const { userId, imageName, description, category } = req.body;

  if (!imageName || !description || !category || !userId || !req.file) {
    return res.status(400).json({ error: 'Missing required fields or image file' });
  }

  try {
   // const imagePath = req.file.path.replace(/\\/g, '/'); // Ensure forward slashes
    //console.log('Saving image path:', imagePath); // Log the image path

    const newImage = new Gallery({
      userId: userId,
      imageName,
      imagePath: `/uploads/${req.file.filename}`, // Store relative URL
      description,
      category,
    });
    
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error saving image:', error);
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

// Update a gallery image
export const updateGalleryImage = async (req, res) => {
  const { id } = req.params;
  const { imageName, description, userId, category } = req.body;

  if (!userId || !category || !imageName) {
    return res.status(400).json({ message: 'User ID, category, and image name are required' });
  }

  try {
    const updateData = { imageName, description, category };

    if (req.file) {
      updateData.imagePath = req.file.path;  // Update with new file if uploaded
    }

    const updatedImage = await Gallery.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route to get photos by category
export const GalleryCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const photos = await Gallery.find({ category });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
