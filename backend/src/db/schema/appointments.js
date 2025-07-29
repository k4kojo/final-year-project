import {
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const appointmentModeEnum = pgEnum("appointment_mode_enum", [
  "Online",
  "In-person",
]);

export const paymentMethodEnum = pgEnum("payment_method_enum", [
  "MTN MoMo",
  "Telecel Cash",
  "AirtelTigo Cash",
  "Credit Card",
]);

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  appointmentId: uuid("appointment_id").notNull().unique(),

  patientId: uuid("patient_id").notNull(),
  doctorId: uuid("doctor_id").notNull(),

  appointmentDate: timestamp("appointment_date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),

  appointmentAmount: real("appointment_amount").notNull(),

  paymentMethod: paymentMethodEnum("payment_method").notNull(),

  appointmentMode: appointmentModeEnum("appointment_mode").notNull(),

  reasonForVisit: varchar("reason_for_visit", { mode: "nullable" }),

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
