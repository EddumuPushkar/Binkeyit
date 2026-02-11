import jwt from "jsonwebtoken";
//this middleware used to check if the user is loged in then only 
// it will allow to logout otherwise not.
export const auth = async (req, res, next) => {
  // Middleware logic here
  try {
    const token = req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please Provide Token",
      });
    }

    const decode =  jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;
    console.log("User ID from token:", req.userId); // Debugging line

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
