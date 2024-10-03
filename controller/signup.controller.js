import Signup from "../modals/signup.modal.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export const userSignup = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    role = "user",
  } = req.body;

  if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the email already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like SendGrid, etc.
      auth: {
        user: "tl.webcodeft@gmail.com", // Your email address
        pass: "rdnzqbdnhzfcryha",  // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: "tl.webcodeft@gmail.com", // Sender email
      to: email, // Recipient email (the new user)
      subject: "Welcome to Our Platform",
      text: `Hi ${fullName},\n\nThank you for signing up. We are excited to have you on board!\n\nBest Regards,\nE-Hundi`,
    };

    // Email to the admin
    const adminMailOptions = {
      from: "tl.webcodeft@gmail.com", // Sender email
      to: "debra@gmail.com", // Admin email
      subject: "New User Registration",
      text: `Hi Admin,\n\nA new user has just signed up on the platform.\n\nDetails:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\n\nBest Regards,\nE-Hundi`,
    };

    // Send the email to the user
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

     // Send the email to the admin
     transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email to the admin:", error);
      } else {
        console.log("Email sent to the admin: " + info.response);
      }
    });
    
    return res
      .status(201)
      .json({ success: "User registered successfully and email sent", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await Signup.find({}).sort({createdAt: -1});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching users" });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Signup.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching user" });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { fullName, email, phoneNumber, password, role } = req.body;

  try {
    const updatedData = {};
    if (fullName) updatedData.fullName = fullName;
    if (email) updatedData.email = email;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (password) updatedData.password = await bcrypt.hash(password, 10); // Hashing if password is updated
    if (role) updatedData.role = role;

    const user = await Signup.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }
    const result = await Signup.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting user" });
  }
};
