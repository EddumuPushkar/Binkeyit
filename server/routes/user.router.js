import { Router } from "express";

import { logoutController, userController } from "../controllers/user.controller.js";
import { sendOtpController } from "../controllers/user.controller.js";
import { verifyOtpController } from "../controllers/user.controller.js";
import { refreshController } from "../controllers/user.controller.js";
import { resendOtpController } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
import { checkAdminController } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.post("/login", sendOtpController);
userRouter.post("/resend-otp", resendOtpController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.get("/logout", auth, logoutController);
userRouter.post("/refresh-token",auth ,refreshController);
userRouter.post("/check-admin",checkAdminController);
userRouter.post("/me", auth, userController);

export default userRouter;
