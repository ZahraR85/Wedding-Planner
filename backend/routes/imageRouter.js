import express from "express";
import { upload, uploadImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", upload.array("images", 10), uploadImages);

export default router;
