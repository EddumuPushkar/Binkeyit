import cloudinary from "../config/claudinary.js";

const uploadImageController = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file);
    console.log("BUFFER:", req.file?.buffer);
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    console.log("file =>", file.originalname);
    const cleanName = file.originalname
      .split(".")[0]
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "categories",
          resource_type: "image",
          public_id: cleanName,
        },
        (error, result) => {
          if (error) {
            console.log("Cloudinary error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(file.buffer);
    });

    return res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result.secure_url,
    });
  } catch (err) {
    console.log("Error in uploadImageController:", err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

export default uploadImageController;
