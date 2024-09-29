import mongoose from "mongoose";

const ccAvenueResponseSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {  // Add status to track payment success/failure
        type: String,
        default: "pending"
    },
    responseData: {  // Store the full response JSON
        type: Object
    }
}, { timestamps: true });

const CCavenueResponse = mongoose.model('CCavenueResponse', ccAvenueResponseSchema);
export default CCavenueResponse;
