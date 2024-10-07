import NewDonation from "../models/newDonation.model.js";
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

// export const getDonationById = async (req, res) => {
//   try {
//     console.log("Donation ID:", req.params.donationId);
//     // Extract the donationId from the request parameters
//     const { name } = req.params;
//     console.log("name:-",name)

//     // if (!mongoose.Types.ObjectId.isValid(name)) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     // message: "Invalid user ID",
//     //   });
//     // }

//     // Find the donation by its ID
//     const donation = await NewDonation.find(name);
//     console.log("donation",donation);

//     // If donation not found, send a 404 response
//     if (!donation) {
//       return res.status(404).json({
//         success: false,
//         message: "Donation not found",
//       });
//     }

//     // If donation found, send it in the response
//     return res.status(200).json({
//       success: true,
//       donation,
//     });
//   } catch (error) {
//     // Handle any errors during the process
//     return res.status(500).json({
//       success: false,
//       message: "Error retrieving donation",
//       error: error.message,
//     });
//   }
// };

export const getDonationById = async (req, res) => {
  try {
    // Extract the name from the request parameters
    const { name } = req.params;

    // Check if the name parameter is provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name parameter is required",
      });
    }

    // Find the donation by its name
    const donation = await NewDonation.findOne({ name });

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
    const { user } = req.query;
    const now = new Date();    

    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));

    let donations = {};
    if(user){
      donations = await NewDonation.find({user:user}).populate("poojaId").populate("user").sort({createdAt: -1});
    }else{
      donations = await NewDonation.find().populate("poojaId").populate("user").sort({ createdAt: -1 });
    }
  
    // If no donations found, send an appropriate response
    if (donations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No donations found",
      });
    }

    // 1. Total number of donations
    // const totalDonations = await NewDonation.countDocuments();

    // 2. Total donations in the last month
    // const totalDonationsLastMonth = await NewDonation.countDocuments({
    //   createdAt: { $gte: lastMonth }
    // });

     // 3. Total donated amount
    //  const totalDonatedAmount = await NewDonation.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       totalAmount: { $sum: "$donationAmount" }
    //     }
    //   }
    // ]);

    // 4. Total donated amount in the last month
    // const totalDonatedAmountLastMonth = await NewDonation.aggregate([
    //   {
    //     $match: {
    //       createdAt: { $gte: lastMonth }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalAmount: { $sum: "$donationAmount" }
    //     }
    //   }
    // ]);
    // Return the list of donations
    return res.status(200).json({
      success: true,
      // data: {
      //   totalDonations,
      //   totalDonationsLastMonth,
      //   totalDonatedAmount: totalDonatedAmount[0]?.totalAmount || 0,
      //   totalDonatedAmountLastMonth: totalDonatedAmountLastMonth[0]?.totalAmount || 0
      // },
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
