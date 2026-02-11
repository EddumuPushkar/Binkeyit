import { Router } from "express";

import { logoutController, userController } from "../controllers/user.controller.js";
import { sendOtpController } from "../controllers/user.controller.js";
import { verifyOtpController } from "../controllers/user.controller.js";
import { refreshController } from "../controllers/user.controller.js";
import { resendOtpController } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const userRouter = Router();
userRouter.post("/login", sendOtpController);
userRouter.post("/resend-otp", resendOtpController);
userRouter.post("/verify-otp", verifyOtpController);
userRouter.get("/logout", auth, logoutController);
userRouter.post("/refresh-token", refreshController);
userRouter.post("/me", userController);

export default userRouter;
