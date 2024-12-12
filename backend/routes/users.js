import express from 'express';
import { register, signin, verifyToken, updatePassword, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/signin', signin);
router.put('/password', verifyToken, updatePassword); // Update password
router.delete('/:userId', verifyToken, deleteUser);   // Delete user (admin-only)

export default router;
