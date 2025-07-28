import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().min(7),
  role: z.enum(["admin", "doctor", "patient"]).optional().default("patient"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
