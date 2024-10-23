import CCavenueResponse from "../models/ccAvenueResponse.model.js";
import http from "http";
import fs from "fs";
import { decrypt } from "./../ccavutil.js";
import qs from "querystring";
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
export const postDonationResponse = async (req, res) => {
  // ccav = require("../../ccavutil.js");
  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = "", //Put in the 32-Bit Key provided by CCAvenue.
    ccavPOST = "";

  request.on("data", function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = decrypt(encryption, workingKey);
  });

  request.on("end", function () {
    var pData = "";
    pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
    pData = pData + ccavResponse.replace(/=/gi, "</td><td>");
    pData = pData.replace(/&/gi, "</td></tr><tr><td>");
    pData = pData + "</td></tr></table>";
    htmlcode =
      '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' +
      pData +
      "</center><br></body></html>";
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(htmlcode);
    response.end();
  });

  try {
    // const { order_status, merchant_param1, amount} = req.body;
    console.log(req, "Received request body from ccAvenue");

    // if (req) {
    //   return res.redirect("/api/ccAvenue-response/success");
    // } else {
    //   return res.redirect("/api/ccAvenue-response/failed");
    // }
    // let workingKey = "";
    // const { encResp } = req.body; // ccAvenue should send 'encResp' in the body

    // if (!encResp) {
    //   return res
    //     .status(400)
    //     .json({ error: "No encrypted response received from ccAvenue." });
    // }

    // Decrypt the ccAvenue response
    // const decryptedData = decrypt(
    //   "c54b94a8f19dcff997c23ed19bad651a9b140c6ea1cb9675c9d0c3633bb55188928d1304aa180d65bb4ddd28df73e0d50449fd63adc960e882d61b2abee6395f2f3f98b9e6179821c667fe7110e9f6e9f68037a49a5553a1b000f70ccf8cd975ffc923055d2d8350afe9e2d8b0117c9d1e63a4ac9109d7d90fbed07a4d1896fb64704a6eb08ac6d171c71f206b387a36c180d4bd8c52259a476f09b2c85c8fb846a0c1638bad684510986b508dca834b00812a53f73a0e1a942d6c196a2ca9aed9c3bf149f759dfb1236915710ad28af92b015e048acf67019b0b3e93a78e061f936b5e785eee232fdb048c2428549ea2ed86942bfb9ffe90dbc162461e8a573cdf681ba085efb18cc72f259b88444c538ac4419b55996c417d7adde35d4c5d5cba79e50a8ab3ccd7cbceb69abff985fa7231aeecc2e35a624142c25c8dcfabe9714fa56305bffe6156cd7a2fc6770955352cfced340968533b7dc02bc25e337a47abe664a4759f1fce62a572c678c96850855eaf0281528b475b424618048894f5da8a4455d818ef45df7b78f6ca4272e987e504f51fde5243c231592f394793fa01c44bc9c1cd8a30af33400eca3c51653ee3e269d1d5d06ec8a9bb2d8c1ea7b07f7791c5752fcf4ae99546b002ccad7c606ba78359a5822545e33620120684ed8d9442597121138f05fc11ca93269fd55d01b9a433cd9313d6eece4706f2b6862b7444a03c6272ed6233a1cf77386ce1ca7a8769b5424bfaebefbfc62c7abec93c6010ac421129ee39d78444e9deed2938f6d95395c12ef3d86fa28184de30d86a7c1966785a447bf5ca5e09203ba0e3683481c50d7c00fca3c212f11064bdc21b0627bcb462a476da25de4fe44d164b0bceaebbeb9deb40bdc263ca507e75d7056cdd379d9981e8be6961e15cb11b9b614e8c1212a093eb22b3debd22905",
    //   workingKey
    // ); // Your custom decryption logic
    // console.log(decryptedData, "Decrypted ccAvenue response");

    // const { order_status, merchant_param1, amount } = decryptedData; // Extract necessary fields

    // Send a response acknowledging the receipt
    return res.status(200).json({
      message: `Donation response received.`,
      data: req,
    });

    //decrypt data
    //   // await sendSuccessEmail( merchant_param1, amount);

    //   // After returning JSON, redirect based on the status
    //   return res.redirect("/api/ccAvenue-response/success");
    // } else {
    //   return res.redirect("/api/ccAvenue-response/failed");
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
// if (order_status === "Success") {
