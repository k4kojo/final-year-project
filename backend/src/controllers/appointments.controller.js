import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";
import { appointments } from "../db/schema/appointments.js";
import {
  appointmentSchema,
  isValidId,
} from "../validators/appointment.validator.js";

const log = (controllerName, step, message) => {
  console.log(`[${controllerName}] - ${step}: ${message}`);
};

export const getAllAppointments = async (req, res) => {
  const controllerName = "getAllAppointments";
  log(controllerName, "Start", "Received request to get all appointments.");
  try {
    const { patientId, doctorId } = req.query;
    log(
      controllerName,
      "Input Parsing",
      `Query params - patientId: ${patientId}, doctorId: ${doctorId}`
    );

    // Validate input
    if (patientId && !isValidId(patientId)) {
      log(controllerName, "Validation Error", "Invalid patientId provided.");
      return res.status(400).json({ error: "Invalid patient ID" });
    }
    if (doctorId && !isValidId(doctorId)) {
      log(controllerName, "Validation Error", "Invalid doctorId provided.");
      return res.status(400).json({ error: "Invalid doctor ID" });
    }
    log(controllerName, "Validation", "Input parameters validated.");

    // Build query
    let query = db.select().from(appointments);
    if (patientId && doctorId) {
      query = query.where(
        and(
          eq(appointments.patientId, patientId),
          eq(appointments.doctorId, doctorId)
        )
      );
    } else if (patientId) {
      query = query.where(eq(appointments.patientId, patientId));
    } else if (doctorId) {
      query = query.where(eq(appointments.doctorId, doctorId));
    }

    log(
      controllerName,
      "Data Fetch",
      "Attempting to fetch appointments from database..."
    );
    const result = await query;
    log(controllerName, "Data Fetch", `Found ${result.length} appointments.`);
    res.status(200).json(result);
  } catch (error) {
    log(
      controllerName,
      "Error",
      `An unexpected error occurred: ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointmentById = async (req, res) => {
  const controllerName = "getAppointmentById";
  log(controllerName, "Start", "Received request to get appointment by ID.");
  try {
    const { id } = req.params;
    log(controllerName, "Input Parsing", `Appointment ID: ${id}`);

    if (!isValidId(id)) {
      log(
        controllerName,
        "Validation Error",
        "Invalid appointment ID provided."
      );
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    log(controllerName, "Validation", "Appointment ID validated.");

    const result = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, Number(id)));
    if (!result.length) {
      log(
        controllerName,
        "Data Not Found",
        `Appointment with ID ${id} not found.`
      );
      return res.status(404).json({ error: "Appointment not found" });
    }
    log(controllerName, "Data Fetch", "Appointment found.");
    res.status(200).json(result[0]);
  } catch (error) {
    log(
      controllerName,
      "Error",
      `An unexpected error occurred: ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAppointment = async (req, res) => {
  const controllerName = "createAppointment";

  log(controllerName, "Validation", "Zod schema parsing attempted");
  const parsed = appointmentSchema.safeParse(req.body);

  if (!parsed.success) {
    log(controllerName, "Validation failed. Errors:", parsed.error.errors);
    return res.status(400).json({ error: parsed.error.errors });
  }
  log(controllerName, "Request body validated successfully.");

  log(controllerName, "Start", "Received request to create a new appointment.");
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentMode,
      appointmentAmount,
      paymentMethod,
      reasonForVisit,
      status,
    } = req.body;
    log(
      controllerName,
      "Input Parsing",
      `Request body: ${JSON.stringify(req.body)}`
    );

    if (
      !patientId ||
      !doctorId ||
      !appointmentDate ||
      !appointmentMode ||
      !appointmentAmount ||
      !paymentMethod
    ) {
      log(
        controllerName,
        "Validation Error",
        "Missing required fields for appointment."
      );
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!isValidId(patientId) || !isValidId(doctorId)) {
      log(controllerName, "Validation Error", "Invalid patientId or doctorId.");
      return res.status(400).json({ error: "Invalid patient or doctor ID" });
    }
    log(controllerName, "Validation", "Appointment data validated.");

    const appointmentId = uuidv4();

    const [newAppointment] = await db
      .insert(appointments)
      .values({
        appointmentId,
        patientId,
        doctorId,
        appointmentDate: new Date(appointmentDate),
        appointmentMode,
        appointmentAmount,
        paymentMethod,
        reasonForVisit,
        status: status || "pending",
      })
      .returning();

    log(
      controllerName,
      "Data Save",
      `New appointment created with ID: ${newAppointment.id}`
    );
    res.status(201).json(newAppointment);
  } catch (error) {
    log(
      controllerName,
      "Error",
      `An unexpected error occurred: ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAppointment = async (req, res) => {
  const controllerName = "updateAppointment";
  log(controllerName, "Start", "Received request to update an appointment.");
  try {
    const { id } = req.params;
    const updates = req.body;
    log(
      controllerName,
      "Input Parsing",
      `Appointment ID: ${id}, Updates: ${JSON.stringify(updates)}`
    );

    if (!isValidId(id)) {
      log(
        controllerName,
        "Validation Error",
        "Invalid appointment ID provided."
      );
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    if (Object.keys(updates).length === 0) {
      log(controllerName, "Validation Error", "No update data provided.");
      return res.status(400).json({ error: "No update data provided" });
    }
    log(controllerName, "Validation", "Input validated for update.");

    // FIX: Convert date string to Date object
    if (updates.appointmentDate) {
      updates.appointmentDate = new Date(updates.appointmentDate);
    }

    const [updatedAppointment] = await db
      .update(appointments)
      .set(updates)
      .where(eq(appointments.id, Number(id)))
      .returning();

    if (!updatedAppointment) {
      log(
        controllerName,
        "Data Not Found",
        `Appointment with ID ${id} not found for update.`
      );
      return res.status(404).json({ error: "Appointment not found" });
    }
    log(
      controllerName,
      "Data Update",
      `Appointment with ID ${id} updated successfully.`
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    log(
      controllerName,
      "Error",
      `An unexpected error occurred: ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAppointment = async (req, res) => {
  const controllerName = "deleteAppointment";
  log(controllerName, "Start", "Received request to delete an appointment.");
  try {
    const { id } = req.params;
    log(controllerName, "Input Parsing", `Appointment ID: ${id}`);

    if (!isValidId(id)) {
      log(
        controllerName,
        "Validation Error",
        "Invalid appointment ID provided."
      );
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    log(controllerName, "Validation", "Appointment ID validated.");

    const [deletedAppointment] = await db
      .delete(appointments)
      .where(eq(appointments.id, Number(id)))
      .returning();

    if (!deletedAppointment) {
      log(
        controllerName,
        "Data Not Found",
        `Appointment with ID ${id} not found for deletion.`
      );
      return res.status(404).json({ error: "Appointment not found" });
    }
    log(
      controllerName,
      "Data Delete",
      `Appointment with ID ${id} deleted successfully.`
    );
    res.status(204).send();
  } catch (error) {
    log(
      controllerName,
      "Error",
      `An unexpected error occurred: ${error.message}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
