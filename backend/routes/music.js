import express from "express";
import {
  createMusicSelection,
  getAllMusicSelections,
  getMusicSelectionById,
  updateMusicSelection,
  deleteMusicSelection,
  getUserSelections,
  
} from "../controllers/musicController.js";

const router = express.Router();

router.post("/", createMusicSelection); // Create a new music selection
router.get("/", getAllMusicSelections); // Get all music selections
router.get("/:id", getMusicSelectionById); // Get a single user's music selection
router.put("/:id", updateMusicSelection); // Update a user's music selection
router.delete("/:id", deleteMusicSelection); // Delete a user's music selection
router.get("/", getUserSelections);


export default router;