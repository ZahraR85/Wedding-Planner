import express from "express";
import {
    getMakeups,
    createMakeup,
    getMakeupById,
    updateMakeup,
    deleteMakeup,
} from "../controllers/makeupController.js";

const router = express.Router();

router.route("/").get(getMakeups).post(createMakeup);
router.route("/:id").get(getMakeupById).put(updateMakeup).delete(deleteMakeup);

export default router;