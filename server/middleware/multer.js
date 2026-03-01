import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
// This upload object is a middleware function that can be used in your routes to handle file uploads. It will store the uploaded files in memory, which means they will not be saved to disk but will be available as a buffer in the request object. You can access the uploaded file using req.file or req.files depending on whether you are uploading a single file or multiple files.

export default upload;
