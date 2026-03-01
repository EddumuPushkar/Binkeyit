import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import { connect } from "mongoose";
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.router.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL, // Allow all origins for testing
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

// Debug middleware to check req.body
app.use((req, res, next) => {
  // console.log("Request Body:", req.body);
  // console.log("Headers:", req.headers);
  next();
});

app.use(morgan());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running rs" + PORT,
  });
  res.send("Hello World");
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/upload", uploadRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
