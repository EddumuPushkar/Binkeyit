import { Router } from "express";
import { AddProductController } from "../controllers/uploadProduct.controller.js";
import {getProductController,getProductDetailController} from "../controllers/uploadProduct.controller.js"
import { getProductBySubcategoryIdController } from "../controllers/uploadProduct.controller.js";

const uploadProductRouter = Router();

uploadProductRouter.post("/add-product", AddProductController)
uploadProductRouter.post("/get-product", getProductController);
uploadProductRouter.get("/:subcategoryId", getProductBySubcategoryIdController);
uploadProductRouter.get("/single/:id", getProductDetailController);
export default uploadProductRouter;