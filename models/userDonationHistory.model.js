import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    amount: { type: String, required: true },
    order_status: { type: String, required: true },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "newDonation",
    //   required: true,
    // }, // Reference to the NewDonation model
    user: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Add a date field to track when donations were made
  },
  {
    timestamps: true,
  }
);

const UserDonation = mongoose.model("UserDonation", donationSchema);
export default UserDonation;
