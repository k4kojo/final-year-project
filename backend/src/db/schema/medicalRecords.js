import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id").notNull(), // FK to users.user_id

  recordType: text("record_type").notNull(), // e.g. "allergy", "surgery", "immunization"
  description: varchar("description").notNull(),
  fileUrl: varchar("file_url", { mode: "nullable" }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
