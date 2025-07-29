import { Router } from "express";

const reviewsRouter = Router();

reviewsRouter.get("/doctors/:doctorId/reviews"); // Get all reviews for a specific doctor
reviewsRouter.get("/reviews/:id"); // Get a single review by ID
reviewsRouter.post("/doctors/:doctorId/reviews"); // Submit a new review for a doctor
reviewsRouter.put("/reviews/:id"); // Update an existing review by ID
reviewsRouter.delete("/reviews/:id"); // Delete a review by ID

export default reviewsRouter;
