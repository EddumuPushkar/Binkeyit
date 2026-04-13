import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
    getOrderController,
    addOrderController,
} from "../controllers/orders.controller.js";

const orderRouter = Router();
orderRouter.get("/get-orders", auth, getOrderController);
orderRouter.post("/create-order", auth, addOrderController);

export default orderRouter;
