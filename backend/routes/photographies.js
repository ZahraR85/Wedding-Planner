import express from "express";
import { 
  createPhotographyEntry, 
  getAllPhotographyEntries, 
  getPhotographyById, 
  updatePhotographyEntry, 
  deletePhotographyEntry 
} from "../controllers/photographyController.js";

const router = express.Router();

// Routes
router.post("/", createPhotographyEntry);
router.get("/", getAllPhotographyEntries);
router.get("/:id", getPhotographyById);
router.put("/:id", updatePhotographyEntry);
router.delete("/:id", deletePhotographyEntry);

export default router;
