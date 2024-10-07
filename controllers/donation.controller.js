import Donation from "../models/donation.model.js";

export const getDonationsList = async (req, res) => {
    try {
        // Populate the user field to show user details
        const donations = await Donation.find().populate('user', 'fullName email');  // Assuming User has fullName and email

        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific donation by ID
export const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findById(id).populate('user', 'fullName email');
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new donation
export const createDonation = async (req, res) => {
    const { donationType, amount, user, metadata } = req.body;
    try {
        const newDonation = await Donation.create({
            donationType,
            amount,
            user,
            metadata,
        });
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a donation by ID
export const updateDonation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDonation = await Donation.findByIdAndUpdate(id, req.body, { new: true }).populate('user', 'fullName email');
        if (!updatedDonation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a donation by ID
export const deleteDonation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDonation = await Donation.findByIdAndDelete(id);
        if (!deletedDonation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json({ message: "Donation successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};