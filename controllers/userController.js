import User from "../models/User.js";

// Get logged-in user profile
export const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
