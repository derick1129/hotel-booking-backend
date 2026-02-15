import { Router } from "express";
import { createHotel, getHotels } from "./hotel.controller";
import { protect, adminOnly } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createHotelSchema } from "./hotel.schema";

const router = Router();

router.get("/", getHotels);
router.post("/", protect, adminOnly, validate(createHotelSchema), createHotel);

export default router;
