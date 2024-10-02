import mongoose from "mongoose";

const poojaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // If you have categories, link them here
      ref: "Category", // Assuming you have a Category model
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pooja = mongoose.model("Pooja", poojaSchema);
export default Pooja;
