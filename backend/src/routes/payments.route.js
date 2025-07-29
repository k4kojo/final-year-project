import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.get("/payments"); // Get all payments
paymentsRouter.get("/payments?userId={id}"); // Get payments for a specific user
paymentsRouter.get("/payments/:id"); // Get a single payment by ID
paymentsRouter.post("/payments"); // Initiate a new payment
paymentsRouter.put("/payments/:id"); // Update a payment status (e.g., successful, failed) by ID
paymentsRouter.delete("/payments/:id"); // Delete a payment record by ID

export default paymentsRouter;
