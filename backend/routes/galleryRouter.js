import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { authenticate } from '../middleware/verifyToken.js'; // Middleware to authenticate user

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', authenticate, addGalleryImage);
router.delete('/:id', authenticate, deleteGalleryImage);

export default router;