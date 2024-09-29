import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getRootCategoriesWithSubcategories,
} from "../controller/category.controller.js";

const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

router.get("/root-categories", getRootCategoriesWithSubcategories);

// Get by ID
router.get("/:id", getCategoryById);

// Create a new category
router.post("/", createCategory);

// Update an existing category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);


export default router;
