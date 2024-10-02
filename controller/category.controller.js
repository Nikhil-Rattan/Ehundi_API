import Category from "../modals/category.model.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, image, description, price, parentCategory,isMainCategory  } = req.body;

  const newCategory = new Category({
    name,
    image,
    description,
    price,
    parentCategory,
  });

  try {
    const savedCategory = await newCategory.save();

    // If it's a subcategory, push it into the parent category's subcategories array
    if (parentCategory) {
      await Category.findByIdAndUpdate(parentCategory, {
        $push: { subcategories: savedCategory._id },
      });
    }
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories").populate("parentCategory");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("subcategories");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image, description, price, parentCategory, subcategories } = req.body;

  try {
    // Find the category before updating to check if the parent has changed
    const currentCategory = await Category.findById(id);
    if (!currentCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, image, description, price, parentCategory, subcategories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If the parent category has changed, update the subcategories arrays
    if (currentCategory.parentCategory !== parentCategory) {
      if (currentCategory.parentCategory) {
        // Remove from old parent's subcategories array
        await Category.findByIdAndUpdate(currentCategory.parentCategory, {
          $pull: { subcategories: id },
        });
      }
      if (parentCategory) {
        // Add to new parent's subcategories array
        await Category.findByIdAndUpdate(parentCategory, {
          $push: { subcategories: id },
        });
      }
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Get all root categories with their subcategories
export const getRootCategoriesWithSubcategories = async (req, res) => {
  try {
    // const rootCategories = await Category.find({ parentCategory: null }); // Find root categories
    const rootCategories = await Category.find({
      parentCategory: null,
    }).populate("subcategories");

    // Check if any root categories were found
    if (rootCategories.length === 0) {
      return res.status(404).json({ message: "No root categories found" });
    }

    // Populate subcategories
    const populatedCategories = await Category.populate(
      rootCategories,
      "subcategories"
    );

    // Format the response
    const response = {
      total: populatedCategories.length,
      categories: populatedCategories,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};