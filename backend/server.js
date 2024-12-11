import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import "./db.js"; // Import the DB connection
import usersRouter from "./routes/users.js";
import makeupsRouter from "./routes/makeups.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/makeups", makeupsRouter);

app.get("/", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});