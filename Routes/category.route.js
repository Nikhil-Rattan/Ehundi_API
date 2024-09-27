import express from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controller/category.controller.js";

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Get by ID
router.get("/:id", getCategoryById);

// Create a new category
router.post("/", createCategory);

// Update an existing category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

export default router;
