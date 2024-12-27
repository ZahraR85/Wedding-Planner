import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { adminOnly } from "../middleware/auth.js"; // Import the middlewares

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', adminOnly, addGalleryImage);
router.delete('/:id', adminOnly, deleteGalleryImage);

export default router;