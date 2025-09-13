import { z } from "zod";

export const ridePriceValidationSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup address is required"),
  dropoffLocation: z.string().min(1, "Dropoff address is required"),
});

export type RidePriceType = z.infer<typeof ridePriceValidationSchema>;
