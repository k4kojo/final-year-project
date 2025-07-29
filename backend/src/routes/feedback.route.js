import { Router } from "express";

const feedbackRouter = Router();

feedbackRouter.get("/feedback"); // Get all feedback entries
feedbackRouter.get("/feedback/:id"); // Get a single feedback entry by ID
feedbackRouter.post("/feedback"); // Submit new user feedback
feedbackRouter.put("/feedback/:id"); // Update a feedback entry (e.g., mark as resolved) by ID
feedbackRouter.delete("/feedback/:id"); // Delete a feedback entry by ID

export default feedbackRouter;
