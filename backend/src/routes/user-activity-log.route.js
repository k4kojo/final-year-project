import { Router } from "express";

const userActivityLogsRouter = Router();

userActivityLogsRouter.get("/users/:userId/activity-logs"); // Get all activity logs for a specific user
userActivityLogsRouter.get("/activity-logs/:id"); // Get a single activity log entry by ID
userActivityLogsRouter.post("/users/:userId/activity-logs"); // Log a new user activity

export default userActivityLogsRouter;
