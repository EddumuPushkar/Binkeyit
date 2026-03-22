import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {AddSubCategoryController, getSubCategoryController} from "../controllers/subCategory.controller.js"
import { editSubCategoryController,deleteSubCategoryController } from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-subcategory", auth, AddSubCategoryController);
subCategoryRouter.post("/get-subcategory", getSubCategoryController);
subCategoryRouter.put("/edit-subcategory", auth , editSubCategoryController);
subCategoryRouter.delete("/delete-subcategory",auth,  deleteSubCategoryController);

export default subCategoryRouter;