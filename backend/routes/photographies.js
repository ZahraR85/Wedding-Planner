import express from "express";
//import validatePhotographyData from "../middleware/validatePhotographyData.js";
import { createPhotography, updatePhotography } from "../controllers/photographyController.js";

const router = express.Router();

router.post("/", createPhotography);
router.put("/", updatePhotography);

export default router;
