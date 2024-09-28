import express from "express";
import { createDonationEntry } from "../controller/ccAvenue.controller.js";

const donationRouter = express.Router();

// Route to handle donation entry creation
donationRouter.post("/", createDonationEntry);

export default donationRouter;
