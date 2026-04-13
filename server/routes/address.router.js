import { Router } from "express";

import { auth } from "../middleware/auth.js";
import {
  addAddressController,
  deleteAddressController,
  editAddressController,
  getAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();
addressRouter.get("/get-address", auth, getAddressController);
addressRouter.post("/add-address", auth, addAddressController);
addressRouter.put("/edit-address", auth, editAddressController);
addressRouter.delete("/delete-address", auth, deleteAddressController);
export default addressRouter;