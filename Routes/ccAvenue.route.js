import express from "express";
import {
  createDonationEntry,
  postDonationResponse,
} from "../controller/ccAvenue.controller.js";

const donationRouter = express.Router();

// Route to handle donation entry creation
donationRouter.post("/", createDonationEntry);
donationRouter.post("/response", postDonationResponse);

// Success Page Endpoint
donationRouter.get("/success", (req, res) => {
  res.send("Transaction Successful! Thank you for your donation.");
});
// Failed Page Endpoint
donationRouter.get("/failed", (req, res) => {
  res.send("Transaction Failed! Please try again.");
});

export default donationRouter;
