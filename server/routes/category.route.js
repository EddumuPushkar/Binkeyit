import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { AddCategoryController } from "../controllers/category.controller.js";
import { GetAllCategoryController } from "../controllers/category.controller.js";
import { EditCategeoryController } from "../controllers/category.controller.js";
import { DeleteCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddCategoryController);
categoryRouter.get("/get-category", GetAllCategoryController);
categoryRouter.put("/edit-category", auth, EditCategeoryController);
categoryRouter.delete("/delete-category", auth, DeleteCategoryController);


export default categoryRouter;