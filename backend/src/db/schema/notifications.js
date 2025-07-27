import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),

  // Nullable if it's a global notification
  userId: uuid("user_id", { mode: "nullable" }), // FK to users.user_id

  // 'appointment' | 'lab_result' | 'chat' | 'system' | ...
  type: text("type").notNull(),

  message: varchar("message").notNull(),

  isRead: boolean("is_read").notNull().default(false),

  // Whether the notification is meant for all users
  isGlobal: boolean("is_global").notNull().default(false),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
