import CCavenueResponse from "../modals/ccAvenueResponse.model.js";

// Function to parse URL parameters
const getParamsFromUrl = (url) => {
    const params = {};
    const queryString = url.split('?')[1];
    if (queryString) {
        const queryParams = new URLSearchParams(queryString);
        for (const [key, value] of queryParams) {
            params[key] = value;
        }
    }
    return params;
};

export const createDonationEntry = async (req, res) => {
    const { returnUrl } = req.body;  // Expecting the return URL from the request body

    if (!returnUrl) {
        return res.status(400).json({ message: "Return URL is required." });
    }

    const { transactionId, amount } = getParamsFromUrl(returnUrl);  // Extract parameters from the URL

    if (!transactionId || !amount) {
        return res.status(400).json({ message: "Transaction ID and amount are required." });
    }

    try {
        const newDonation = new CCavenueResponse({
            transactionId,
            amount: Number(amount)  // Ensure amount is stored as a number
        });

        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);  // Return the saved donation
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
