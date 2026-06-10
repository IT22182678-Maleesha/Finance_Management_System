
const { createCategorySchema } = require("../middlewares/validator");
const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
    try {
        const result = await Category.find();
        res.status(200).json({ success: true, message: 'Category list retrieved successfully', data: result });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
    }
};



exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        const { error } = createCategorySchema.validate({ name, description });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Create new category
        const newCategory = await Category.create({ name, description });

        res.status(201).json({ success: true, message: "Category added successfully!", category: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding category", error: error.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { _id } = req.query;

        const { name, description } = req.body;

        // Validate input
        const { error } = createCategorySchema.validate({ name, description });

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Check if the category exists
        const existingCategory = await Category.findById(_id);

        if (!existingCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Update category fields
        existingCategory.name = name;
        existingCategory.description = description;

        // Save changes
        const updatedCategory = await existingCategory.save();

        res.status(200).json({ success: true, message: "Category updated successfully!", category: updatedCategory });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating category", error: error.message });
    }
};


exports.deleteCategory = async (req, res) => {

    try {
        const {_id} = req.query;

        const existingCategory = await Category.findOne({ _id });

        if (!existingCategory) {
            return res.status(404).json({ success: false, message: "Category Unavailable" });
        }
        await Category.deleteOne({_id});

        res.status(201).json({ success: true, message: "category deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting category", error: error.message });
    }
};



