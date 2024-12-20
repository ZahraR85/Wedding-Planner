import express from 'express';
import { register, signin, verifyToken, updatePassword, deleteUser,getUsers ,getUserRole} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUserRole);
router.post('/register', register);
router.post('/signin', signin);
router.put('/password', verifyToken, updatePassword); // Update password
router.delete('/:userId', verifyToken, deleteUser);   // Delete user (admin-only)

export default router;
