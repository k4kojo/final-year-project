import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  requestPasswordReset,
  resetPassword,
  signIn,
  signUp,
  updateUserById,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/sign-in", signIn);
authRouter.get("/", authenticateToken, authorizeRoles("admin"), getAllUsers); // Only admin can access
authRouter.get("/:id", authenticateToken, getUserById); // Any authenticated user can access
authRouter.put("/:id", updateUserById);
authRouter.delete("/:id", deleteUserById);
authRouter.post("/:id/request-password-reset", requestPasswordReset);
authRouter.post("/:id/reset-password", resetPassword);

export default authRouter;
