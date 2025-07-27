import {
  pgTable,
  real,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),

  // FK to users.id (the reviewer/patient)
  userId: uuid("user_id").notNull(),

  // FK to doctor_profiles.id or users.id if doctor is a user
  doctorId: uuid("doctor_id").notNull(),

  rating: real("rating").notNull(), // Typically 1–5

  comment: varchar("comment", { mode: "nullable" }),

  // Optional: to help prevent duplicate reviews for the same appointment
  appointmentId: uuid("appointment_id", { mode: "nullable" }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
