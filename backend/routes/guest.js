import express from 'express';
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} from '../controllers/guestController.js';

const router = express.Router();

router.route("/").get(getGuests).post(createGuest);
router.route("/:id").get(getGuestById).put(updateGuest).delete(deleteGuest);

export default router;