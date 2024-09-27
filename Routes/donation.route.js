import express from "express";
import { getDonationsList,getDonationById, createDonation, updateDonation, deleteDonation } from "../controller/donation.controller.js";

const router = express.Router();

router.get("/", getDonationsList);
router.get('/:id', getDonationById);       
router.post('/', createDonation);          
router.put('/:id', updateDonation);        
router.delete('/:id', deleteDonation);  

export default router;
