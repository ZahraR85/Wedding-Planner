import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImage, GalleryCategory } from '../controllers/galleryController.js';
import { verifyToken, adminOnly } from "../middleware/auth.js";
import multer from 'multer';

// Multer setup (using the storage and fileFilter from above)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  }
});

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', verifyToken, adminOnly, upload.single('image'), addGalleryImage);  // Use upload.single('image')
router.delete('/:id', verifyToken, adminOnly, deleteGalleryImage);
router.put('/:id', verifyToken, adminOnly, upload.single('image'), updateGalleryImage);  // Use upload.single('image')
router.get('/category/:category', GalleryCategory);

export default router;
