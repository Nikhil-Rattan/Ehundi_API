import express from "express";
import {
  createDonation,
  getDonationById,
  getAllDonations,
} from "../controller/newDonation.controller.js";

const router = express.Router();

router.post("/", createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);

export default router;
