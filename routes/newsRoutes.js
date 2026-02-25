import express from "express";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Protected Routes (only logged-in users)
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;
