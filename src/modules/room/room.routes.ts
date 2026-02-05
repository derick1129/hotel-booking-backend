import { Router } from "express";
import { createRoom, getRoomsByHotel } from "./room.controller";
import { protect, adminOnly } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:hotelId", getRoomsByHotel); 
router.post("/", protect, adminOnly, createRoom); 

export default router;