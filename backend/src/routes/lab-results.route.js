import { Router } from "express";

const labResultsRouter = Router();

labResultsRouter.get("/patients/:patientId/lab-results");
labResultsRouter.get("/lab-results/:id");
labResultsRouter.post("/patients/:patientId/lab-results");
labResultsRouter.put("/lab-results/:id");
labResultsRouter.delete("/lab-results/:id");

export default labResultsRouter;
