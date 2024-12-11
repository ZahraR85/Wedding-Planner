import express from "express";
import {
    getReceptions,
    createReception,
    getReceptionById,
    updateReception,
    deleteReception,
} from "../controllers/receptionComtroller.js";

const router = express.Router();

router.route("/").get(getReceptions).post(createReception);
router.route("/:id").get(getReceptionById).put(updateReception).delete(deleteReception);

export default router;