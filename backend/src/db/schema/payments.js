import {
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),

  appointmentId: uuid("appointment_id").notNull(), // FK to appointments.id

  userId: uuid("user_id").notNull(), // FK to users.id

  amount: real("amount").notNull(), // Amount in smallest currency unit (e.g. cents)

  status: text("status").notNull().default("pending"), // 'pending' | 'paid' | 'failed' | 'refunded'

  providerRef: varchar("provider_ref", { mode: "nullable" }), // Reference ID from external provider (e.g. Stripe)

  method: text("method", { mode: "nullable" }), // Payment method (e.g. card, momo, cash)

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
