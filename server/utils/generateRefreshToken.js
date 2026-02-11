import user from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" },
  );

  const updateRefreshToken = await user.findByIdAndUpdate(userId, {
    refresh_token: token,
  });
  return token;
};