import mongoose from "mongoose";

const newDonationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    star:{
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    gotra: {
      type: String,
      required: false,
    },
    poojaDate: {
      type: Date,
      required: false,
    },
    poojaId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pooja", 
        required: false, 
      }
    ],
    poojaName: {
      type: String, 
      required: false,
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
