import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImage, GalleryCategory } from '../controllers/galleryController.js';
import { verifyToken, adminOnly } from "../middleware/auth.js";
import fileUploader from '../middleware/multer.js';
import cloudUploader from '../middleware/cloudinaryUploadMiddleware.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', verifyToken, adminOnly, fileUploader.single('image'),cloudUploader, addGalleryImage);  // Use upload.single('image')
router.delete('/:id', verifyToken, adminOnly, deleteGalleryImage);
router.put('/:id', verifyToken, adminOnly, fileUploader.single('image'),cloudUploader, updateGalleryImage);  // Use upload.single('image')
router.get('/category/:category', GalleryCategory);

export default router;
