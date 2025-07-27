import { pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";

export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id").notNull(), // FK to users.user_id (patient)
  doctorId: uuid("doctor_id").notNull(), // FK to users.user_id (doctor)

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
