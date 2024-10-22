import express from 'express';
import { getUserDonations } from '../controllers/userDonation.controller.js';

const router = express.Router();

// Route to get donation history of a specific user by userId
router.get('/:id', getUserDonations);

export default router;
