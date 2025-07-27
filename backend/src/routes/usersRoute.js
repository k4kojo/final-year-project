import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  requestPasswordReset,
  resetPassword,
  updateUserById,
  verifyEmail,
} from "../controllers/usersController.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";
import { loginUser } from "./login.js";

const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", authenticateToken, authorizeRoles("admin"), getAllUsers); // Only admin can access
userRoutes.get("/:id", authenticateToken, getUserById); // Any authenticated user can access
userRoutes.put("/:id/update", authenticateToken, updateUserById);
userRoutes.delete("/:id/delete", authenticateToken, deleteUserById);
userRoutes.post("/login", loginUser);
userRoutes.get("/verify-email", verifyEmail);
userRoutes.post("/:id/request-password-reset", requestPasswordReset);
userRoutes.post("/:id/reset-password", resetPassword);

export default userRoutes;
