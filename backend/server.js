import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import dotenv from "dotenv";
import "./db.js"; // Import the DB connection
import usersRouter from "./routes/users.js";
import photographyRoutes from "./routes/photographies.js";
import makeupsRouter from "./routes/makeups.js";
import receptionsRouter from "./routes/receptions.js";
import guestRouter from "./routes/guest.js";
import musicRouter from "./routes/music.js";
import musicOptionRouter from "./routes/musicOption.js";
import userInfoRoutes from './routes/userinfoes.js';
import venueRouter from "./routes/venueRouter.js";
import venueSelectionRouter from './routes/venueSelectionRouter.js';

dotenv.config(); // Load environment variables

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
app.use("/users", usersRouter);
app.use("/photography", photographyRoutes);
app.use("/makeups", makeupsRouter);
app.use("/receptions", receptionsRouter);
app.use("/guests", guestRouter);
app.use("/musics", musicRouter);
app.use("/musicoptions", musicOptionRouter);
app.use("/userInfoes", userInfoRoutes);
app.use("/venues", venueRouter);
app.use("/venueSelections", venueSelectionRouter);
app.get("/", (req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});
