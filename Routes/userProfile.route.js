import express from "express";
import { getUser, getUserById, createUser, updateUser, deleteUser } from "../controllers/userProfile.controller.js";

const router = express.Router();

// POST route for user login
router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
