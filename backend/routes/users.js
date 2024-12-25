import express from 'express';
import { register, signin, verifyToken, deleteUser,getUsers ,getUserRole, forgotPassword} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUserRole);
router.post('/register', register);
router.post('/signin', signin);
//router.put('/password', verifyToken, updatePassword); // Update password
router.delete('/:userId', verifyToken, deleteUser);   // Delete user (admin-only)
router.post('/forgotPassword', forgotPassword);
export default router;
