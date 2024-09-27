import express from "express";
import { userSignin } from "../controller/userSigin.controller.js";

const router  = express.Router();

// POST route for user login
router.post('/', userSignin);

export default router;
