import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id").notNull().unique(), // Unique to ensure one settings record per user

  notificationEnabled: boolean("notification_enabled").notNull().default(true),

  darkMode: boolean("dark_mode").notNull().default(false),

  language: text("language").notNull().default("en"), // e.g., 'en', 'fr', 'sw'

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
