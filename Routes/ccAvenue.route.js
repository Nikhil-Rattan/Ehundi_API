import express from "express";
import { createDonationEntry, postDonationResponse } from "../controller/ccAvenue.controller.js";

const donationRouter = express.Router();

// Route to handle donation entry creation
donationRouter.post("/", createDonationEntry);
donationRouter.post("/response", postDonationResponse);

export default donationRouter;
