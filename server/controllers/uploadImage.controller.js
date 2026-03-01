import cloudinary from "../config/claudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file; // multer puts file here
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    console.log("file =>", file.originalname);

    // Upload directly from buffer
    const uploadedImage = await cloudinary.uploader.upload_stream(
      {
        folder: "categories", // your folder name
        resource_type: "image",
        public_id: file.originalname.split(".")[0], // optional: use original filename
      },
      (error, result) => {
        if (error) {
          console.log("Cloudinary error:", error);
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
            error,
          });
        }

        console.log("URL being saved:", result.secure_url);

        return res.json({
          success: true,
          message: "Image uploaded successfully",
          data: result.secure_url,
        });
      }
    );

    // Pipe the file buffer to Cloudinary stream
    uploadedImage.end(file.buffer);
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