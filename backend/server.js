import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./db.js"; // Import the DB connection
import usersRouter from "./routes/users.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Enable CORS for frontend requests
/*app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow sending cookies if needed
  })
); */
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});