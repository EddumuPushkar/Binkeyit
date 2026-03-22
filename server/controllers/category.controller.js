import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    // console.log("ap");
    const { data } = req.body;
    console.log("tanish", data);

    if (!data.name || !data.image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }
    // console.log("dp");

    const existingCategory = await CategoryModel.findOne({ name: data.name });
    if (existingCategory) {
      return res.status(500).json({
        success: false,
        message: "Category already exists",
        error: true,
      });
    } else {
      const addCategory = new CategoryModel({
        name: data.name,
        image: data.image,
      });
      await addCategory.save();

      if (!addCategory) {
        return res.status(400).json({
          success: false,
          message: "Failed to add category",
          error: true,
        });
      }

      return res.json({
        success: true,
        message: "Category added successfully",
        error: false,
        data: addCategory,
      });
    }
  } catch (error) {
    logger.error("Error in AddCategoryController:");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: true,
    });
  }
};

export const GetAllCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find();

    return res.json({
      success: true,
      message: "All category",
      error: false,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
};

export const EditCategeoryController = async (req, res) => {
  try {
     console.log("req.body:", req.body); // ADD THIS DEBUG LINE

    const {  categoryId,name, image } = req.body;
    console.log("alok", categoryId, name, image);
    
    if (!categoryId || !name || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }

    const update = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        name: name,
        image: image,
      },
      { new: true },
    );
    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        error: true,
      });
    }
    return res.json({
      success: true,
      message: "Category updated successfully",
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

export const DeleteCategoryController = async (req, res) => {
  
  try{
    //  console.log("req.body:", req.body); // ADD THIS
    const id  = req.body.categoryId;
    // console.log("alok", id)

    if(!id){
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
        error: true,
      });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if(!deletedCategory){
      return res.status(404).json({
        success: false,
        message: "Category not found",
        error: true,
      });
    }
    return res.json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
}