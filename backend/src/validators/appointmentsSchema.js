import { z } from "zod";

export const appointmentSchema = z.object({
  doctorId: z.string().uuid(),
  patientId: z.string().uuid().optional(),
  appointmentDate: z.coerce.date(),
  appointmentAmount: z.number().positive(), // Required - known at creation
  paymentMethod: z
    .enum(["MTN MoMo", "Telecel Cash", "AirtelTigo Cash", "Credit Card"])
    .optional(), // Will be set during payment
  paidAmount: z.number().default(0), // Track partial payments
  paymentStatus: z.enum(["pending", "partial", "completed"]).default("pending"),
  appointmentMode: z.enum(["Online", "In-person"]),
  reasonForVisit: z.string().optional(),
});
