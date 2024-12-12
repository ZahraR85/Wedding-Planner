import express from "express";
import {
  createMusicOption,
  getAllMusicOptions,
  getMusicOptionById,
  updateMusicOption,
  deleteMusicOption,
} from "../controllers/MusicOptionController.js";

const router = express.Router();

router.post("/", createMusicOption); // Create a new music option
router.get("/", getAllMusicOptions); // Get all music options
router.get("/:id", getMusicOptionById); // Get a single music option by ID
router.put("/:id", updateMusicOption); // Update a music option by ID
router.delete("/:id", deleteMusicOption); // Delete a music option by ID

export default router;