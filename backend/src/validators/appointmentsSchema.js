import { z } from "zod";

export const appointmentSchema = z.object({
  doctorId: z.string().uuid(),
  patientId: z.string().uuid().optional(),
  // Use a string for date validation, then coerce it to a Date object.
  // This helps ensure the input format is correct.
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD")
    .transform((str) => new Date(str)),
  // Coerce the string value from the request body to a number.
  appointmentAmount: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().positive("Appointment amount must be a positive number")),
  paymentMethod: z
    .enum(["MTN MoMo", "Telecel Cash", "AirtelTigo Cash", "Credit Card"])
    .optional(),
  paidAmount: z.number().default(0),
  paymentStatus: z.enum(["pending", "partial", "completed"]).default("pending"),
  appointmentMode: z.enum(["Online", "In-person"]),
  reasonForVisit: z.string().optional(),
});
