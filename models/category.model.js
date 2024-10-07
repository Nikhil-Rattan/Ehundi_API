import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Self-referencing the Category model
      },
    ],
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Null for root categories
    },
    poojaCategory: {
      type: String,
      required: false,
      enum: ["Upcoming Pooja", "Pooja Booking"],
    },
    // poojaCategory: {
    //   upcomingPooja: {
    //     type: String,
    //     default: "", 
    //     required: false,
    //   },
    //   poojaDonation: {
    //     type: String,
    //     default: "", 
    //     required: false,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
