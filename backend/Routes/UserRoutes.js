import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import { verifyToken, authorizeRoles, validateSignup } from "../middlewares/userMiddlewares.js";

const router = express.Router();

// Public route: Signup
router.post("/signup", validateSignup, signupUser);

// Public route: Login
router.post("/login", loginUser);

// Protected route: Admin-only
router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
  }
);

// Protected route: HR-only
router.get("/hr-dashboard", verifyToken, authorizeRoles("hr"), (req, res) => {
  res.json({ message: "Welcome to the HR Dashboard" });
});

// Protected route: Employee-only
router.get(
  "/employee-dashboard",
  verifyToken,
  authorizeRoles("employee"),
  (req, res) => {
    res.json({ message: "Welcome to the Employee Dashboard" });
  }
);

export default router;
