import express from "express";
import { createVenue } from "../controllers/venueController.js";
import { upload } from "../middleware/uploadMiddleware.js"; // Middleware for handling file uploads.

const router = express.Router();

router.post("/", upload.array("images", 5), createVenue); // Allows uploading up to 5 images.

export default router;
