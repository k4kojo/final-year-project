import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().min(7),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
