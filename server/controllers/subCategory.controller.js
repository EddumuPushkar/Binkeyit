import subCategoryModel from "../models/subCatagory.model.js";

export const AddSubCategoryController = async (req, res) => {
    try {
        console.log("BODY", req.body);

        const { name, image, category } = req.body;
        if (!name || !image || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingSubCategory = await subCategoryModel.findOne({ name });
        if (existingSubCategory) {
            return res.status(400).json({
                success: false,
                message: "SubCategory already exists",
            });
        }
        const newSubCategory = new subCategoryModel({
            name,
            image,
            category,
        });
        await newSubCategory.save();
        return res.json({
            success: true,
            message: "SubCategory added successfully",
            data: newSubCategory,
        });
    } catch (error) {
        console.log("Error in addSubCategoryController:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getSubCategoryController = async (req, res) => {
    try {
        const data = await subCategoryModel.find().populate("category");
        console.log("POPULATE RUNNING");
        console.log(JSON.stringify(data, null, 2));

        return res.json({
            message: "Sub Category data",
            data: data,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export const editSubCategoryController = async (req, res) => {
    try {
        const { subCategoryId, categoryId, name, image } = req.body;

        if (!subCategoryId || !categoryId || !name || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                error: true,
            });
        }

        const update = await subCategoryModel.findByIdAndUpdate(
            subCategoryId,
            {
                name: name,
                image: image,
                category: categoryId,
            },
            { new: true },
        );

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found",   
                error: true,
            });
        }

        return res.json({
            success: true,
            message: "SubCategory updated successfully",
            error: false,
            data: update,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true,
        });
    }
};

export const deleteSubCategoryController = async (req, res) => {
    try {
        const id = req.body.id;
        console.log("AP", id);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
                error: true,
            });
        }
        const deleteSubCategory = await subCategoryModel.findByIdAndDelete(id);
        if (!deleteSubCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
                error: true,
            });
        }
        return res.json({
            success: true,
            message: "SubCategory deleted successfully",
            data: deleteSubCategory,
        });
    } catch (error) {
        console.log("AP", error.message);

        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
