import { z } from "zod";

export const isValidId = (id) => {
  // Accepts integer or UUID
  return (
    /^\d+$/.test(id) ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    )
  );
};

export const appointmentSchema = z.object({
  // ...other fields...
  appointmentMode: z.enum(["Online", "In-person"]),
  paymentMethod: z.enum([
    "MTN MoMo",
    "Telecel Cash",
    "AirtelTigo Cash",
    "Credit Card",
  ]),
});
