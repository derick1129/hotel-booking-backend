import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(2, "Hotel name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url("Invalid image URL")).optional(),
});
