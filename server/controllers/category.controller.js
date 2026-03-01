import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    console.log("ap");
    const {data} = req.body;
    console.log("tanish" , data);
    
    
    
    if (!data.name || !data.image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }
    console.log("dp");
    
    const addCategory = new CategoryModel({
      name: data.name,
      image: data.image,
    });
    await addCategory.save();
        console.log("bp");


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
  try{
    const data = await CategoryModel.find();

    return res.json({
      success: true,
      message: "All category",
      error: false,
      data : data,
    })
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: error.message || error ,
      error: true,
    }); 
  }
}