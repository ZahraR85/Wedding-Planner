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
// router.route("/").post(createOrUpdateMusic);
// router.put("/:id", updateMusicSelection); 
// router.delete("/:id", deleteMusicSelection);
// router.get("/", getUserSelectionById);


router.get("/", getUserSelectionById); // Handles GET requests with ?userID=<userID>
router.post("/", createOrUpdateMusic); // Handles POST requests
router.put("/:id", updateMusicSelection); // Handles PUT requests for updating by ID
router.delete("/:id", deleteMusicSelection); // Handles DELETE requests by ID



export default router;