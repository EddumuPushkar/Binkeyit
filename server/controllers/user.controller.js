import axios from "axios";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { generateOtp } from "../utils/generateOTP.js";
import sendEmail from "../config/sendotp.js"; // ✅ correct
import { otpTemplate } from "../utils/otpTemplate.js";
import sendEmailOTP from "../config/sendotp.js";

//login controller
export async function sendOtpController(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json({
        message: "please provide email",
        error: true,
        success: false,
      });
    }

    let currUser = await user.findOne({ email });
    console.log("User found:", currUser);

    if (!currUser) {
      console.log("Creating new user with email:", email);
      currUser = await user.create({ email });
      console.log("User created:", currUser);
    }

    if (currUser.status !== "active") {
      return res.status(400).json({
        message: "User account is not active",
        error: true,
        success: false,
      });
    }

    const otp = generateOtp();

    currUser.otp = otp;

    currUser.otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await currUser.save();
    console.log("User saved successfully with OTP");
    console.log("OTP:", otp);

    const message = otpTemplate({ otp });

    await sendEmailOTP(email, otp);

    return res.json({
      message: "Otp sent successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("Fast2SMS error:", error.response?.data);

    return res.status(500).json({
      message: error.response?.data?.message || error.message,
      error: true,
      success: false,
    });
  }
}
export async function resendOtpController(req, res) {
  try {
    const { email } = req.body;
    let currUser = await user.findOne({ email });
    if (!currUser) {
      console.log("Creating new user with email:", email);
      currUser = await user.create({ email });
      console.log("User created:", currUser);
    }

    const otp = generateOtp();

    currUser.otp = otp;

    currUser.otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await currUser.save();
    console.log("User saved successfully with OTP");
    console.log("OTP:", otp);

    const message = otpTemplate({ otp });

    await sendEmailOTP(email, otp);

    return res.json({
      message: "Otp sent successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export async function verifyOtpController(req, res) {
  try {
    // console.log("DB NAME:", user.db.name);
    // console.log("COLLECTION:", user.collection.name);

    const allUsers = await user.find({});
    // console.log("ALL USERS:", allUsers);

    // console.log("Request body:", req.body);

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
        error: true,
        success: false,
      });
    }

    const { otp } = req.body;
    const email = req.body.email?.toLowerCase().trim();
    if (otp.length < 4) {
      return res.status(400).json({
        message: "Otp is is less than length",
        error: true,
        success: false,
      });
    }

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        error: true,
        success: false,
      });
    }

    console.log("Looking for user with email:", email);

    const currUser = await user.findOne({ email });
    console.log(currUser);

    if (!currUser) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (String(currUser.otp) !== String(otp)) {
      return res.status(200).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    if (!currUser.otp_expiry || currUser.otp_expiry < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }

    let accesstoken, refreshtoken;

    try {
      accesstoken = await generateAccessToken(currUser._id);
      refreshtoken = await generateRefreshToken(currUser._id);
    } catch (err) {
      console.error("TOKEN ERROR:", err);
      throw err;
    }

    currUser.refresh_token = refreshtoken;
    currUser.otp = null;
    currUser.otp_expiry = null;
    await currUser.save();

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);

    return res.json({
      message: "Login successful",
      error: false,
      success: true,
      data: {
        accessToken: accesstoken,
        refreshToken: refreshtoken,
      },
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

export async function logoutController(req, res) {
  try {
    console.log("pushkar");
    const userId = req.userId; // coming from middleware
    console.log("pushkar", userId);
    const cookiesOption = {
      // => This controls security behavior of cookies.
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await user.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("tanish");

    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// refresh token controller

export async function refreshController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]; /// ['Bearer Token'] in 0th index bearer wil be there and at 1th index token will be there.

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    console.log("refreshToken", refreshToken);

    const verifyToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN,
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token is Expired",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?._id;
    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "New AccessToken Generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function userController(req, res) {
  try {
    const {id} = req.body;
    const currUser  = await user.findById(id);
    console.log(currUser);
    
    const email = currUser.email
    return res.json({
      success: true,
      email: email,
      error : false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}
