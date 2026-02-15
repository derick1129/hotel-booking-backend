import { z } from "zod";

export const createRoomSchema = z.object({
  hotelId: z.string().min(1, "Hotel ID is required"),
  roomType: z.string().min(1, "Room type is required"),
  pricePerNight: z.number().positive("Price must be a positive number"),
  maxGuests: z.number().int().positive("Max guests must be a positive integer"),
  images: z.array(z.string().url("Invalid image URL")).optional(),
});
