import express from "express";
import {
  createDonation,
  getDonationById,
  getAllDonations,
} from "../controllers/newDonation.controller.js";

const router = express.Router();

router.post("/", createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);

export default router;
