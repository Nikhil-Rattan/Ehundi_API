import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { adminRouter } from "./Routes/AdminRoute.js";
// import { otpRouter } from "./Routes/OtpRouter.js";
import signupRouter from "./Routes/signup.route.js";
import signinRouter from "./Routes/userLogin.route.js";
import userRouter from "./Routes/userProfile.route.js";
import categoryRouter from "./Routes/category.route.js";
import donationRouter from "./Routes/donation.route.js";
import newDonationRouter from "./Routes/newDonation.route.js";
import ccAvenueRouter from "./Routes/ccAvenue.route.js";
import poojaRouter from "./Routes/pooja.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const DB_URI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

// Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

// Routers
app.use("/auth", adminRouter);
// app.use("/auth", otpRouter);
app.use("/auth/user-Signup", signupRouter);
app.use("/auth/user-Signin", signinRouter);
app.use("/auth/user-Profile", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/donations", donationRouter);
app.use("/api/newDonations", newDonationRouter);
app.use("/api/ccAvenue-response", ccAvenueRouter);
app.use("/api/pooja", poojaRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected! to the database");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })

  .catch((error) => {
    console.error("Database connection failed:", error);
  });
