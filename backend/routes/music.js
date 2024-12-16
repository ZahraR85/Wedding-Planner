import express from "express";
import {
  // createMusicSelection,
  updateMusicSelection,
  deleteMusicSelection,
  getUserSelectionById,
  createOrUpdateMusic,
  

  
} from "../controllers/MusicController.js";

const router = express.Router();

// router.post("/", createMusicSelection); 
router.route("/").post(createOrUpdateMusic);
router.put("/:id", updateMusicSelection); 
router.delete("/:id", deleteMusicSelection);
router.get("/", getUserSelectionById);



export default router;