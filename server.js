import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://news-portal-frontend-eta.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("News Portal API Running...");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000;

export default app;
