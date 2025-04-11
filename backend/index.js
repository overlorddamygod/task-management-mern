const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes")
const taskRouter = require("./routes/taskRoutes")
dotenv.config();

const app = express({
  cors
});
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Allow all origins by default or use a specific origin
  methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task Management API",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
