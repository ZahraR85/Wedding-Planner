import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImage, GalleryCategory } from '../controllers/galleryController.js';
import { verifyToken, adminOnly } from "../middleware/auth.js"; // Import the middlewares

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', verifyToken, adminOnly, addGalleryImage);
router.delete('/:id', verifyToken, adminOnly, deleteGalleryImage);
router.put('/:id', verifyToken, adminOnly, updateGalleryImage);  // PUT method for updating images
router.get('/category/:category', GalleryCategory);
export default router;