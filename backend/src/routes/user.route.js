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
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { checkUserOwnership } from "../middlewares/user/ownershipCheck.middleware.js";
import {
  preventRoleElevation,
  restrictToRoles,
} from "../middlewares/user/roleCheck.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { signInSchema, signUpSchema } from "../validators/authSchema.js";

const userRouter = Router();

// Public routes
userRouter.post("/sign-up", validateBody(signUpSchema), signUp);
userRouter.get("/verify-email", verifyEmail);
userRouter.post("/sign-in", validateBody(signInSchema), signIn);

// Protected routes
userRouter.get("/", authenticateToken, restrictToRoles("admin"), getAllUsers);

userRouter.get("/:id", authenticateToken, checkUserOwnership, getUserById);

userRouter.put(
  "/:id",
  authenticateToken,
  checkUserOwnership,
  preventRoleElevation,
  updateUserById
);

userRouter.delete(
  "/:id",
  authenticateToken,
  checkUserOwnership,
  deleteUserById
);

userRouter.post("/request-password-reset", requestPasswordReset);

userRouter.post("/reset-password", resetPassword);

export default userRouter;
