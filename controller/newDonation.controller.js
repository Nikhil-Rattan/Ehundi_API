import NewDonation from "../modals/newDonation.model.js";
import mongoose from "mongoose";

export const createDonation = async (req, res) => {
  try {
    const {
      user,
      name,
      star,
      gotra,
      poojaDate,
      donationAmount,
      files = [],
      poojaId,
      poojaName,
    } = req.body;

    // Create a new donation document
    const newDonate = new NewDonation({
      user,
      name,
      star,
      gotra,
      poojaDate,
      donationAmount,
      files,
      paymentStatus: "unpaid", // Payment status set to unpaid by default
      poojaId,
      poojaName,
    });

    // Save to database
    const savedDonation = await newDonate.save();

    // Send a success response with the donation ID
    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      donationId: savedDonation._id, // Send the donation ID as response
      paymentStatus:savedDonation.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating donation",
      error: error.message,
    });
  }
};

export const getDonationById = async (req, res) => {
  try {
    console.log("Donation ID:", req.params.donationId);
    // Extract the donationId from the request parameters
    const { donationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(donationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID",
      });
    }

    // Find the donation by its ID
    const donation = await NewDonation.findById(donationId);

    // If donation not found, send a 404 response
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // If donation found, send it in the response
    return res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    // Handle any errors during the process
    return res.status(500).json({
      success: false,
      message: "Error retrieving donation",
      error: error.message,
    });
  }
};


export const getAllDonations = async (req, res) => {
  try {
    // Find all donations from the database
    const donations = await NewDonation.find();
  //   const data={
  //     donation:donations,
  //     length:donations.length
  // }
    // If no donations found, send an appropriate response
    if (donations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No donations found",
      });
    }

    // Return the list of donations
    return res.status(200).json({
      success: true,
      donations,
      
    });
  } catch (error) {
    // Handle any errors during the process
    return res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};
