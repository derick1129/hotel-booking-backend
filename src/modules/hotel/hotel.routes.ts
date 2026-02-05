import { Router } from "express";
import { createHotel, getHotels } from "./hotel.controller";
import { protect, adminOnly } from "../../middlewares/auth.middleware";

const router = Router();;

router.get("/", getHotels);
router.post("/", protect, adminOnly, createHotel);

export default router;