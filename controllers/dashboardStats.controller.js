import Signup from "../models/signup.model.js";
import NewDonation from "../models/newDonation.model.js";

// Controller to fetch all aggregated data
export const getDashboardData = async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));

    // 1. Total number of users
    const totalUsers = await Signup.countDocuments();

    // 2. Total number of donations
    const totalDonations = await NewDonation.countDocuments({
      paymentStatus: "paid",
    });

    // 3. Total donations in the last month
    const totalDonationsLastMonth = await NewDonation.countDocuments({
      paymentStatus: "paid",
      createdAt: { $gte: lastMonth }
    });

    // 4. Total donated amount
    const totalDonatedAmount = await NewDonation.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$donationAmount" }
        }
      }
    ]);

    // 5. Total donated amount in the last month
    const totalDonatedAmountLastMonth = await NewDonation.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$donationAmount" }
        }
      }
    ]);

    // Returning the aggregated data
    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDonations,
        totalDonationsLastMonth,
        // totalDonatedAmount: totalDonatedAmount[0]?.totalAmount || 0,
        totalDonatedAmount: totalDonatedAmount.length > 0 ? totalDonatedAmount[0].totalAmount : 0,
        // totalDonatedAmountLastMonth: totalDonatedAmountLastMonth[0]?.totalAmount || 0,
        totalDonatedAmountLastMonth: totalDonatedAmountLastMonth.length > 0 ? totalDonatedAmountLastMonth[0].totalAmount : 0
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};
