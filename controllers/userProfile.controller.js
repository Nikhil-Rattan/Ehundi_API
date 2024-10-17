import Signup from "../models/signup.model.js"; 
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    try {
        const users = await Signup.find({});
        // const data={
        //     user:users,
        //     length:users.length
        // }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid doctor ID" });
          }
        const user = await Signup.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = await Signup.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body }; // Create a shallow copy of req.body

        // Check if the password is being updated
        if (req.body.password) {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await Signup.findByIdAndUpdate(id, updateData, { new: true }); // { new: true } returns the updated document

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// export const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await Signup.findByIdAndUpdate(id, req.body, { new: true }); // { new: true } to return the updated document

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Signup.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

