import { Router } from "express";

const userSettingsRouter = Router();

userSettingsRouter.get("/users/:userId/settings"); // Get settings for a specific user
userSettingsRouter.get("/user-settings/:id"); // Get a specific user setting by ID (if settings are granular)
userSettingsRouter.put("/users/:userId/settings"); // Update settings for a specific user

export default userSettingsRouter;
