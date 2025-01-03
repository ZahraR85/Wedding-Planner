import multer from "multer";
import path from "path";

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const uploadImages = async (req, res) => {
  try {
    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ message: "Images uploaded successfully.", fileUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Failed to upload images." });
  }
};
