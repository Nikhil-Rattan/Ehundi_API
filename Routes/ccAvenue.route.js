import express from "express";
import {
  createDonationEntry,
  postDonationResponse,
} from "../controllers/ccAvenue.controller.js";

const ccAvenueRouter = express.Router();

// Route to handle donation entry creation
ccAvenueRouter.post("/", createDonationEntry);
ccAvenueRouter.get("/response", postDonationResponse);

// Success Page Endpoint
ccAvenueRouter.get("/success", (req, res) => {
  // res.redirect("Transaction Successful! Thank you for your donation.");
  res.json("Transaction Successful!");
});

// Failed Page Endpoint
ccAvenueRouter.get("/failed", (req, res) => {
  // res.redirect("Transaction Failed! Please try again.");
  res.json("Transaction Failed!");
});

// ccAvenueRouter.get("/", (req, res) => {
//   res.send("CC Avenue Response Base Endpoint");
// });

export default ccAvenueRouter;
