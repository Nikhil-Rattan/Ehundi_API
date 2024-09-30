import express from "express";
import {
  createDonationEntry,
  postDonationResponse,
} from "../controller/ccAvenue.controller.js";

const ccAvenueRouter = express.Router();

// Route to handle donation entry creation
ccAvenueRouter.post("/", createDonationEntry);
ccAvenueRouter.post("/response", postDonationResponse);

// Success Page Endpoint
ccAvenueRouter.get("/success", (req, res) => {
  res.send("Transaction Successful! Thank you for your donation.");
});
// Failed Page Endpoint
ccAvenueRouter.get("/failed", (req, res) => {
  res.send("Transaction Failed! Please try again.");
});

ccAvenueRouter.get("/", (req, res) => {
  res.send("CC Avenue Response Base Endpoint");
});

export default ccAvenueRouter;
