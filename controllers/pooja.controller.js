import Pooja from "../models/pooja.model.js";

// Create a new Pooja
export const createPooja = async (req, res) => {
  try {
    const { name, description, categoryId, price } = req.body;

    const newPooja = new Pooja({
      name,
      description,
      categoryId,
      price,
    });

    const savedPooja = await newPooja.save();

    res.status(201).json({
      success: true,
      message: "Pooja created successfully",
      pooja: savedPooja,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating pooja",
      error: error.message,
    });
  }
};

// Get all Poojas
export const getAllPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find();

    if (poojas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No poojas found",
      });
    }

    return res.status(200).json({
      success: true,
      poojas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving poojas",
      error: error.message,
    });
  }
};

// Get a Pooja by ID
export const getPoojaById = async (req, res) => {
  try {
    const { poojaId } = req.params;

    const pooja = await Pooja.findById(poojaId);

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    return res.status(200).json({
      success: true,
      pooja,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving pooja",
      error: error.message,
    });
  }
};

// Update a Pooja
export const updatePooja = async (req, res) => {
  try {
    const { poojaId } = req.params;
    const updateData = req.body;

    const updatedPooja = await Pooja.findByIdAndUpdate(poojaId, updateData, {
      new: true,
    });

    if (!updatedPooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pooja updated successfully",
      pooja: updatedPooja,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating pooja",
      error: error.message,
    });
  }
};

// Delete a Pooja
export const deletePooja = async (req, res) => {
  try {
    const { poojaId } = req.params;

    const deletedPooja = await Pooja.findByIdAndDelete(poojaId);

    if (!deletedPooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pooja deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting pooja",
      error: error.message,
    });
  }
};
