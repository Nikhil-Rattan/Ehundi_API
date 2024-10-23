import CCavenueResponse from "../models/ccAvenueResponse.model.js";
import { URL } from "url";
// import nodemailer from "nodemailer";

// Function to send email
// const sendSuccessEmail = async (recipientEmail, transactionId, amount) => {
//   try {
//     // Create a transporter (you need to replace with your email service configuration)
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or any other email service you use
//       auth: {
//         user: "",
//         pass: "",
//       },
//     });

//     // Create the email content
//     const mailOptions = {
//       from: "your-email@gmail.com", // Sender address
//       to: recipientEmail, // Recipient's email
//       subject: "Donation Successful", // Email subject
//       text: `Thank you for your donation! Transaction ID: ${transactionId}, Amount: ${amount}`, // Email body
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

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
  try {
    return req;
    // const { returnUrl, email } = req.body; // Get the returnUrl from the request body

    // if (!returnUrl || !email) {
    //   return res
    //     .status(400)
    //     .json({ error: "Return URL and recipient email are required." });
    // }

    // Parse the URL and extract the transactionId, amount, and status
    // const parsedUrl = new URL(returnUrl);
    // const transactionId = parsedUrl.searchParams.post("transactionId");
    // const amount = parsedUrl.searchParams.post("amount");
    // const status = parsedUrl.searchParams.post("status");
    // const merchant_param1 = parsedUrl.searchParams.get("merchant_param1");

    const { order_status, merchant_param1 } = req.body;

    // if (!transactionId || !amount || !status || merchant_param1) {
    //   return res
    //     .status(400)
    //     .json({
    //       error:
    //         "Transaction ID, Amount, and Status, and merchant_param1 are required.",
    //     });
    // }
    return order_status;
    if (order_status === "Success") {
      // find donation by merchant_param1 and update payment status

      // Save the response in the database
      // const donationEntry = new CCavenueResponse({
      //   transactionId,
      //   amount,
      //   order_status,
      //   merchantParam1: merchant_param1,
      //   responseData: { transactionId, amount, status, merchant_param1 },
      // });

      // await donationEntry.save();

      // Log the JSON response
      // console.log({ transactionId, amount, status, merchant_param1 });
      return order_status;
      // Send email if the transaction is successful
      await sendSuccessEmail(email, transactionId, amount);

      // After returning JSON, redirect based on the status
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
  // const { returnUrl } = req.body; // Expecting the return URL from the request body

  // if (!returnUrl) {
  //   return res.status(400).json({ message: "Return URL is required." });
  // }
  // const { transactionId, amount } = getParamsFromUrl(returnUrl); // Extract transactionId and amount from the URL

  // if (!transactionId || !amount) {
  //   return res
  //     .status(400)
  //     .json({ message: "Transaction ID and amount are required." });
  // }

  // try {
  //   const newDonation = new CCavenueResponse({
  //     transactionId,
  //     amount: Number(amount), // Ensure amount is stored as a number
  //     responseData: { transactionId, amount }, // Optionally store the response data
  //   });

  //   const savedDonation = await newDonation.save();
  //   res.status(201).json(savedDonation); // Return the saved donation
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

// Handle donation response entry
export const postDonationResponse = async (request, res) => {
  try {
    // const { order_status, merchant_param1, amount} = req.body;
    console.log(req.body, "Received request body from ccAvenue");
    const { encResp } = req.body; // ccAvenue should send 'encResp' in the body

    if (!encResp) {
      return res
        .status(400)
        .json({ error: "No encrypted response received from ccAvenue." });
    }

    // Decrypt the ccAvenue response
    const decryptedData = decryptCCavenueResponse(encResp); // Your custom decryption logic
    console.log(decryptedData, "Decrypted ccAvenue response");

    const { order_status, merchant_param1, amount } = decryptedData; // Extract necessary fields

    // Send a response acknowledging the receipt
    return res.status(200).json({
      message: `Donation response received.  ${req.body}`,
      data: decryptedData,
    });

    //decrypt data
    // if (order_status === "Success") {
    //   // await sendSuccessEmail( merchant_param1, amount);

    //   // After returning JSON, redirect based on the status
    //   return res.redirect("/api/ccAvenue-response/success");
    // } else {
    //   return res.redirect("/api/ccAvenue-response/failed");
    // }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the response." });
  }
};
