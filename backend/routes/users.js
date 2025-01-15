/*import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import { register, signin, verifyToken, updatePassword, deleteUser,getUsers ,getUserRole} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUserRole);
router.post('/register', register);
router.post('/signin', signin);
router.put('/password', verifyToken, updatePassword); // Update password
//router.delete('/:userId', verifyToken, deleteUser);   
router.delete('/:userId', verifyToken, isAdmin, deleteUser ); // Delete user (admin-only)
export default router; 
*/

import express from 'express';
import {
  register,
  signin,
  updatePassword,
  deleteUser,
  getUsers,
  getUserProfile,
} from '../controllers/userController.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import { validateRegistration, validateLogin } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/signin', validateLogin, signin);
router.put('/password', verifyToken, updatePassword);
router.delete('/user/:userId', verifyToken, adminOnly, deleteUser);
router.get('/users', verifyToken, adminOnly, getUsers);
router.get ('/profile', verifyToken, getUserProfile);
export default router;
