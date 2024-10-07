import express from "express";
import {
  createPooja,
  getAllPoojas,
  getPoojaById,
  updatePooja,
  deletePooja,
} from "../controllers/pooja.controller.js";

const router = express.Router();

// Route to create a new Pooja
router.post("/", createPooja);

// Route to get all Poojas
router.get("/", getAllPoojas);

// Route to get a Pooja by ID
router.get("/:poojaId", getPoojaById);

// Route to update a Pooja
router.put("/:poojaId", updatePooja);

// Route to delete a Pooja
router.delete("/:poojaId", deletePooja);

export default router;
