import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
} from "../controllers/appointments.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const appointmentRouter = Router();

appointmentRouter.get(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  getAllAppointments
); // /api/appointments?patientId=...&doctorId=...
appointmentRouter.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  getAppointmentById
); // /api/appointments/:id
appointmentRouter.post("/", createAppointment); // /api/appointments
appointmentRouter.put("/:id", updateAppointment); // /api/appointments/:id
appointmentRouter.delete("/:id", deleteAppointment); // /api/appointments/:id

export default appointmentRouter;
