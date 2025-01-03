import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import "./db.js"; // Import the DB connection
import usersRouter from "./routes/users.js";
import photographyRoutes from "./routes/photographies.js";
import makeupsRouter from "./routes/makeups.js";
import receptionsRouter from "./routes/receptions.js";
import guestRouter from "./routes/guest.js";
import musicRouter from "./routes/music.js";
import musicOptionRouter from "./routes/musicOption.js";
import userInfoRoutes from './routes/userinfoes.js';
//import venueRouter from "./routes/venueRouter.js";
import imageRouter from "./routes/imageRouter.js";
import venueRoutes from "./routes/venueRoutes.js";
import venueSelectionRouter from './routes/venueSelectionRouter.js';
import galleryRouter from './routes/galleryRouter.js';
import todolistRouter  from './routes/todolist.js';
import shoppingCardRouter from './routes/shoppingCardRouter.js';

dotenv.config(); // Load environment variables

// Ensure 'uploads' directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
} 

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow sending cookies if needed
  })
); 
// Setup file upload with Multer
const upload = multer({
  dest: uploadsDir,  // Directory to store images temporarily
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/users", usersRouter);
app.use("/photographies", photographyRoutes);
app.use("/makeups", makeupsRouter);
app.use("/receptions", receptionsRouter);
app.use("/guests", guestRouter);
app.use("/musics", musicRouter);
app.use("/musicoptions", musicOptionRouter);
app.use("/userInfoes", userInfoRoutes);
app.use("/venues", venueRoutes);
app.use("/upload-images", imageRouter);
app.use("/venueSelections", venueSelectionRouter);
app.use("/galleries", galleryRouter);
app.use("/todolist", todolistRouter);
app.use("/shoppingcards", shoppingCardRouter);


app.get("/", (req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});
