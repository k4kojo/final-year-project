import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),

  patientId: uuid("patient_id").notNull(),
  doctorId: uuid("doctor_id").notNull(),

  appointmentDate: timestamp("appointment_date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),

  status: text("status").notNull().default("pending"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});
