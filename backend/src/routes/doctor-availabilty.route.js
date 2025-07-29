import { Router } from "express";

const doctorAvailabilityRouter = Router();

doctorAvailabilityRouter.get("/doctors/:doctorId/availability");
doctorAvailabilityRouter.get("/doctor-availability/:id");
doctorAvailabilityRouter.post("/doctors/:doctorId/availability");
doctorAvailabilityRouter.put("/doctor-availability/:id");
doctorAvailabilityRouter.delete("/doctor-availability/:id");

export default doctorAvailabilityRouter;
