import jwt from "jsonwebtoken";
//this middleware used to check if the user is loged in then only
// it will allow to logout otherwise not.
export const auth = async (req, res, next) => {
  // Middleware logic here
  try {
    // const token = req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];
    const token =
      req.headers?.authorization?.split(" ")[1] || req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Please Provide Token",
      });
    }
    //here problem is occuring when accesstoken expired then jwt.verify token throws error then catch block cateches error return 500 errror
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    req.user = {
      id: decode.id,
    };

    console.log("User ID from token:", req.user.id); // Debugging line

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
        error: true,
        success: false,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
