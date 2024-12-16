import express from "express";
import {
    getMakeups,
    // createMakeup,
    getMakeupById,
    updateMakeup,
    deleteMakeup,
    createOrUpdateMakeup,
} from "../controllers/makeupController.js";

const router = express.Router();

router.route("/").get(getMakeups);
router.route("/:id").get(getMakeupById).put(updateMakeup).delete(deleteMakeup);
router.route("/").post(createOrUpdateMakeup); 

export default router;