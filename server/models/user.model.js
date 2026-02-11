import jwt from "jsonwebtoken";
const { verify, sign } = jwt;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique : true,
    required : true,
    default: null,
  },
  refresh_token: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: null,
  },
 otp_expiry: {
    type: Date,
    default: "",
  },
  last_login_date:{
    type: Date,
    default: "",
  },
  status:{
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  role:{
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  
},{ timestamps: true});

const user = mongoose.model("user", userSchema);
export default user;
