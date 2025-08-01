import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { doctorProfile } from "../db/schema/doctorProfile.js";

export const getAllDoctorProfile = async (req, res) => {
  const { role, userId } = req.user;

  try {
    let query = db.select().from(doctorProfile);

    if (role === "doctor") {
      query = query.where(eq(doctorProfile.doctorId, userId));
    }

    const profiles = await query;
    res.json(profiles);
  } catch (error) {
    console.error("Error in getAllDoctorProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDoctorProfileById = async (req, res) => {
  try {
    res.json(req.profile);
  } catch (error) {
    console.error("Error in getDoctorProfileById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDoctorProfile = async (req, res) => {
  const { role, userId } = req.user;

  try {
    const data = {
      ...req.body,
      doctorId: role === "admin" ? req.body.doctorId : userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [created] = await db.insert(doctorProfile).values(data).returning();
    res.status(201).json(created);
  } catch (error) {
    console.error("Error in createDoctorProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDoctorProfile = async (req, res) => {
  const { id } = req.params;
  const profile = req.profile;

  try {
    const [updated] = await db
      .update(doctorProfile)
      .set({
        ...req.body,
        updatedAt: new Date(),
      })
      .where(eq(doctorProfile.id, Number(id)))
      .returning();
    res.json(updated);
  } catch (error) {
    console.error("Error in updateDoctorProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDoctorProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await db.delete(doctorProfile).where(eq(doctorProfile.id, Number(id)));
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteDoctorProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
