import express from "express";
import {
  createOrUpdateReception,
  getReceptions,
  getReceptionById,
  deleteReception,
} from "../controllers/receptionComtroller.js";

const router = express.Router();

// Route to create or update a reception (using POST for both)
router.post("/", createOrUpdateReception);

// Route to get all receptions for a user
router.get("/", getReceptions);

// Route to get a specific reception by ID
router.get("/:id", getReceptionById);

// Route to delete a reception by ID
router.delete("/:id", deleteReception);

export default router;
