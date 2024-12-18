import express from 'express';
import UserInfo from '../models/userInfo.js'; 
import mongoose from 'mongoose';
import {
  createUserInfo,
  getAllUserInfo,
  getUserInfoById,
  updateUserInfo,
  deleteUserInfo,
} from '../controllers/userinfoController.js';

const router = express.Router();

// Route to check if user info exists
router.get("/check/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    // Ensure userID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid UserID format" });
    }

    // Query for user info
    const userInfo = await UserInfo.findOne({ userID: userID });

    if (userInfo) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user info:", error.message);
    res.status(500).json({ message: "Error checking user info", error: error.message });
  }
});

router.post('/', createUserInfo);
router.get('/', getAllUserInfo);
router.get('/:id', getUserInfoById);
router.put('/:id', updateUserInfo);
router.delete('/:id', deleteUserInfo);

export default router;


