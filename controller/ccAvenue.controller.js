// import CCavenueResponse from "../modals/ccAvenueResponse.model.js";
// import { URL } from 'url';

// // Function to parse URL parameters
// const getParamsFromUrl = (url) => {
//     const params = {};
//     const queryString = url.split('?')[1];
//     if (queryString) {
//         const queryParams = new URLSearchParams(queryString);
//         for (const [key, value] of queryParams) {
//             params[key] = value;
//         }
//     }
//     return params;
// };

// // Handle creation of a donation entry (CC Avenue response)

// export const createDonationEntry = async (req, res) => {
//     const { returnUrl } = req.body;  // Expecting the return URL from the request body

//     if (!returnUrl) {
//         return res.status(400).json({ message: "Return URL is required." });
//     }

//     const { transactionId, amount } = getParamsFromUrl(returnUrl);  // Extract parameters from the URL

//     if (!transactionId || !amount) {
//         return res.status(400).json({ message: "Transaction ID and amount are required." });
//     }

//     try {
//         const newDonation = new CCavenueResponse({
//             transactionId,
//             amount: Number(amount)  // Ensure amount is stored as a number
//         });

//         const savedDonation = await newDonation.save();
//         res.status(201).json(savedDonation);  // Return the saved donation
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Handle donation response entry

// export const postDonationResponse = async (req, res) => {
//     try {
//         const { returnUrl } = req.body; // Get the returnUrl from the request body

//         if (!returnUrl) {
//             return res.status(400).json({ error: "Return URL is required." });
//         }

//         // Parse the URL and extract the transactionId and amount
//         const parsedUrl = new URL(returnUrl);
//         const transactionId = parsedUrl.searchParams.get('transactionId');
//         const amount = parsedUrl.searchParams.get('amount');

//         if (!transactionId || !amount) {
//             return res.status(400).json({ error: "Transaction ID and Amount are required." });
//         }

//         // Assuming you have a Donation model/schema to save this data
//         const donationEntry = new CCavenueResponse({
//             transactionId,
//             amount: Number(amount),
//             responseData: { transactionId, amount }
//         });

//         await donationEntry.save(); // Save to the database

//         return res.status(200).json({ status: "ok" }); // Just send status ok
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "An error occurred while processing the response." });
//     }
// };

import CCavenueResponse from "../modals/ccAvenueResponse.model.js";
import { URL } from "url";

// Function to parse URL parameters
const getParamsFromUrl = (url) => {
  const params = {};
  const queryString = url.split("?")[1]; // Extract query parameters after '?'
  if (queryString) {
    const queryParams = new URLSearchParams(queryString);
    for (const [key, value] of queryParams) {
      params[key] = value;
    }
  }
  return params;
};

// Handle creation of a donation entry (CC Avenue response)
export const createDonationEntry = async (req, res) => {
  const { returnUrl } = req.body; // Expecting the return URL from the request body

  if (!returnUrl) {
    return res.status(400).json({ message: "Return URL is required." });
  }

  const { transactionId, amount } = getParamsFromUrl(returnUrl); // Extract transactionId and amount from the URL

  if (!transactionId || !amount) {
    return res
      .status(400)
      .json({ message: "Transaction ID and amount are required." });
  }

  try {
    const newDonation = new CCavenueResponse({
      transactionId,
      amount: Number(amount), // Ensure amount is stored as a number
      responseData: { transactionId, amount }, // Optionally store the response data
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation); // Return the saved donation
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle donation response entry
export const postDonationResponse = async (req, res) => {
  try {
    const { returnUrl } = req.body; // Get the returnUrl from the request body

    if (!returnUrl) {
      return res.status(400).json({ error: "Return URL is required." });
    }

    // Parse the URL and extract the transactionId, amount, and status
    const parsedUrl = new URL(returnUrl);
    const transactionId = parsedUrl.searchParams.get("transactionId");
    const amount = parsedUrl.searchParams.get("amount");
    const status = parsedUrl.searchParams.get("status");

    if (!transactionId || !amount || !status) {
      return res
        .status(400)
        .json({ error: "Transaction ID, Amount, and Status are required." });
    }

    // Save the response in the database
    const donationEntry = new CCavenueResponse({
      transactionId,
      amount,
      status,
      responseData: { transactionId, amount, status },
    });

    await donationEntry.save();

    // Log the JSON response
    console.log({ transactionId, amount, status });
    // After returning JSON, redirect based on the status
    if (status === "success") {
      return res.redirect("/success");
    } else {
      return res.redirect("/failed");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the response." });
  }
};
