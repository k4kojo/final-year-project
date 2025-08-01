// patientExists.middleware.js
import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { users } from "../../db/schema/users.js";

export const validatePatientExists = async (req, res, next) => {
  const { patientId } = req.body;

  if (!patientId) {
    return res.status(400).json({ error: "patientId is required" });
  }

  try {
    const [patient] = await db
      .select()
      .from(users)
      .where(eq(users.userId, patientId));

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    req.patient = patient;
    next();
  } catch (error) {
    console.error("Error validating patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
