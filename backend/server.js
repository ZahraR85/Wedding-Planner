import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import multer from "multer";

import "./db.js"; // Import database connection
import usersRouter from "./routes/users.js";
import photographyRoutes from "./routes/photographies.js";
import makeupsRouter from "./routes/makeups.js";
import receptionsRouter from "./routes/receptions.js";
import guestRouter from "./routes/guest.js";
import musicRouter from "./routes/music.js";
import musicOptionRouter from "./routes/musicOption.js";
import userInfoRoutes from "./routes/userinfoes.js";
import venueRoutes from "./routes/venueRoutes.js";
import venueSelectionRouter from "./routes/venueSelectionRouter.js";
import galleryRouter from "./routes/galleryRouter.js";
import todolistRouter from "./routes/todolist.js";
import shoppingCardRouter from "./routes/shoppingCardRouter.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { removeAllFromShoppingCard } from "./controllers/shoppingCardController.js";
import audioRouter from "./routes/audioRouter.js";
import chatRouter from "./routes/chatRouter.js";
import imageRouter from "./routes/imageRouter.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure 'uploads' directory exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://wedding-planner-2-7htl.onrender.com", // Shabnam
      "https://wedding-planner-1-5n78.onrender.com", // Azadeh
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
}));

// Temporary file upload setup with Multer
const uploadTemp = multer({
  dest: uploadsDir, // Temporary directory
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
    // Renaming files when they are uploaded
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store in the 'uploads' directory
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newName = `${Date.now()}${ext}`; // Create a unique name
        cb(null, newName);
      },
    }),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, uploadsDir)));

// Routes
app.use("/users", usersRouter);
app.use("/photographies", photographyRoutes);
app.use("/makeups", makeupsRouter);
app.use("/receptions", receptionsRouter);
app.use("/guests", guestRouter);
app.use("/musics", musicRouter);
app.use("/musicoptions", musicOptionRouter);
app.use("/userInfoes", userInfoRoutes);
app.use("/venues", venueRoutes); // Corrected and integrated venue routes
app.use("/venueSelections", venueSelectionRouter);
app.use("/galleries", galleryRouter);
app.use("/todolist", todolistRouter);
app.use("/shoppingcards", shoppingCardRouter);
app.use("/payment", paymentRoutes);

// Payment success and cancel handlers
app.get("/cancel", (req, res) => {
  res.send("Payment was canceled. Please try again.");
});

app.get("/success", async (req, res) => {
  const sessionId = req.query.session_id;
  const userId = req.query.user_id;

  try {
    // Handle successful payment and clear shopping cart
    await removeAllFromShoppingCard({ userID: userId });
    res.send(`Payment successful! Session ID: ${sessionId}. Cart cleared.`);
  } catch (error) {
    console.error("Error during payment success handling:", error);
    res.status(500).send("Failed to clear shopping cart.");
  }
});

// AI-related API routes
app.use("/v1/audio/speech", audioRouter);
app.use("/v1/chat/completions", chatRouter);
app.use("/v1/images/generations", imageRouter);

// Catch-all for undefined routes
app.use((req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).send("Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export { uploadTemp }; // Export temporary upload middleware if needed elsewhere
