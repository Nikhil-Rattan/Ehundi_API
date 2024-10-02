import jwt from "jsonwebtoken";
import Signup from "../modals/signup.modal.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET =
  "bea075182f3019f5ebed0c64c6d31acee741d6016fb0b1ee4660762d690a3a661e707492e5407a0ca69df11749abb98d4cd5283fb2f8fed1cbbe1b9d6d0adf29";
export const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the stored password (no bcrypt)
    // if (password !== user.password) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }
    // Compare the entered password with the stored hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // If successful, send a success response
    res.status(200).json({
      message: "Sign-in successful",
      user: {
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
