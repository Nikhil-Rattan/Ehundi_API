import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donationType: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: false,
  },
  metadata: {
    type: Object, // Store any additional data as a JSON object
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
