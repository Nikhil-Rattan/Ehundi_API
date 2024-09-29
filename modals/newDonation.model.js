import mongoose from "mongoose";

const newDonationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gotra: {
      type: String,
      required: true,
    },
    poojaDate: {
      type: Date,
      required: true,
    },
    files: [
      {
        type: String, // This could be a file URL or file path depending on your setup
      },
    ],
    donationAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const NewDonation = mongoose.model("newDonation", newDonationSchema);
export default NewDonation;
