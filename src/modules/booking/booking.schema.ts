import { z } from "zod";

export const createBookingSchema = z
  .object({
    roomId: z.string().min(1, "Room ID is required"),
    checkIn: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid check-in date format",
    }),
    checkOut: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid check-out date format",
    }),
  })
  .refine(
    (data) => new Date(data.checkIn) < new Date(data.checkOut),
    { message: "Check-out must be after check-in", path: ["checkOut"] }
  );
