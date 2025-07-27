import {
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const doctorProfile = pgTable("doctor_profiles", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id").notNull().unique(), // FK to users.user_id (only for doctors)

  specialization: varchar("specialization").notNull(),
  licenseNumber: varchar("license_number").notNull(),
  bio: varchar("bio", { mode: "nullable" }),

  reviews: real("reviews").notNull().default(0),
  rating: real("rating").notNull().default(0),

  experienceYears: integer("experience_years", { mode: "nullable" }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
