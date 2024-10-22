import UserDonation from "../models/userDonationHistory.model.js";
import newDonation from "../models/newDonation.model.js";

export const getUserDonations = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all donations by the userId
    const donations = await UserDonation.find({ user: id  })
    //   .populate({ path: 'userId', model: newDonation })
      .sort({ date: -1 });

    if (!donations || donations.length === 0) {
      return res
        .status(404)
        .json({ message: "No donations found for this user." });
    }
    console.log("Fetched Donations:", donations);
    // Extract the user data from the first donation (assuming all donations have the same user)
    const userId  = donations[0].user;

    // Optional: You can fetch user details from the newDonation model if needed
    const userDetails = await newDonation.findById(userId);

    return res.status(200).json({
      user: {
        fullName: userDetails?.fullName, 
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
      },
      donations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch donations" });
  }
};
