import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Ensure this directory exists or create it.
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicate names.
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept only images.
  } else {
    cb(new Error("Invalid file type"), false); // Reject non-image files.
  }
};

export const upload = multer({ storage, fileFilter }); 

