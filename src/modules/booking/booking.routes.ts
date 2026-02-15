import { Router } from "express";
import { createBooking } from "./booking.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBookingSchema } from "./booking.schema";

const router = Router();

router.post("/", protect, validate(createBookingSchema), createBooking);

export default router;
