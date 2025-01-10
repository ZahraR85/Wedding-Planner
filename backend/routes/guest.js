import express from "express";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  sendInvitation,
  countYesGuests,
  sendToAllNotYetGuests,
} from "../controllers/guestController.js";

const router = express.Router();

// Define specific routes first
router.get("/count-yes", countYesGuests); // Specific route for counting "Yes" answers

// Define general routes
router.route("/").get(getGuests).post(createGuest);
router.route("/:id").get(getGuestById).put(updateGuest).delete(deleteGuest); // Dynamic route for guest by ID

router.post("/send-invitation", sendInvitation);
router.post("/send-to-all", sendToAllNotYetGuests);

export default router;