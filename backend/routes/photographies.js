import express from "express";
import { 
  createOrUpdatePhotography, 
  getAllPhotographyEntries, 
  getPhotographyByUserId, 
  //updatePhotographyEntry, 
  deletePhotographyEntry 
} from "../controllers/photographyController.js";

const router = express.Router();

// Routes
router.post("/", createOrUpdatePhotography);
router.get("/", getAllPhotographyEntries);
router.get("/:id", getPhotographyByUserId);
//router.put("/:id", updatePhotographyEntry);
router.delete("/:id", deletePhotographyEntry);

export default router;
