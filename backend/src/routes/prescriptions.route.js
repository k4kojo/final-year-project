import { Router } from "express";

const prescriptionsRouter = Router();

prescriptionsRouter.get("/patients/:patientId/prescriptions"); // Get all prescriptions for a specific patient
prescriptionsRouter.get("/prescriptions/:id"); // Get a single prescription by ID
prescriptionsRouter.post("/patients/:patientId/prescriptions"); // Create a new prescription for a patient
prescriptionsRouter.put("/prescriptions/:id"); // Update an existing prescription by ID
prescriptionsRouter.delete("/prescriptions/:id"); // Delete a prescription by ID

export default prescriptionsRouter;
