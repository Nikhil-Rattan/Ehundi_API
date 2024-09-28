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
    }
});

const CCavenueResponse = mongoose.model('ccAvenueResponse', ccAvenueResponseSchema);
export default CCavenueResponse;
