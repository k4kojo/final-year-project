import { pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";

export const doctorAvailability = pgTable("doctor_availability", {
  id: serial("id").primaryKey(),

  doctorId: uuid("doctor_id").notNull(), // FK to users.user_id (doctors only)

  availableFrom: timestamp("available_from", {
    withTimezone: true,
    mode: "date",
  }).notNull(),

  availableTo: timestamp("available_to", {
    withTimezone: true,
    mode: "date",
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
