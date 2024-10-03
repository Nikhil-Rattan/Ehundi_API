import express from "express";
import {
  createDonationEntry,
  postDonationResponse,
} from "../controller/ccAvenue.controller.js";

const ccAvenueRouter = express.Router();

// Route to handle donation entry creation
ccAvenueRouter.post("/", postDonationResponse);
ccAvenueRouter.post("/response", postDonationResponse);

// Success Page Endpoint
ccAvenueRouter.post("/success", (req, res) => {
  // res.redirect("Transaction Successful! Thank you for your donation.");
  res.json({
    message: "Transaction Successful!",
    redirectUrl: "https://www.example.com/success",
  });
});

// Failed Page Endpoint
ccAvenueRouter.post("/failed", (req, res) => {
  // res.redirect("Transaction Failed! Please try again.");
  res.json({
    message: "Transaction Failed!",
    redirectUrl: "https://www.example.com/success",
  });
});

ccAvenueRouter.post("/", (req, res) => {
  res.send("CC Avenue Response Base Endpoint");
});

export default ccAvenueRouter;
